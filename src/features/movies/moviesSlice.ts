import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Movie } from '../../types'; 
import { fetchMovie, fetchMovies } from './moviesAPI';

export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie;
  categories: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: {id: '', title: '', category: '', likes: 0, dislikes: 0},
  categories: [],
  status: 'idle',
};

const filterCategories = (state: MoviesState) => {
  state.categories = state.categories.filter((category) => state.movies.some((movie) => category === movie.category));
  state.movies.forEach((movie) => { 
    if (!state.categories.some((category) => movie.category === category))
      state.categories.push(movie.category);
    });
}

const filterCategory = (state: MoviesState, givenCategory: string) => {
  state.categories = state.categories.filter((category) => givenCategory === category);
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
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
      addMissingCategory(state, action.payload.category);
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const newMovie: Movie = action.payload;
      const movieIndex = state.movies.findIndex(movie => movie?.id === newMovie.id);
      if (movieIndex !== -1) {
        state.movies.splice(movieIndex, 1, newMovie)
      }
      addMissingCategory(state, action.payload.category);
      filterCategory(state, action.payload.category);
    },
    deleteMovie: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.movies.findIndex(e => e?.id === action.payload.id);
      state.movies.splice(movieIndex, 1);
      filterCategory(state, action.payload.category);
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
        console.log(`ici notre payload vaut ${action.payload}`);
        state.movies = action.payload;
        filterCategories(state);
      })
      .addCase(loadMovies.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { addMovie, updateMovie, deleteMovie } = moviesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovies = (state: RootState) => state.movies;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default moviesSlice.reducer;


const addMissingCategory = (state: MoviesState, potentiallyNewCategory: string) => {
    if (!state.categories.some((category: string) => potentiallyNewCategory === category))
      state.categories.push(potentiallyNewCategory);
}

