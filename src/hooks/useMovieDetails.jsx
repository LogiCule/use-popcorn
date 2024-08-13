import { useEffect, useState } from "react";

export const useMovieDetails = ({ id }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_API_KEY
  }`;
  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseURL}&i=${id}`);
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        setIsLoading(false);
        setIsError(false);
        setMovieDetails(data);
        // if (data.Search) setMovies(data.Search);
        // if (data.totalResults) setTotal(Number(data.totalResults));
      } catch (err) {
        setIsError(err.message);
        console.error({ err: err.message });
      }
    }
    if (id !== null) getMovieDetails();
  }, [id, baseURL]);

  return { movieDetails, isError, isLoading };
};
