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
  const { watchedMovies: watched, addMovie, updateMovie } = useWatchedMovie();
  const [query, setQuery] = useState("Deadpool");
  const [selectedId, setSelectedId] = useState(null);

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
        <Box>
          {isMovieListError ? (
            <Error message={isMovieListError} />
          ) : isMovieListLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} handleSelect={handleMovieSelect} />
          )}
        </Box>
        <Box>
          {selectedId === null ? (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          ) : (
            <ChosenMovie
              watched={null}
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
