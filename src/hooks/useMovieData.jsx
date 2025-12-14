import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
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
        setIsError("");
        const res = await fetch(`${baseURL}&s=${searchTerm}`);
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();

        if (data.Response === "False") {
           // If movie is not found, clear list but don't treat as a critical "error" if we just want empty list
           // However, OMDb usually sends "Movie not found!"
           setMovies([]); 
           setTotal(0);
           throw new Error(data.Error);
        }

        setMovies(data.Search);
        setTotal(Number(data.totalResults));
        setIsError(""); 
      } catch (err) {
        if(err.message !== "Movie not found!"){
             setIsError(err.message);
        } else {
             setIsError(""); // Don't show error box for "not found", just show empty list
        }
        setMovies([]); // Ensure movies are cleared on error
      } finally {
        setIsLoading(false);
      }
    }

    if (searchTerm === "" || searchTerm.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }
    
    getMovies();
  }, [baseURL, searchTerm]);

  return { movies, isLoading, isError, total };
};
