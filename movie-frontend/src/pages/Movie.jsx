import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Movie.css";

const Movies = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie; 

    if (!movie) {
        return (
            <div className="no-movie">
                <p>No movie details found!</p>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }
    console.log(movie.releaseDate)

    return (
        <div className="movie-details-container">
            <div className="movie-header">
                <img
                    src={movie.poster || "default-poster.jpg"}
                    alt={`${movie.title} Poster`}
                    className="movie-poster"
                />
                <div className="movie-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="movie-release-date">
                        <strong>Release Date:</strong> {movie.releaseDate || "N/A"}
                    </p>
                    <p className="movie-genres">
                        <strong>Genres:</strong> {movie.genres?.join(", ") || "N/A"}
                    </p>
                    {movie.trailerLink && (
                        <p className="movie-trailer">
                            <strong>Trailer:</strong>{" "}
                            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                                Watch Trailer
                            </a>
                        </p>
                    )}
                </div>
            </div>

            <div className="movie-backdrops">
                <h2>Backdrops</h2>
                <div className="backdrop-gallery">
                    {movie.backdrops?.length > 0 ? (
                        movie.backdrops.map((backdrop, index) => (
                            <img
                                key={index}
                                src={backdrop}
                                alt={`Backdrop ${index + 1}`}
                                className="backdrop-image"
                            />
                        ))
                    ) : (
                        <p>No backdrops available</p>
                    )}
                </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default Movies;
