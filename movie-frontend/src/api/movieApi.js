import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// Interceptor for adding auth token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchMovies = () => API.get('/movies');
export const fetchMovieById = (id) => API.get(`/movies/${id}`);
export const searchMovies = (query) => API.get(`/movies/search/${query}`);
export const fetchMoviesByGenre = (genre) => API.get(`/movies/genre/${genre}`);
export const loginUser = (formData) => API.post('/login', formData);
export const signupUser = (formData) => API.post('/signup', formData);
