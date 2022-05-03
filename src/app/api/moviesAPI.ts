import { movies$ } from '../../movies'
import { MovieElement } from '../../features/movies/components/Movie';

export const fetchMovie = async (movieId: string) => {
  return {
    data: (await movies$).find((movie: MovieElement) => movie.id === movieId)
  };
}

export const fetchMovies = async () => {
  return {
    data: (await movies$)
  };
}