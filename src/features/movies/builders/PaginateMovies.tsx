import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button, Grid } from '@mui/material';

import Movie, { MovieElement, MovieButtonHandler } from '../components/Movie';
import styles from '../MovieComponent.module.css';
import { ButtonElement } from '../../../app/types';


export interface PaginateProps {
  movies: MovieElement[],
  onButtonClick: MovieButtonHandler,
  maxItemsPerPage: number,
}

const PaginateMovies = ({
  movies,
  onButtonClick,
  maxItemsPerPage,
}: PaginateProps) => {

  const [currentMovies, setCurrentMovies] = useState(movies);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageChange = useCallback((e: React.MouseEvent) => {
    const localCurrentPage = parseInt((e.target as HTMLElement).innerText, 10);
    setItemOffset((localCurrentPage * maxItemsPerPage) % movies.length);
  }, [maxItemsPerPage, movies.length]);

  const [pagesButton] = useState<ButtonElement[]>([]);


  useEffect(() => {
    const endOffset = itemOffset + maxItemsPerPage;
    setCurrentMovies(movies.slice(itemOffset, endOffset));

  }, [itemOffset, maxItemsPerPage, setCurrentMovies, movies]);

  useEffect(() => {
    pagesButton.length = 0;
    for (let i = 0; i < Math.ceil(movies.length / maxItemsPerPage); i++) {
      pagesButton.push(<Button onClick={handlePageChange} key={'page' + i}>{i}</Button>);
    }
  }, [movies, maxItemsPerPage, handlePageChange, pagesButton]);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        className={styles.movieGrid}
      >
        {currentMovies.map((movie: MovieElement, id: number) =>
          <Grid
            item
            rowSpacing={{ xs: 2, sm: 4, md: 6 }}
            key={"PaginateMovies/" + movie.id}
          >
            <Movie
              movie={movie}
              onButtonClick={onButtonClick}
            />
          </Grid>
        )}
      </Grid>
      <div>
        {pagesButton.map((button: any) => button)}
      </div>
    </>
  )
};

export default PaginateMovies;