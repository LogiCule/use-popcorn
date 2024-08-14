import { useEffect, useState } from "react";

export const useWatchedMovie = () => {
  const [watchedMovies, setWatchedMovies] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );
  function addMovie(movie) {
    setWatchedMovies((prev) => {
      const list = [...prev, movie];
      return list;
    });
  }

  function updateMovie(movie) {
    setWatchedMovies((prev) =>
      prev?.map((p) => {
        if (p.imdbID == movie.imdbID) return movie;
        else return p;
      })
    );
  }

  function deleteMovie(id) {
    setWatchedMovies((prev) => prev?.filter((p) => p.imdbID !== id));
  }

  useEffect(() => {
    if (watchedMovies)
      localStorage.setItem("watched", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return { watchedMovies, addMovie, updateMovie, deleteMovie };
};
