import axios from 'axios';

// Base URL configuration for the backend API
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// Interceptor for adding the JWT token to request headers
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token');
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => {
        console.error('Request setup error:', error);
        return Promise.reject(error);
    }
);

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await API.get('/movies');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error.response || error);
        throw error;
    }
};

// Fetch movie details by ID
export const fetchMovieById = async (id) => {
    try {
        const response = await API.get(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error.response || error);
        throw error;
    }
};

// Search movies by query
export const searchMovies = async (query) => {
    try {
        const response = await API.get(`/movies/search/${query}`);
        return response.data;
    } catch (error) {
        console.error(`Error searching movies with query "${query}":`, error.response || error);
        throw error;
    }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genre) => {
    try {
        const response = await API.get(`/movies/genre/${genre}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movies by genre "${genre}":`, error.response || error);
        throw error;
    }
};

// Login user
export const loginUser = async (formData) => {
    try {
        const response = await API.post('/login', {
            username: formData.username,
            password: formData.password,
        });
        // Store the JWT token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error.response || error);
        throw error;
    }
};

// Signup user
export const signupUser = async (formData) => {
    try {
        const response = await API.post('/signup', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });
        return response.data;
    } catch (error) {
        console.error('Error signing up user:', error.response || error);
        throw error;
    }
};
