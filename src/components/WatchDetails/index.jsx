import PropTypes from "prop-types";

const WatchDetails = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
      </div>
    </li>
  );
};

WatchDetails.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbRating: PropTypes.string,
    userRating: PropTypes.number,
    Runtime: PropTypes,
  }),
};

export default WatchDetails;
