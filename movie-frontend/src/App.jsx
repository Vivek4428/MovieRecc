import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GenrePage from './pages/GenrePage';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Search from './components/Search';
import Movie from './pages/Movie'
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
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
                    <Route path="/movie" element={<Movie />} />

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
