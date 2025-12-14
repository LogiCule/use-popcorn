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
  EmptyMovieState,
} from "../components";
import { useMovies } from "../hooks/useMovieData";
import { useWatchedMovie } from "../hooks/useWatchedMovie";

export default function MovieApp() {
  const [query, setQuery] = useState("");
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
      </Navbar>
      <main className="flex gap-4 justify-center h-[calc(100vh-9rem)] mt-4 w-full px-4 max-w-7xl mx-auto">
        <Box className="flex-1 overflow-y-auto" collapsible={false}>
          {isMovieListError ? (
            <Error message={isMovieListError} />
          ) : isMovieListLoading ? (
            <Loader />
          ) : movies.length > 0 ? (
            <>
              <div className="px-4 py-2 border-b border-border bg-card sticky top-0 z-10">
                <SearchResults resultCount={total} />
              </div>
              <MovieList movies={movies} handleSelect={handleMovieSelect} />
            </>
          ) : (
            <EmptyMovieState
              message={
                query.length < 3
                  ? "Start by searching for a movie..."
                  : "No movies found."
              }
              type={query.length < 3 ? "welcome" : "no-results"}
              onSearch={setQuery}
            />
          )}
        </Box>
        <Box className="flex-1 overflow-y-auto">
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
