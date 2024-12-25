import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MovieGrid.css';
import { fetchMovies } from '../api/movieApi';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleMovieClick = (movie) => {
        navigate("/movie", { state: { movie } })
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovies();
                if (data && data.length > 0) {
                    setMovies(data);
                } else {
                    throw new Error('No movies found.');
                }
            } catch (err) {
                setError(err.message || 'Failed to load movies. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="message">Loading movies...</div>;
    }

    if (error) {
        return <div className="message">{error}</div>;
    }

    if (!movies || movies.length === 0) {
        return <div className="message">No movies found.</div>;
    }

    return (
        <div className="grid">
            {movies.map((movie) => (
                <div className="movie" key={movie.id} onClick={() => handleMovieClick(movie)}>
                    <img
                        src={movie.poster || 'https://via.placeholder.com/300x450'}
                        alt={movie.title || 'Untitled Movie'}
                        className='moviesimg'
                    />
                    <div className="details">
                        <h3>{movie.title || 'Unknown Title'}</h3>
                        <p><b>Genres: </b>{movie.genres?.join(", ") || "N/A"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieGrid;
