import React, { useState, useEffect } from 'react';
import AdminShowtime from '../Moviescard/AdminMoviecards/adminShowtime'
import AdminMoviecard from '../Moviescard/AdminMoviecards/adminMoviecard'

const AdminPanel = () => {
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
            <p className='text-3xl mb-5 ml-10 border-b-2 w-fit pb-2 border-gray-400'>Control the seats availability here!</p>
            <div className="flex flex-wrap gap-x-10 px-20 gap-y-20">
                {movies.map((movie, index) => (
                    <AdminMoviecard key={index} movie={movie} onClick={handleMovieClick} />
                ))}
            </div>
            {selectedMovie && (
                <AdminShowtime movie={selectedMovie} onClose={handleCloseShowtimes}/>
            )}
        </div>
    )
}

export default AdminPanel