import React, { useState } from 'react';

const Status = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const handleConfirmCancel = () => {
    // Handle the cancellation logic here
    setShowPopup(false);
  };

  const handleCancelPopupClose = () => {
    setShowPopup(false);
  };

  const mockupData = [
    {
      Movie: "Inception",
      Seats: ["A1"],
      Time: "14:30 - 16:30",
      User: "JohnDoe"
    },
    {
      Movie: "The Dark Knight",
      Seats: ["B1"],
      Time: "18:15 - 20:15",
      User: "JohnDoe"
    },
    {
      Movie: "Interstellar",
      Seats: ["C1"],
      Time: "20:30 - 22:30",
      User: "JohnDoe"
    },
    {
      Movie: "The Matrix",
      Seats: ["D1"],
      Time: "16:45 - 18:45",
      User: "JohnDoe"
    },
    {
      Movie: "Blade Runner",
      Seats: ["E1"],
      Time: "22:45 - 00:45",
      User: "JohnDoe"
    }
  ];

  return (
    <div className='flex flex-col'>
      {mockupData.map((movie) => (
        <div key={movie.Movie} class="collapse bg-base-200 my-3 mx-auto w-[95%]">
          <input type="checkbox" /> 
          <div class="collapse-title text-xl font-medium flex">
            <h2>{movie.Movie}&nbsp;&nbsp;</h2>
            <p>Seats:{movie.Seats}&nbsp;&nbsp;</p>
            <p>Time: {movie.Time}</p>
          </div>
          <div class="collapse-content"> 
            <div className='btn bg-red-400 min-h-[35px] h-2 hover:bg-red-600 hover:text-white' onClick={handleCancelClick}>Cancel</div>
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
  );
};

export default Status