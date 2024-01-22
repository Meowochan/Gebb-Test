import React, { useState } from 'react';
import axios from 'axios';
const moment = require('moment-timezone');

const Showtimes = ({ movie, onClose, isLoggedIn }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const uniqueDates = [...new Set(movie.showtimes.map(showtime => new Date(showtime.time).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })))];
  const sortedDates = uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  const [selectedTime, setSelectedTime] = useState(null);
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null)
    setSelectedSeats([])
  };
  const handleTimeClick = (showtime) => {
    setSelectedTime(showtime);
  };
  const selectSeats = (seat) => {
    const isSeatSelected = selectedSeats.some(selectedSeat => selectedSeat.row === seat.row && selectedSeat.number === seat.number);

    if (isSeatSelected) {
      // If the seat is selected, remove it from the array
      setSelectedSeats(prevSeats => prevSeats.filter(selectedSeat => !(selectedSeat.row === seat.row && selectedSeat.number === seat.number)));
    } else {
      // If the seat is not selected, add it to the array
      setSelectedSeats(prevSeats => [...prevSeats, { row: seat.row, number: seat.number }]);
    }
  };
  const confirmReservation = async () => {
    try {
      const utcTime = new Date(selectedTime.time);
      const targetTimeZone = 'Asia/Bangkok';
      const localTime = moment(utcTime).tz(targetTimeZone).format('YYYY-MM-DDTHH:mm:ss');
      const response = await axios.post('http://localhost:8000/reservation', {
        token: localStorage.getItem('token'),
        time: localTime,
        title: movie.title,
        row: selectedSeats.map(seat => `${seat.row}`),
        number : selectedSeats.map(seat => `${seat.number}`)
      });

      console.log(response.data); // Handle the response from the server as needed
      window.location.href = "/status";
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
  }

  return (
    <div className='h-screen w-screen absolute left-0 top-0 bg-opacity-70 z-10 bg-gray-500 flex'>
      <div className=' m-auto bg-white px-10 pt-3 pb-10 w-[40%] rounded-2xl'>
        <div>
          <button className='btn btn-error min-h-0 h-8 my-4 mr-8 hover:text-white' onClick={() => onClose()}>Close</button>
        </div>
        <p className='text-3xl font-bold'>{movie.title} : Show Time</p>
        <div className='flex mt-5'>
          {sortedDates.map((date, index) => (
            <button 
              className={`btn flex flex-col-reverse h-[70px] mr-5 gap-0 ${selectedDate === date ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
              key={index} 
              onClick={() => handleDateClick(date)}
            >
              <span className="text-[10px]">{date.split(' ')[0]}</span>
              <span className="text-2xl">{date.split(' ')[1]}</span>
            </button>
          ))}
        </div>
        
        {/* Time selection Section */}
        {selectedDate && (
          <div className="showtime-details">
            <p className="text-2xl mt-4" >Available Time</p>
            {movie.showtimes
              .filter(showtime => new Date(showtime.time).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) === selectedDate)
              .map((showtime, index) => (
                <button onClick={() => (isLoggedIn ? handleTimeClick(showtime) : null)} key={index} title={!isLoggedIn ? 'You must login first' : ''} className={`btn min-h-0 h-10 my-5 mr-4 ${selectedTime === showtime ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} ${!isLoggedIn ? 'btn-disabled cursor-not-allowed pointer-events-auto' : ''}`}>
                  <p>{new Date(showtime.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</ p>
                </button>
              ))}
              {/* Seats Selection */}
               {selectedTime && (
                  <div>
                    <p>Selected Time: {new Date(selectedTime.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</p>
                    <p>Seats:</p>
                    <div className='w-full btn bg-gray-300 pointer-events-none mb-5'> Screen </div>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedTime.seats.map((seat, index) => (
                        <div className="tooltip" data-tip={seat.available}>
                          <button
                            key={index}
                            className={`btn w-full ${seat.available === 'closed' ? 'bg-gray-500' : (seat.available === 'reserved' ? 'bg-purple-500' : (selectedSeats.some(selectedSeat => selectedSeat.row === seat.row && selectedSeat.number === seat.number) ? 'bg-green-500' : 'bg-white border-solid border-[1px] border-gray-400'))}`}
                            onClick={() => seat.available === 'avialable' ? selectSeats(seat) : null}
                          >
                            <p>{seat.row}{seat.number}</p>
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedSeats.length > 0 && (
                      <div>
                        <p>Selected Seats:</p>
                        {selectedSeats.map((selectedSeat, index) => (
                          <span className='mr-2' key={index}>{selectedSeat.row}{selectedSeat.number}</span>
                        ))}
                        <button
                          className='btn bg-green-500 text-white hover:text-black'
                          onClick={confirmReservation}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                )}
          </div>
      )}

      </div>
    </div>
  );
};

export default Showtimes;
