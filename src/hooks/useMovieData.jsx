import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_API_KEY
  }`;

  const searchTerm = useDebounce(query, 1000);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseURL}&s=${searchTerm}`);
        console.log({ res });
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        setIsLoading(false);
        setIsError(false);
        if (data.Search) setMovies(data.Search);
      } catch (err) {
        setIsError(err.message);
        console.error({ err: err.message });
      }
    }
    if (searchTerm !== "") getMovies();
  }, [baseURL, searchTerm]);

  return { movies, isLoading, isError };
};
