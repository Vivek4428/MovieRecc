package com.example.movie.repository;

//import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.movie.model.Movie;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
    // Fetch a movie by IMDb ID
    Optional<Movie> findMovieByImdbId(String imdbId);

    // Fetch movies by genre from an array (case-insensitive)
    List<Movie> findByGenresIgnoreCase(String genre);
}
