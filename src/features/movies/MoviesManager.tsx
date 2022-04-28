import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  deleteMovie,
  selectMovies,
  loadMovies,
} from './moviesSlice';
import { Movie } from '../../types';
import MultiSelect from '../multi-select/MultiSelect';
import PaginateMovies from './PaginateMovies';
import MaxMoviesPerPageInput from './MaxMoviesPerPageInput';

export const MoviesManager = () => {
  const moviesStore = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  //const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(moviesStore?.categories[0]);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(3);

  const handleDeleteButton = (movie: Movie, e: any) => {
    dispatch(deleteMovie(movie));
  }

  const handleSelectChange = (e: any) => {
    setSelectedCategory(e.target.value);
  }

  const handleMaxItemsChange = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue))
      setMaxItemsPerPage(newValue);
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
      <MaxMoviesPerPageInput 
        setter={handleMaxItemsChange}
      />
      <PaginateMovies
        movies={moviesStore.movies.filter((movie) => movie.category === selectedCategory)}
        maxItemsPerPage={maxItemsPerPage}
        onButtonClick={handleDeleteButton}
      />
    </>
  );
}
