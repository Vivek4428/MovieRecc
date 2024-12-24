import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/movieApi"; // Import searchMovies from updated API
import "./NavBar.css";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            const results = await searchMovies(searchQuery);
            console.log("Search Results:", results);
            navigate("/search", { state: { results } }); // Navigate to a search results page
        } catch (error) {
            console.error("Error searching movies:", error.message);
        } finally {
            setIsSearching(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleGenreClick = (genre) => {
        setIsDropdownOpen(false);
        navigate(`/genre/${genre}`);
    };
      

    return (
        <nav>
            <div className="brand">
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
                    <button type="submit" disabled={isSearching} className="submit-button">
                        {isSearching ? "Searching..." : "Search"}
                    </button>
                </form>
                <div className="links">
                    <div className="dropdown">
                        {/* Click event to toggle dropdown */}
                        <div
                            className="dropdown-link"
                            onClick={toggleDropdown}
                            aria-label="Genre Dropdown"
                        >
                            Genres
                        </div>
                        {/* Dropdown menu */}
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
                                            onClick={() => handleGenreClick(genre)}
                                            className="genre-button"
                                        >
                                            {genre}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to="/about">About</Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    )}
                </div>
            </div>
            <div
                className="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;
