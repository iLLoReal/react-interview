import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  deleteMovie,
  selectMovies,
  loadMovies,
} from './moviesSlice';
import { Movie } from '../../types';
import MovieComponent from './MovieComponent';
import { FormControl, Grid, InputLabel, MenuItem, Select, Button } from '@mui/material';
import MultiSelect from '../multi-select/MultiSelect';
import PaginateMovies from './PaginateMovies';

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

  const handleSelectChange = (e: any) => {
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
      <PaginateMovies
        movies={moviesStore.movies.filter((movie) => movie.category === selectedCategory)}
        maxItemsPerPage={3}
        onButtonClick={handleDeleteButton}
      />
    </>
  );
}
