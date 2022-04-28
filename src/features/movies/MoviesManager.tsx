import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  //addMovie,
  //updateMovie,
  deleteMovie,
  //getMovieById,
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
  //const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleDeleteButton = (movie: Movie, e: any) => {
    dispatch(deleteMovie(movie));
  }

  useEffect(() => {
    if (!moviesStore.movies.length) {
      dispatch(loadMovies())
    }
  }, [dispatch, moviesStore])

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      className={styles.movieGrid}
    >
      {moviesStore.movies.map((movie: Movie) =>
        <Grid
          item
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          key={movie.title + '/' + movie.id + '/' + movie.category}
        >
          <MovieComponent
            movie={movie}
            onButtonClick={handleDeleteButton}
          />
        </Grid>
      )}
    </Grid>
  );
}
