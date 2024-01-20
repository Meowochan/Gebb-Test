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

//Secret key for jwt
const secretKey = 'your-secret-key';

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

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
  
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});