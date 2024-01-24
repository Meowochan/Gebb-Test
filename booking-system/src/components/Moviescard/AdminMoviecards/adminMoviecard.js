import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="h-96 w-64" onClick={() => onClick(movie)}>
      <img className='rounded-xl cursor-pointer' src={movie.cover} alt={movie.title} />
      <p className='mt-4 text-center text-xl cursor-pointer'>{movie.title}</p>
    </div>
  );
};

export default MovieCard;
