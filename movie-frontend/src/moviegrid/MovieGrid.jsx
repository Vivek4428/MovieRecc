import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/movieApi";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MovieGrid.css";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const handleMovieClick = (movie) => {
    if (isLoggedIn) {
      navigate("/movie", { state: { movie } });
    } else {
      toast.error("Please log in to view movie details.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        if (data && data.length > 0) {
          setMovies(data);
        } else {
          throw new Error("No movies found.");
        }
      } catch (err) {
        setError(
          err.message || "Failed to load movies. Please try again later."
        );
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
        <div
          className="movie"
          key={movie.id}
          onClick={() => handleMovieClick(movie)}
        >
          <img
            src={movie.poster || "https://via.placeholder.com/300x450"}
            alt={movie.title || "Untitled Movie"}
            className="moviesimg"
          />
          <div className="details">
            <h3>{movie.title || "Unknown Title"}</h3>
            <p>{movie.genres?.join(", ") || "N/A"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
