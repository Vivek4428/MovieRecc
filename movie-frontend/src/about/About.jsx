import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About MovieRecc</h1>
      <p>
        Welcome to <strong>MovieRecc</strong>, your ultimate destination for
        discovering movies tailored to your preferences. Our platform offers
        personalized recommendations, trending titles, and an extensive library
        of movies across genres.
      </p>
      <p>
        Whether you’re a fan of action, drama, romance, or sci-fi, MovieRecc
        makes it easy for you to explore, learn about, and enjoy movies from
        around the world.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Personalized movie recommendations.</li>
        <li>Advanced search and filtering options.</li>
        <li>Trending movies and curated lists.</li>
        <li>User-friendly interface for seamless browsing.</li>
      </ul>
      <p>
        Thank you for choosing MovieRecc as your trusted companion in the world
        of entertainment. Happy watching!
      </p>
    </div>
  );
};

export default About;
