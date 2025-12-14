import { useRef, useEffect, useState } from "react";
import {
  Box,
  ChosenMovie,
  Error,
  Loader,
  MovieList,
  MovieSummary,
  Navbar,
  Search,
  SearchResults,
  WatchedList,
  EmptyMovieState,
} from "../components";
import { useMovies } from "../hooks/useMovieData";
import { useWatchedMovie } from "../hooks/useWatchedMovie";

export default function MovieApp() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("search");

  const {
    watchedMovies: watched,
    addMovie,
    updateMovie,
    deleteMovie,
  } = useWatchedMovie();
  const {
    movies,
    isLoading: isMovieListLoading,
    isMovieListError,
    total,
    setPage,
  } = useMovies(query);

  const lastElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // Trigger if intersecting AND not currently loading AND we have more to load
        if (target.isIntersecting && !isMovieListLoading && movies.length < total) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { 
        threshold: 0, 
        rootMargin: "200px" // Load 200px before reaching the bottom
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [isMovieListLoading, movies, total, setPage]);

  const handleMovieSelect = (movie) => {
    setSelectedId(movie.imdbID);
    setActiveTab("watched");
  };
  const handleMovieDeSelect = () => {
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#3b2a5f_0%,_var(--background)_100%)] text-foreground flex flex-col">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <div className="md:hidden flex px-4 gap-2 mt-4">
        <button
          onClick={() => setActiveTab("search")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "search"
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          Search Results
        </button>
        <button
          onClick={() => setActiveTab("watched")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "watched"
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {selectedId ? "Movie Details" : "Watched List"}
        </button>
      </div>

      <main className="flex flex-col md:flex-row gap-4 justify-center h-[calc(100vh-14rem)] md:h-[calc(100vh-9rem)] mt-4 w-full px-4 max-w-7xl mx-auto pb-4">
        <Box 
          className={`flex-1 h-full md:h-full overflow-y-auto ${activeTab === "search" ? "block" : "hidden md:block"}`} 
          collapsible={false}
        >
          {isMovieListError ? (
            <Error message={isMovieListError} />
          ) : isMovieListLoading && movies.length === 0 ? (
            <Loader />
          ) : movies.length > 0 ? (
            <>
              <div className="px-4 py-2 border-b border-white/10 bg-primary/20 backdrop-blur-md sticky top-0 z-10">
                <SearchResults resultCount={total} />
              </div>
              <MovieList movies={movies} handleSelect={handleMovieSelect} />
              
              {/* Sentinel for infinite scroll */}
              <div ref={lastElementRef} className="h-4 w-full" />
              
              {/* Show small loader at bottom when fetching more pages */}
              {isMovieListLoading && movies.length > 0 && (
                <div className="p-4 flex justify-center">
                  <Loader />
                </div>
              )}
            </>
          ) : (
            <EmptyMovieState
              message={
                query.length < 3
                  ? "Start by searching for a movie..."
                  : "No movies found."
              }
              type={query.length < 3 ? "welcome" : "no-results"}
              onSearch={setQuery}
            />
          )}
        </Box>
        <Box 
          className={`flex-1 h-full md:h-full overflow-y-auto ${activeTab === "watched" ? "block" : "hidden md:block"}`} 
          collapsible={false}
        >
          {selectedId === null ? (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} handleDelete={deleteMovie} />
            </>
          ) : (
            <ChosenMovie
              watched={watched}
              handleDeselect={handleMovieDeSelect}
              id={selectedId}
              handleAdd={addMovie}
              handleUpdate={updateMovie}
            />
          )}
        </Box>
      </main>
    </div>
  );
}
