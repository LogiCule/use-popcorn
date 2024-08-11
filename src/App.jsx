import { useEffect, useState } from "react";
import {
  Box,
  MovieList,
  MovieSummary,
  Navbar,
  Search,
  SearchResults,
  WatchedList,
} from "./components";
import { useMovies } from "./hooks/useMovieData";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("Deadpool");

  const { movies } = useMovies(query);
  useEffect(() => {
    setWatched(tempWatchedData);
  }, []);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </Navbar>
      <main className="main">
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <MovieSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </main>
    </>
  );
}
