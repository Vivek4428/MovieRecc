import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/movieApi";
import "./Hero.css";

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
          setMovies(data.slice(0, 20));
        } else {
          throw new Error("No movies found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch movies.");
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

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (isLoading) {
    return <div className="hero-container">Loading...</div>;
  }

  if (error) {
    return <div className="hero-container error">{error}</div>;
  }

  return (
    <div className="hero-container">
      <div className="hero-slider">
        {movies.map((movie, index) => (
          <div
            key={movie.id || index}
            className={`hero-slide ${
              index === current ? "active" : "inactive"
            }`}
          >
            <img
              src={movie?.backdrops?.[3] || movie?.poster}
              alt={movie?.title || "Movie"}
              className="hero-image"
            />
            <div className="hero-overlay">
              <h2 className="hero-title">{movie?.title || "Untitled Movie"}</h2>
            </div>
          </div>
        ))}
      </div>
      <button className="hero-arrow prev" onClick={handlePrev}>
        &#8249;
      </button>
      <button className="hero-arrow next" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
};

export default Hero;
