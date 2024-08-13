import PropTypes from "prop-types";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import Loader from "../Loader";
import Error from "../Error";

const ChosenMovie = ({ id, handleDeselect }) => {
  const { movieDetails, isError, isLoading } = useMovieDetails({
    id,
  });
  console.log(movieDetails);
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
