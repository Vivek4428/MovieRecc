import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchMovies } from '../api/movieApi';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchMovies();
            setMovies(data);
        };
        fetchData();
    }, []);

    return (
        <Grid>
            {movies.map((movie) => (
                <div className="movie" key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <div className="details">
                        <h3>{movie.title}</h3>
                        <p>{movie.genre}</p>
                    </div>
                </div>
            ))}
        </Grid>
    );
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 1rem;
    gap: 1rem;
    .movie { img { width: 100%; } }
`;

export default MovieGrid;
