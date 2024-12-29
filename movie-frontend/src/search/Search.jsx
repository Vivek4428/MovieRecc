import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };
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

  return (
    <div className="search-page">
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <div className="results-container">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={movie.poster || "placeholder.jpg"}
                alt={movie.title}
                className="movie-posters"
              />
              <div className="movie-infos">
                <h3 className="movie-titles">{movie.title}</h3>
                <p className="detail">{movie.genres?.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-result">No movies found matching your search criteria.</p>
      )}
    </div>
  );
};

export default Search;
