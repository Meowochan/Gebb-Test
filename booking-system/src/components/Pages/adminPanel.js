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
            <div className="flex">
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