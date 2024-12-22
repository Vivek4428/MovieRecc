import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';
import './Hero.css';

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovies();
                if (data && data.length > 0) {
                    setMovies(data.slice(0, 18));
                } else {
                    throw new Error('No movies found.');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch movies.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const interval = setInterval(() => {
                setCurrent((prev) => (prev + 1) % movies.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [movies]);

    if (isLoading) {
        return <div className="hero-container">Loading...</div>;
    }

    if (error) {
        return <div className="hero-container error">{error}</div>;
    }

    return (
        <div className="hero-container">
            {movies.length > 0 && (
                <div className="hero-content">
                    <img
                        src={movies[current]?.backdrops?.[3] || movies[current]?.poster}
                        alt={movies[current]?.title || 'Movie'}
                        className="hero-image fade"
                    />
                    <div className="hero-overlay">
                        <h2 className="hero-title">{movies[current]?.title || 'Untitled Movie'}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
