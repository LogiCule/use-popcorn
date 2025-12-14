import PropTypes from "prop-types";
const MovieDetails = ({ movie, handleSelect }) => {
  return (
    <li onClick={handleSelect} className="grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 items-center p-4 border-b border-border hover:bg-muted transition-colors cursor-pointer text-sm">
      {movie.Poster === "N/A" ? (
        <div className="bg-muted flex items-center justify-center h-16 w-full rounded row-span-full">
          <span className="text-xl">🎥</span>
        </div>
      ) : (
        <img src={movie.Poster} alt={`${movie.Title} poster`} className="w-full row-span-full rounded object-cover" />
      )}
      <h3 className="text-lg font-medium">{movie.Title}</h3>
      <div className="flex items-center gap-6">
        <p className="flex items-center gap-2">
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
