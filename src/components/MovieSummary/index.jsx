import PropTypes from "prop-types";

const MovieSummary = ({ watched }) => {
  if (watched === null || watched === undefined) return null;
  const average = (arr) => {
    if (arr === undefined) return 0;
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  };

  const avgImdbRating = average(
    watched?.map((movie) => movie.imdbRating)
  ).toFixed(2);

  const avgUserRating = average(
    watched?.map((movie) => movie.userRating)
  ).toFixed(2);

  const avgRuntime = average(
    watched
      ?.map((movie) => Number(movie.Runtime.split(" ")[0]))
      .filter((runtime) => !isNaN(runtime) && runtime > 0)
  ).toFixed(2);

  return (
    <div className="bg-primary/20 backdrop-blur-md border-b border-white/10 p-6 shadow-sm sticky top-0 z-10 text-primary-foreground">
      <h2 className="uppercase text-sm font-bold mb-4 tracking-wider">Movies you watched</h2>
      <div className="flex items-center justify-between text-base font-semibold">
        <p className="flex items-center gap-2">
          <span>#️⃣</span>
          <span>{watched.length || 0} movies</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

MovieSummary.propTypes = {
  watched: PropTypes.array,
};

export default MovieSummary;
