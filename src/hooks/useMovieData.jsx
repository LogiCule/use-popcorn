import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const baseURL = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_API_KEY
  }`;

  const searchTerm = useDebounce(query, 1000);

  useEffect(() => {
    async function getMovies() {
      console.log({ getMovies: "in here" });
      const res = await fetch(`${baseURL}&s=${searchTerm}`);
      const data = await res.json();
      if (data.Search) setMovies(data.Search);
      //   setMovies(data.Search.movies);
    }
    if (searchTerm !== "") getMovies();
  }, [baseURL, searchTerm]);

  return { movies };
};
