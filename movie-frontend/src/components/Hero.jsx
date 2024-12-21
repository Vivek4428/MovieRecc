import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';
import './Hero.css'; 

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await fetchMovies();
                console.log(data);
                setMovies(data.slice(0, 12)); 
            } catch (error) {
                console.error('Error fetching movies:', error);
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

    return (
        <div className="hero-container">
            {movies.length > 0 && (
                <div className="hero-content">
                    <img
                        src={movies[current].backdrops[3]}
                        alt={movies[current].title}
                        className="hero-image fade"
                    />
                    <div className="hero-overlay">
                        <h2 className="hero-title">{movies[current].title}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
