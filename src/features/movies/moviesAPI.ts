import { movies$ } from '../../movies'
import { Movie } from '../../types';

export const fetchMovie = async (movieId: string) => {
  return {
    data: (await movies$).find((movie: Movie) => movie.id === movieId)
  };
}

export const fetchMovies = async () => {
  return {
    data: (await movies$)
  };
}