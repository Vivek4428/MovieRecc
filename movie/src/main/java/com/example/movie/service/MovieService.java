package com.example.movie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie.model.Movie;
import com.example.movie.repository.MovieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    // Fetch all movies
    public List<Movie> findAllMovies() {
        return repository.findAll();
    }

    // Fetch a movie by IMDb ID
    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }

    // Fetch movies by genre
    public List<Movie> findMoviesByGenre(String genre) {
        return repository.findByGenresIgnoreCase(genre);
    }
}
