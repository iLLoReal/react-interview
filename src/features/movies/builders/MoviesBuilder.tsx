import { SyntheticEvent, useEffect, useState } from 'react';
import { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material';

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
  const [selectedCategoryRange, setSelectedCategoryRange] = useState(moviesStore.categories);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(3);

  const handleDeleteButton = (movie: MovieElement) => {
    dispatch(deleteMovie(movie));
  }

  const handleSelectChange = (
    event: SyntheticEvent<Element, Event>,
    value: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    setSelectedCategoryRange(value);
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
    if ((selectedCategoryRange === undefined
      || !(moviesStore.categories.some((e) => selectedCategoryRange.includes(e))))
      && moviesStore.categories.length) {
        console.log('oups');
      setSelectedCategoryRange(moviesStore.categories);
    }
  }, [selectedCategoryRange, moviesStore.categories])

  return (
    <>
      <MultiSelect
        selected={selectedCategoryRange}
        items={moviesStore.categories}
        onChange={handleSelectChange}
        label={'category'}
      />
      <Pagination 
        setter={handleMaxItemsChange}
      />
      <PaginateMovies
        movies={moviesStore.movies.filter((movie) => selectedCategoryRange.includes(movie.category))}
        maxItemsPerPage={maxItemsPerPage}
        onButtonClick={handleDeleteButton}
      />
    </>
  );
}
