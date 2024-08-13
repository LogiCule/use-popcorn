import PropTypes from "prop-types";
const MovieDetails = ({ movie, handleSelect }) => {
  return (
    <li onClick={handleSelect}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
  }),
  handleSelect: PropTypes.func,
};

export default MovieDetails;
