import { useState } from "react";

export const useWatchedMovie = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  function addMovie(movie) {
    setWatchedMovies((prev) => [...prev, movie]);
  }

  function updateMovie(movie) {
    setWatchedMovies((prev) =>
      prev.map((p) => {
        if (p.imdbID == movie.imdbID) return movie;
        else return p;
      })
    );
  }
  return { watchedMovies, addMovie, updateMovie };
};
