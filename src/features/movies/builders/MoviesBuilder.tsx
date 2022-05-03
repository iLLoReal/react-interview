import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../../app/state/hooks';
import {
  deleteMovie,
  selectMovies,
  loadMovies,
} from '../../../app/state/moviesSlice';
import { MovieElement } from '../components/Movie';
import { InputChangeEvent } from '../../../app/types';
import MultiSelect from '../../multi-select/components/MultiSelect';
import PaginateMovies from './PaginateMovies';
import Pagination from '../components/Pagination';


export const MoviesBuilder = () => {
  const moviesStore = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  //const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(moviesStore.categories[0]);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(3);

  const handleDeleteButton = (movie: MovieElement) => {
    dispatch(deleteMovie(movie));
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  }

  const handleMaxItemsChange = (event: InputChangeEvent) => {
    const newValue = parseInt(event.target.value, 10);
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
      <Pagination 
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
