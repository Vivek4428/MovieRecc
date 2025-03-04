import axios from "axios";

// Base URL configuration for the backend API
const API = axios.create({ baseURL: "https://movierecc-backend.vercel.app/api" });

// Interceptor for adding the JWT token to request headers
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    console.error("Request setup error:", error);
    return Promise.reject(error);
  }
);

// Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await API.get("/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response || error);
    throw new Error("Unable to fetch movies. Please try again later.");
  }
};

// Fetch movie details by ID
export const fetchMovieById = async (id) => {
  try {
    const response = await API.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching movie with ID ${id}:`,
      error.response || error
    );
    throw new Error("Unable to fetch movie details. Please try again later.");
  }
};

// Search movies by query
export const searchMovies = async () => {
  try {
    const response = await API.get(`/movies`);
    return response.data;
  } catch (error) {
    console.error(`api movie list fetching error `);
    throw new Error("Unable to search movies. Please try again later.");
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genre) => {
  try {
    const response = await API.get(`/movies/genre/${genre}`);
    if (!response.data || response.data.length === 0) {
      throw new Error(`No movies found for the genre "${genre}".`);
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching movies by genre "${genre}":`,
      error.response || error
    );
    throw new Error(
      `Unable to fetch movies for genre "${genre}". Please try again later.`
    );
  }
};

// Login user
export const loginUser = async (formData) => {
  try {
    const response = await API.post("/login", formData);
    // console.log("response : ",response.data)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response || error);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

// Signup user
export const signupUser = async (formData) => {
  try {
    const response = await API.post("/signup", formData);
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error.response || error);
    throw new Error("Signup failed. Please try again later.");
  }
};
