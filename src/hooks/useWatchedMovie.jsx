import { useEffect, useState } from "react";

export const useWatchedMovie = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  function addMovie(movie) {
    setWatchedMovies((prev) => [...prev, movie]);
    UpdateLocalStorage();
  }

  function updateMovie(movie) {
    setWatchedMovies((prev) =>
      prev?.map((p) => {
        if (p.imdbID == movie.imdbID) return movie;
        else return p;
      })
    );
    UpdateLocalStorage();
  }

  function UpdateLocalStorage() {
    localStorage.setItem("watched", JSON.stringify(watchedMovies) || []);
  }
  useEffect(() => {
    setWatchedMovies(JSON.parse(localStorage.getItem("watched") || []));
  }, []);

  return { watchedMovies, addMovie, updateMovie };
};
