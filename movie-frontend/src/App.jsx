import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import GenrePage from "./genrepage/GenrePage";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import About from "./about/About";
import Movie from "./movie/Movie";
import NotFound from "./notfound/NotFound";
import Search from "./search/Search";
import ProtectedRoute from "./context/UserProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      {/* Toastify for all pages */}
      <ToastContainer />
      {/* Common Navbar for all pages */}
      <Navbar />
      <main>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Genre Pages (dynamic) */}
          <Route path="/genre/:genre" element={<GenrePage />} />

          {/* Search Page */}
          <Route path="/search" element={<Search />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Movie Details Page */}
          <Route
            path="/movie"
            element={
              <ProtectedRoute>
                <Movie />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Common Footer for all pages */}
      <Footer />
    </Router>
  );
}

export default App;
