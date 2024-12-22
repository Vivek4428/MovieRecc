import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Importing the CSS file

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set login state based on token presence
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        setIsLoggedIn(false); // Update login state
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav>
            <div className="brand">
                <Link to="/">MovieRecc</Link>
            </div>
            <div className="NavBarContainer">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="links">
                    <Link to="/genres">Genres</Link>
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
        </nav>
    );
};

export default Navbar;
