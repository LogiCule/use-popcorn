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
    if (movieDetails?.imdbID)
      setIsWatched(watched.filter((w) => w.imdbID === id));
  }, [watched, movieDetails, id]);

  useEffect(() => {
    if (isWatched?.length > 0) {
      setRating(isWatched[0].userRating);
    } else {
      setRating(0);
    }
  }, [id, isWatched]);

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

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleDeselect}>
          &larr;
        </button>
        <img src={Poster} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating
            key={id}
            maxRating={10}
            size={24}
            onSetRating={(rate) => {
              setRating(rate);
            }}
            defaultRating={rating}
          />
          {isWatched.length === 0 ? (
            <button
              className="btn-add"
              onClick={() => handleAdd({ ...movieDetails, userRating: rating })}
            >
              Add
            </button>
          ) : (
            <button
              className="btn-add"
              onClick={() =>
                handleUpdate({ ...movieDetails, userRating: rating })
              }
            >
              Update
            </button>
          )}
        </div>
        <p>
          <em>{Plot}</em>
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
