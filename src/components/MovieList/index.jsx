import PropTypes from "prop-types";
import MovieDetails from "../MovieDetails";

const MovieList = ({ movies, handleSelect }) => {
  return (
    <ul className="divide-y divide-border">
      {movies?.map((movie) => (
        <MovieDetails
          key={movie.imdbID}
          movie={movie}
          handleSelect={() => handleSelect(movie)}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = { movies: PropTypes.array, handleSelect: PropTypes.func };

export default MovieList;
