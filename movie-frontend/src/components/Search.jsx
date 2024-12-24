import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.css"; // Optional CSS file for styling

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results } = location.state || { results: [] }; // Get search results or default to an empty array
    const handleMovieClick = (movie) => {
        navigate("/movie", { state: { movie } }); // Pass the selected movie to the Movie page
    };
    return (
        <div className="search-page">
            <h1>Search Results</h1>
            {results.length > 0 ? (
                <div className="results-container">
                    {results.map((movie) => (
                        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                            <img
                                src={movie.poster || "placeholder.jpg"} // Placeholder if no image is available
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="details">
                                {movie.genres[0]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No movies found matching your search criteria.</p>
            )}
        </div>
    );
};

export default Search;
