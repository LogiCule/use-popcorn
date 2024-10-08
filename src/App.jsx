import { useState } from "react";
import {
  Box,
  ChosenMovie,
  Error,
  Loader,
  MovieList,
  MovieSummary,
  Navbar,
  Search,
  SearchResults,
  WatchedList,
} from "./components";
import { useMovies } from "./hooks/useMovieData";
import { useWatchedMovie } from "./hooks/useWatchedMovie";

export default function App() {
  const [query, setQuery] = useState("Deadpool");
  const [selectedId, setSelectedId] = useState(null);

  const {
    watchedMovies: watched,
    addMovie,
    updateMovie,
    deleteMovie,
  } = useWatchedMovie();
  const {
    movies,
    isLoading: isMovieListLoading,
    isMovieListError,
    total,
  } = useMovies(query);

  const handleMovieSelect = (movie) => {
    setSelectedId(movie.imdbID);
  };
  const handleMovieDeSelect = () => {
    setSelectedId(null);
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults resultCount={total} />
      </Navbar>
      <main className="main">
        <Box extraClass="movie-list">
          {isMovieListError ? (
            <Error message={isMovieListError} />
          ) : isMovieListLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} handleSelect={handleMovieSelect} />
          )}
        </Box>
        <Box extraClass="watch-list">
          {selectedId === null ? (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} handleDelete={deleteMovie} />
            </>
          ) : (
            <ChosenMovie
              watched={watched}
              handleDeselect={handleMovieDeSelect}
              id={selectedId}
              handleAdd={addMovie}
              handleUpdate={updateMovie}
            />
          )}
        </Box>
      </main>
    </>
  );
}
