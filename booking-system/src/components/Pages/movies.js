import React, { useState, useEffect } from 'react';
import MovieCard from '../Moviescard/Moviecard';
import MovieCarousal from '../Moviescard/MovieCarousal';
import Showtimes from '../Moviescard/Showtime';


const Movies = ({ isLoggedIn }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movie data from your Express server
    fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movie data:', error));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseShowtimes = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <MovieCarousal/>
      <p className='text-3xl ml-10 mb-10 mt-10'>Now Showing</p>
      <div className="flex">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>
      {selectedMovie && (
        <Showtimes movie={selectedMovie} onClose={handleCloseShowtimes} isLoggedIn={isLoggedIn}/>
      )}
    </div>
  );
};

export default Movies