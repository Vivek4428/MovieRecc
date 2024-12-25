import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.css"; 

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results } = location.state || { results: [] }; 

    const handleMovieClick = (movie) => {
        navigate("/movie", { state: { movie } }); 
    };
    return (
        <div className="search-page">
            <h1>Search Results</h1>
            {results.length > 0 ? (
                <div className="results-container">
                    {results.map((movie) => (
                        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                            <img
                                src={movie.poster || "placeholder.jpg"}
                                alt={movie.title}
                                className="movie-posters"
                            />
                            <div className="movie-infos">
                                <h3 className="movie-titles">{movie.title}</h3>
                                <p className="detail">
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
