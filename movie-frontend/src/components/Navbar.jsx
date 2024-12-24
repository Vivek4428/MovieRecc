import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/movieApi"; 
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
        const filteredMovies = [];
        try {
            const results = await searchMovies(); // Fetch all movies
            const query = searchQuery.toLowerCase(); // Convert search query to lowercase
            // Filter movies based on the search query
            results.forEach((movie) => {
                if (movie.title.toLowerCase().includes(query)) {
                    filteredMovies.push(movie);
                }
            });

            console.log("Filtered Movies:", filteredMovies);

            // Navigate to the search results page and pass the filtered movies
            navigate("/search", { state: { results: filteredMovies } });
        } catch (error) {
            console.error("Error during movie search:", error.message);
        } finally {
            setIsSearching(false); // End the search
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
