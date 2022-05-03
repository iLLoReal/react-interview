import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { MovieElement } from '../../features/movies/components/Movie';
import { fetchMovie, fetchMovies } from '../api/moviesAPI';

export interface MoviesState {
  movies: MovieElement[];
  selectedMovie: MovieElement;
  categories: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: { id: '', title: '', category: '', likes: 0, dislikes: 0 },
  categories: [],
  status: 'idle',
};

export const filterCategories = (state: MoviesState) => {
  state.categories = state.categories.filter((category) => state.movies.some((movie) => category === movie.category));
  state.movies.forEach((movie) => {
    if (!state.categories.some((category) => movie.category === category))
      state.categories.push(movie.category);
  });
}

const addMissingCategory = (state: MoviesState, potentiallyNewCategory: string) => {
  if (!state.categories.some((category: string) => potentiallyNewCategory === category))
    state.categories.push(potentiallyNewCategory);
}

export const getMovieById = createAsyncThunk(
  'movies/fetchMovie',
  async (movieId: string) => {
    const response = await fetchMovie(movieId);
    return response.data;
  }
);

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async () => {
    const response = await fetchMovies();
    return response.data;
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<MovieElement>) => {
      state.movies.push(action.payload);
      addMissingCategory(state, action.payload.category);
    },
    updateMovie: (state, action: PayloadAction<MovieElement>) => {
      const newMovie: MovieElement = action.payload;
      const movieIndex = state.movies.findIndex(movie => movie?.id === newMovie.id);
      if (movieIndex !== -1) {
        state.movies.splice(movieIndex, 1, newMovie)
      }
      filterCategories(state);
    },
    deleteMovie: (state, action: PayloadAction<MovieElement>) => {
      const movieIndex = state.movies.findIndex(e => e?.id === action.payload.id);
      state.movies.splice(movieIndex, 1);
      filterCategories(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedMovie = action.payload ? action.payload : null;
      })
      .addCase(getMovieById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
        filterCategories(state);
      })
      .addCase(loadMovies.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { addMovie, updateMovie, deleteMovie } = moviesSlice.actions;
export const selectMovies = (state: RootState) => state.movies;
export default moviesSlice.reducer;