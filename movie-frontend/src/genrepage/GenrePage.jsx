import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMoviesByGenre } from "../api/movieApi";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GenrePage.css";

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext);

  const handleMovieClick = (movie) => {
    if (isLoggedIn) {
      navigate("/movie", { state: { movie } });
    } else {
      toast.info("Please log in to view movie details.", {
        position: "top-center",
        autoClose: 3000,
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
      setLoading(true);
      try {
        const data = await fetchMoviesByGenre(genre);
        setMovies(data);
        setErrorMessage("");
      } catch (error) {
        if (error.message.includes("401")) {
          setErrorMessage("You need to log in to view movies by genre.");
        } else if (error.message.includes("404")) {
          setErrorMessage(`No movies found in the "${genre}" genre.`);
        } else {
          setErrorMessage("Unable to load movies. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="genre-container">
      <h2>{genre} Movies</h2>
      {loading ? (
        <div className="loading-message">Loading movies...</div>
      ) : errorMessage ? (
        <div className="error-message">
          <p>{errorMessage}</p>
          {errorMessage.includes("log in") && (
            <button onClick={handleLoginRedirect}>Log In</button>
          )}
        </div>
      ) : (
        <div className="grids">
          {movies.map((movie) => (
            <div
              className="movies"
              key={movie.genre}
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster || "/placeholder.jpg"} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
