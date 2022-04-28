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
import { FormControl, Grid, InputLabel, MenuItem, Select, Button } from '@mui/material';
import MultiSelect from '../MultiSelect/MultiSelect';

export const MoviesManager = () => {
  const moviesStore = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  //const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(moviesStore?.categories[0]);
  const [currentItems, setCurrentItems] = useState(null);

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
  }, [dispatch, moviesStore.movies.length])

  useEffect(() => {
    if ((selectedCategory === undefined 
      || !(moviesStore.categories.some((e) => e === selectedCategory)))
       && moviesStore.categories.length) {
        setSelectedCategory(moviesStore.categories[0]);
        console.log('In here');
    }
  }, [selectedCategory, moviesStore.categories])

  return (
    <>
    <MultiSelect
      selected={selectedCategory}
      items={moviesStore.categories}
      onChange={handleSelectChange}
      name={'category'}
    />
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        className={styles.movieGrid}
      >
        {moviesStore.movies.filter((movie) => movie.category === selectedCategory).map((movie: Movie, id: number) =>
        
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
