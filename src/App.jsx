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

export default function App() {
  const [watched, setWatched] = useState([]);
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
            <ChosenMovie handleDeselect={handleMovieDeSelect} id={selectedId} />
          )}
        </Box>
      </main>
    </>
  );
}
