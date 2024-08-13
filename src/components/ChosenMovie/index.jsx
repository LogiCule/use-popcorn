import PropTypes from "prop-types";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import Loader from "../Loader";
import Error from "../Error";
import StarRating from "../StarRating";
import { useEffect } from "react";
// import { useState } from "react";

const ChosenMovie = ({ id, handleDeselect }) => {
  const { movieDetails, isError, isLoading } = useMovieDetails({
    id,
  });

  useEffect(() => {
    if (movieDetails?.Title) {
      document.title = movieDetails?.Title;
    }

    return () => (document.title = "usePopcorn");
  }, [movieDetails]);

  //   const [rating, setRating] = useState(0);

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
          <StarRating maxRating={10} size={24} />
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
};

export default ChosenMovie;
