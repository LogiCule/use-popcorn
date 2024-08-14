import { useEffect, useState } from "react";

export const useWatchedMovie = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  function addMovie(movie) {
    setWatchedMovies((prev) => {
      const list = [...prev, movie];
      localStorage.setItem("watched", JSON.stringify(list));
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
    UpdateLocalStorage();
  }

  function UpdateLocalStorage() {
    if (watchedMovies)
      localStorage.setItem("watched", JSON.stringify(watchedMovies));
  }

  useEffect(() => {
    setWatchedMovies(JSON.parse(localStorage.getItem("watched")) || []);
  }, []);

  return { watchedMovies, addMovie, updateMovie };
};
