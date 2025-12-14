import PropTypes from "prop-types";
import { useState } from "react";

const MovieDetails = ({ movie, handleSelect }) => {
  const [imageError, setImageError] = useState(false);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <li
      className="grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 text-base items-center px-8 py-4 border-b border-border cursor-pointer hover:bg-white/5 transition-colors"
      onClick={handleSelect}
    >
      {!hasPoster || imageError ? (
        <div className="w-full row-span-full h-full min-h-[6rem] bg-white/5 rounded-md flex items-center justify-center text-2xl">
          🎥
        </div>
      ) : (
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className="w-full row-span-full h-auto rounded-md object-cover shadow-sm"
          onError={() => setImageError(true)}
        />
      )}
      <h3 className="text-lg font-medium row-start-1 col-start-2 text-primary-foreground leading-tight">
        {movie.Title}
      </h3>
      <div className="flex items-center gap-6 text-muted-foreground row-start-2 col-start-2 mt-1">
        <p className="flex items-center gap-2 text-sm">
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object,
  handleSelect: PropTypes.func,
};

export default MovieDetails;
