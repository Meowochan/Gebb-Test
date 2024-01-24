const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());
//Mongodb connection
mongoose.connect('mongodb+srv://admin:admin@gebbtest.r1wz7zn.mongodb.net/UsersData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// User Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: String
});
const User = mongoose.model('user', userSchema, 'user');
// Shows Time model
const movieSchema = new mongoose.Schema({
  title: String,
  showtimes: [{
    time: String,
    theater: String,
    seats: [{
      row: String,
      number: Number,
      available: String
    }]
  }],
  cover: String
});
const Movie = mongoose.model('showTime', movieSchema, 'showTime');
// List model
const reservationSchema = new mongoose.Schema({
  username: String,
  time: String,
  title: String,
  seats: {
    row: String,
    number: Number
  }
});
const Reservation = mongoose.model('reservation', reservationSchema, 'reservation');

//Secret key for jwt
const secretKey = 'your-secret-key';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user == null || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid username or password');
  }

  const accessToken = jwt.sign({ username: user.username, id: user._id }, secretKey);
  res.json({ accessToken, userType: user.type });
  console.log("someone logged in")
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user in the database
  const newUser = new User({
    username,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reservations/:token', async (req, res) => {
  try {
    const Sendedtoken = req.params.token;
    const decodedToken = jwt.verify(Sendedtoken, secretKey);
    const { username, id } = decodedToken;
    // Fetch reservations for the given user ID
    const reservations = await Reservation.find({ username });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cancelReservation', async (req, res) => {
  try {
    const { token, time, row, number, title } = req.body;

    // Verify and decode the token to get the user information
    const decodedToken = jwt.verify(token, secretKey);
    const { username, id } = decodedToken;

    // Check if the user has a reservation matching the provided data
    const reservation = await Reservation.findOne({
      username,
      time,
      'seats.row': row,
      'seats.number': parseInt(number),
      title,
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    await Reservation.deleteOne({ _id: reservation._id });

    const movie = await Movie.findOne({ title, 'showtimes.time': time });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const showtime = movie.showtimes.find(st => st.time === time);
    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }
    const seat = showtime.seats.find(s => s.row === row && s.number === parseInt(number));
    if (!seat) {
      return res.status(404).json({ error: `Seat not found for row ${row} and number ${number}` });
    }
    if (seat.available == 'avialable') {
      return res.status(400).json({ error: `Seat for row ${row} and number ${number} is already available` });
    }
    seat.available = 'avialable';
    await movie.save();

    const reservations = await Reservation.find({ username });
    res.json({ success: true, message: 'Reservation canceled successfully', reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/reservation', async (req, res) => {
  try {
    const { token, time, title, row, number } = req.body;
    const sendedToken = req.headers.authorization || req.body.token;
    if (!sendedToken) {
      return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const { username, id } = decodedToken;
    console.log('Username:', username);


    const movie = await Movie.findOne({ title, 'showtimes.time': time });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const showtime = movie.showtimes.find(st => st.time === time);
    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    // Find the specific seat in the showtime
    for (let i = 0; i < row.length; i++) {
      const currentRow = row[i];
      const currentNumber = parseInt(number[i]);

      // Find the specific seat in the showtime
      const seat = showtime.seats.find(s => s.row === currentRow && s.number === currentNumber);

      if (!seat) {
        return res.status(404).json({ error: `Seat not found for row ${currentRow} and number ${currentNumber}` });
      }

      // Check if the seat is available
      if (seat.available !== 'avialable') {
        return res.status(400).json({ error: `Seat for row ${currentRow} and number ${currentNumber} is already reserved` });
      }

      // Update the available status to 'reserved'
      const reservation = new Reservation({
        username,
        time,
        title,
        seats: {
          row: currentRow,
          number: currentNumber
        }
      });
      seat.available = 'reserved';
      await reservation.save();
    }

    // Save the updated movie document
    await movie.save();

    res.json({ success: true, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/adjust-reservation', async (req, res) => {
  try {
    const { time, title, row, number } = req.body;

    const movie = await Movie.findOne({ title, 'showtimes.time': time });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const showtime = movie.showtimes.find(st => st.time === time);
    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    // Find the specific seat in the showtime
    for (let i = 0; i < row.length; i++) {
      const currentRow = row[i];
      const currentNumber = parseInt(number[i]);

      // Find the specific seat in the showtime
      const seat = showtime.seats.find(s => s.row === currentRow && s.number === currentNumber);

      if (!seat) {
        return res.status(404).json({ error: `Seat not found for row ${currentRow} and number ${currentNumber}` });
      }

      // Check if the seat is closed
      if (seat.available === 'closed') {
        seat.available = 'avialable';
      } else {

        const reservation = await Reservation.findOne({
          time,
          'seats.row': currentRow,
          'seats.number': currentNumber,
          title,
        });
        if (reservation) {
          await Reservation.deleteOne({ _id: reservation._id });
        }

        seat.available = 'closed';
      }
    }

    // Save the updated movie document
    await movie.save();

    res.json({ success: true, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});