import { useEffect, useState } from 'react';
import Sad from "./Assets/sad.png"
import { Link } from 'react-router-dom'

const Status = ({ isLoggedIn }) => {
  const [reservations, setReservations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [cancelData, setCancelData] = useState(null);
  const token = localStorage.getItem('token');

  const handleCancelClick = (token, time, row, number, title) => {
    setCancelData({ token, time, row, number, title });
    setShowPopup(true);
  };
  const handleConfirmCancel = () => {
    const { token, time, row, number, title } = cancelData;
    fetch('http://localhost:8000/cancelReservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, time, row, number, title }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server as needed
        console.log('Cancellation response:', data);
        setReservations(data.reservations)
      })
      .catch(error => console.error('Error cancelling reservation:', error));

    // Close the confirmation popup
    setShowPopup(false);
  };
  const handleCancelPopupClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Fetch reservations for the current user
    fetch(`http://localhost:8000/reservations/${token}`)
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div className='h-screen'>
      {isLoggedIn ? (
        <div className='h-[100%]'>
          {reservations && reservations.length > 0 ? (
            <div className='flex flex-col'>
              {reservations.map((reservation) => (
                <div key={reservation._id} className="bg-base-200 my-3 mx-auto w-[95%] p-4 rounded-2xl h-full">
                  <div className="text-xl font-medium flex items-center">
                    <h2>{reservation.title}</h2>
                  </div>
                  <div className="relative pl-5"> {/* Indent for better visual hierarchy */}
                    <p>Time: {reservation.time}</p>
                    <p>Seats: {`${reservation.seats.row}${reservation.seats.number}`}</p>
                    <div className='absolute right-0 bottom-0 btn bg-red-400 min-h-[35px] h-2 hover:bg-red-600 hover:text-white' onClick={() => handleCancelClick(token, reservation.time, reservation.seats.row, reservation.seats.number, reservation.title)}>Cancel</div>
                  </div>
                </div>
              ))}
              {showPopup && (
                <div className='fixed z-10 top-0 left-0 bg-opacity-70 w-screen h-screen bg-gray-500 flex'>
                  <div className="modal-box m-auto h-fit">
                    <p>Are you sure you want to cancel?</p>
                    <button onClick={handleConfirmCancel} className='btn min-h-[35px] h-5 bg-red-400 hover:bg-red-600 hover:text-white'>Yes</button>
                    <button onClick={handleCancelPopupClose} className='btn min-h-[35px] h-5 ml-5'>No</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center align-middle mt-[-12rem] h-[100%]'>
              <img src={Sad} alt="Sad Face" className='h-64' />
              <p className='mt-10 text-3xl font-bold text-gray-600'>Your Ticket list is Empty! Go book some seats.</p>
            </div>
          )}
        </div>
      ) : (
        <div className='flex items-center justify-center align-middle mt-[-12rem] h-[100%]'>
          <span className='mt-10 text-3xl font-bold text-gray-600'>Please&nbsp;</span>
          <Link to='/login' className='mt-10 text-3xl font-bold text-cyan-600'>Login</Link>
          <span className='mt-10 text-3xl font-bold text-gray-600'>&nbsp;to veiw your reservation list</span>
        </div>
      )}
    </div>
  );
};

export default Status