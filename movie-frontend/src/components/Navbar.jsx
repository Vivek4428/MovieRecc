import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";  // Importing the CSS file

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <nav >
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
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
