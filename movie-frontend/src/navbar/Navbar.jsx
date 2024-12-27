import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { searchMovies } from "../api/movieApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/brand.png";
import "./NavBar.css";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    const filteredMovies = [];
    try {
      const results = await searchMovies();
      const query = searchQuery.toLowerCase();
      results.forEach((movie) => {
        if (movie.title.toLowerCase().includes(query)) {
          filteredMovies.push(movie);
        }
      });
      navigate("/search", { state: { results: filteredMovies } });
      setSearchQuery("");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error during movie search:", error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.warning("Logout Successful", {
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
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div className="brand">
        <img alt="Logo" src={logo} onClick={() => handleLogoClick()} />
        <Link to="/">MovieRecc</Link>
      </div>
      <div className={`NavBarContainer ${isMenuOpen ? "active" : ""}`}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSearching}
            className="submit-button"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
        <div className="links">
          <div className="dropdown">
            <div
              className="dropdown-link"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Genres
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {[
                  "Action",
                  "Thriller",
                  "Crime",
                  "Science Fiction",
                  "Animation",
                  "Adventure",
                  "Comedy",
                  "Family",
                  "Horror",
                  "Fantasy",
                ].map((genre) => (
                  <li key={genre}>
                    <button
                      onClick={() => {
                        navigate(`/genre/${genre}`);
                        setIsDropdownOpen(false);
                      }}
                      className="genre-button"
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
