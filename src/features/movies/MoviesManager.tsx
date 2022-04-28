import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  deleteMovie,
  selectMovies,
  loadMovies,
} from './moviesSlice';
import { Movie } from '../../types';
import MovieComponent from './MovieComponent';
import styles from './Movies.module.css';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

export const MoviesManager = () => {
  const moviesStore = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  //const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(moviesStore?.categories[0]);

  const handleDeleteButton = (movie: Movie, e: any) => {
    dispatch(deleteMovie(movie));
    console.log(moviesStore.categories);
    console.log(moviesStore);
  }

  const handleSelectChange = (e :any) => {
    setSelectedCategory(e.target.value);
  }

  useEffect(() => {
    if (!moviesStore.movies.length) {
      dispatch(loadMovies())
    }
  }, [dispatch, moviesStore.movies])

  useEffect(() => {
    if ((selectedCategory === undefined || !(moviesStore.categories.some((e) => e === selectedCategory))) && moviesStore.categories.length) {
      setSelectedCategory(moviesStore.categories[0]);
      console.log('In here');
      console.log(moviesStore.categories);
    }
  }, [selectedCategory, moviesStore.categories])

  return (
    <>
    {selectedCategory && moviesStore.categories.includes(selectedCategory) &&
      <FormControl>
        <InputLabel id='select-movie-label'>Movie</InputLabel>
        <Select
          labelId='select-movie-label'
          id='select-movie'
          value={selectedCategory}
          onChange={handleSelectChange}
        >
          {moviesStore.categories.map((category: string, id: number) =>
            <MenuItem
              key={'category/' + category + '/' + id}
              value={category}>{category}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    }
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        className={styles.movieGrid}
      >
        {moviesStore.movies.filter((movie) => movie.category === selectedCategory).map((movie: Movie) =>
          <Grid
            item
            rowSpacing={{ xs: 2, sm: 4, md: 6 }}
            key={movie.title + '/' + movie.id + '/' + movie.category}
          >
            <MovieComponent
              movie={movie}
              onButtonClick={handleDeleteButton}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
