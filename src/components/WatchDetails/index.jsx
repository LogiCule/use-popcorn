import PropTypes from "prop-types";

const WatchDetails = ({ movie, handleDelete }) => {
  return (
    <li className="grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 items-center p-4 border-b border-border hover:bg-muted transition-colors cursor-pointer text-sm relative">
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
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
        <button
          className="absolute right-6 bg-destructive text-destructive-foreground h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-destructive/90 transition-colors"
          onClick={() => handleDelete(movie.imdbID)}
        >
          X
        </button>
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
    Runtime: PropTypes.string,
    imdbID: PropTypes.string,
  }),
  handleDelete: PropTypes.func,
};

export default WatchDetails;
