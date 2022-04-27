import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  selectMovies,
  loadMovies
} from './moviesSlice';
import { Movie } from '../../types';
import MovieComponent from './MovieComponent';
import styles from './Movies.module.css';
import { Grid } from '@mui/material';

export const MoviesManager = () => {
  const moviesStore = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onButtonClick = (e:any) => {
      console.log(e.target);
  }

  useEffect(() => {
    if (!moviesStore.movies.length) {
      dispatch(loadMovies())
    }
    console.log('Inside useEffect');
  }, [dispatch, moviesStore])

  return (
    <Grid columnSpacing='200px'>
      {moviesStore.movies.map((movie: Movie) =>
      <div key={movie.title + '/' + movie.id + '/' + movie.category}>
          <MovieComponent
            movie={movie}
            onButtonClick={onButtonClick}
          />
      </div>
      )}
    </Grid>
  );
}
