import PropTypes from "prop-types";
import MovieDetails from "../MovieDetails";

const MovieList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieDetails key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

MovieList.propTypes = { movies: PropTypes.array };

export default MovieList;
