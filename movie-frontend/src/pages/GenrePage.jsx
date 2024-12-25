import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMoviesByGenre } from '../api/movieApi';
import './GenrePage.css';

const GenrePage = () => {
    const { genre } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const handleMovieClick = (movie) => {
        navigate("/movie", { state: { movie } })
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchMoviesByGenre(genre);
                setMovies(data);
                setErrorMessage('');
            } catch (error) {
                if (error.message.includes('401')) {
                    setErrorMessage('You need to log in to view movies by genre.');
                } else if (error.message.includes('404')) {
                    setErrorMessage(`No movies found in the "${genre}" genre.`);
                } else {
                    setErrorMessage('Unable to load movies. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [genre]);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="genre-container">
            <h2>{genre} Movies</h2>
            {loading ? (
                <div className="loading-message">Loading movies...</div>
            ) : errorMessage ? (
                <div className="error-message">
                    <p>{errorMessage}</p>
                    {errorMessage.includes('log in') && (
                        <button onClick={handleLoginRedirect}>Log In</button>
                    )}
                </div>
            ) : (
                <div className="grid">
                    {movies.map((movie) => (
                        <div className="movie" key={movie.genre} onClick={() => handleMovieClick(movie)}>
                            <img src={movie.poster || '/placeholder.jpg'} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenrePage;
