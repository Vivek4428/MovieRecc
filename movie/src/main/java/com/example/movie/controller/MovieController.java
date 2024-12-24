package com.example.movie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.movie.model.Movie;
import com.example.movie.service.MovieService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    // Fetch all movies
    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> movies = service.findAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Fetch a single movie by IMDb ID
    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId) {
        Optional<Movie> movie = service.findMovieByImdbId(imdbId);
        if (movie.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    // Fetch movies by genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@PathVariable String genre) {
        List<Movie> moviesByGenre = service.findMoviesByGenre(genre);

        if (moviesByGenre.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(moviesByGenre); // Return empty list for clarity
        }

        return new ResponseEntity<>(moviesByGenre, HttpStatus.OK);
    }
}
