import PropTypes from "prop-types";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import Loader from "../Loader";
import Error from "../Error";
import StarRating from "../StarRating";
import { useEffect, useState } from "react";
// import { useState } from "react";

const ChosenMovie = ({
  id,
  handleDeselect,
  handleAdd,
  handleUpdate,
  watched,
}) => {
  const { movieDetails, isError, isLoading } = useMovieDetails({
    id,
  });
  const [rating, setRating] = useState(0);
  const [isWatched, setIsWatched] = useState([]);
  useEffect(() => {
    if (movieDetails?.Title) {
      document.title = movieDetails?.Title;
    }
    return () => (document.title = "usePopcorn");
  }, [movieDetails]);

  useEffect(() => {
    function escape(e) {
      if (e.code === "Escape") handleDeselect();
    }
    document.addEventListener("keydown", escape);

    return () => document.removeEventListener("keydown", escape);
  }, [handleDeselect]);
  useEffect(() => {
    if (watched && movieDetails?.imdbID)
      setIsWatched(watched.filter((w) => w.imdbID === id));
  }, [watched, movieDetails, id]);

  useEffect(() => {
    if (isWatched?.length > 0) {
      setRating(isWatched[0].userRating);
    } else {
      setRating(0);
    }
  }, [id, isWatched]);

  // Reset image error when id changes
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [id]);

  if (movieDetails === null || isLoading) return <Loader />;
  if (isError) return <Error message={isError} />;
  const {
    Poster,
    Title,
    Released,
    Runtime,
    imdbRating,
    Genre,
    Plot,
    Actors,
    Director,
  } = movieDetails;

  const hasPoster = Poster && Poster !== "N/A";

  return (
    <div className="leading-snug text-sm">
      <header className="flex">
        <button className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background text-foreground shadow-md flex items-center justify-center font-bold z-10 hover:bg-muted" onClick={handleDeselect}>
          &larr;
        </button>
        {!hasPoster || imageError ? (
          <div className="w-1/3 bg-muted flex items-center justify-center min-h-[15rem] text-4xl">
            <span>🎥</span>
          </div>
        ) : (
          <img 
            src={Poster} 
            alt={`Poster of ${Title}`} 
            className="w-1/3 object-cover"
            onError={() => setImageError(true)} 
          />
        )}
        <div className="w-full p-6 bg-card flex flex-col gap-3">
          <h2 className="text-2xl font-bold mb-1 leading-tight">{Title}</h2>
          <p className="flex items-center gap-2 text-muted-foreground">
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p className="flex items-center gap-2">
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>

      <section className="p-10 flex flex-col gap-4">
        <div className="bg-secondary/50 rounded-xl p-6 mb-2 font-semibold flex flex-col gap-6">
          <StarRating
            key={id}
            maxRating={10}
            size={24}
            onSetRating={(rate) => {
              setRating(rate);
            }}
            defaultRating={rating}
          />
          {rating ? (
            isWatched.length === 0 ? (
              <button
                className="bg-primary text-primary-foreground border-none rounded-full text-sm p-3 font-bold hover:bg-primary/90 transition-colors w-full"
                onClick={() =>
                  handleAdd({ ...movieDetails, userRating: rating })
                }
              >
                + Add to List
              </button>
            ) : (
              <button
                className="bg-primary text-primary-foreground border-none rounded-full text-sm p-3 font-bold hover:bg-primary/90 transition-colors w-full"
                onClick={() =>
                  handleUpdate({ ...movieDetails, userRating: rating })
                }
              >
                Update
              </button>
            )
          ) : null}
        </div>
        <p>
          <em className="text-muted-foreground">{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
};

ChosenMovie.propTypes = {
  id: PropTypes.string,
  handleDeselect: PropTypes.func,
  handleAdd: PropTypes.func,
  handleUpdate: PropTypes.func,
  watched: PropTypes.array,
};

export default ChosenMovie;
