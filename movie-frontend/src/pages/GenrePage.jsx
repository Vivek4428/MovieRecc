import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesByGenre } from '../api/movieApi';
import styled from 'styled-components';

const GenrePage = () => {
    const { genre } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchMoviesByGenre(genre);
            setMovies(data);
        };
        fetchData();
    }, [genre]);

    return (
        <GenreContainer>
            <h2>{genre} Movies</h2>
            <div className="grid">
                {movies.map((movie) => (
                    <div className="movie" key={movie.id}>
                        <img src={movie.posterUrl} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </GenreContainer>
    );
};

const GenreContainer = styled.div`
    padding: 2rem;
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }
    .movie img {
        width: 100%;
        border-radius: 8px;
    }
`;

export default GenrePage;
