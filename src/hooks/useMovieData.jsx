import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const baseURL = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_API_KEY
  }`;

  const searchTerm = useDebounce(query, 1000);

  // Reset page and movies when search term changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      // If we are resetting (page 1 is pending) or empty, don't fetch wrong page
      // But we handled race condition via AbortController so it's fine.
      
      try {
        setIsLoading(true);
        setIsError("");
        
        const res = await fetch(`${baseURL}&s=${searchTerm}&page=${page}`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        
        const data = await res.json();

        if (data.Response === "False") {
           // Only error if page 1. If page > 1 and not found, maybe just end of list?
           // OMDb returns "Movie not found!" for out of range pages too? 
           // Usually it returns "Movie not found!" if page is invalid.
           if (page === 1) {
             setMovies([]);
             setTotal(0);
             throw new Error(data.Error);
           } else {
             // End of list reached potentially, do nothing or stop loading
             return; 
           }
        }

        setTotal(Number(data.totalResults));
        
        if (page === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }
        
        setIsError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          if (err.message !== "Movie not found!") {
             setIsError(err.message);
          } else if (page === 1) {
             setIsError("");
          }
          if (page === 1) setMovies([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    if (searchTerm === "" || searchTerm.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }

    getMovies();

    return () => {
      controller.abort();
    };
  }, [baseURL, searchTerm, page]);

  return { movies, isLoading, isError, total, setPage, page };
};
