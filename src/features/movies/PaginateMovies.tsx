import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../types';
import MovieComponent from './MovieComponent';
import styles from './Movies.module.css';


const PaginateMovies = (props: any) => {
  const { movies } = props;
  const { onButtonClick } = props;
  const { maxItemsPerPage } = props;

  const [currentMovies, setCurrentMovies] = useState(movies);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageChange = (e:any) => {
    const localCurrentPage = parseInt(e.target.innerText, 10);
    console.log(localCurrentPage);
    setItemOffset((localCurrentPage * maxItemsPerPage) % movies.length);
  }

  const [pagesButton] = useState<any>([]);


  useEffect(() => {
    const endOffset = itemOffset + maxItemsPerPage;
    setCurrentMovies(movies.slice(itemOffset, endOffset));

  }, [itemOffset, maxItemsPerPage, setCurrentMovies, movies]);

  useEffect(() => {
      pagesButton.length = 0;
      for (let i = 0; i < Math.ceil(movies.length / maxItemsPerPage); i++) {
        pagesButton.push(<Button onClick={handlePageChange} key={'page'+ i}>{i}</Button>);
      }
  }, [movies]);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        className={styles.movieGrid}
      >
        {currentMovies.map((movie: Movie, id: number) =>
          <Grid
            item
            rowSpacing={{ xs: 2, sm: 4, md: 6 }}
            key={movie.title + '/' + movie.id + '/' + movie.category}
          >
            <MovieComponent
              movie={movie}
              onButtonClick={onButtonClick}
            />
          </Grid>
        )}
      </Grid>
      <div>
        {pagesButton.map((button:any) => button)}
      </div>
    </>
  )
};

export default PaginateMovies;