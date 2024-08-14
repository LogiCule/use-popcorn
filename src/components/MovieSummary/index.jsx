import PropTypes from "prop-types";

const MovieSummary = ({ watched }) => {
  const average = (arr) => {
    console.log("average : ", arr);
    if (!arr) return 0;
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  };

  const avgImdbRating = average(
    watched?.map((movie) => movie.imdbRating)
  ).toFixed(2);

  const avgUserRating = average(
    watched?.map((movie) => movie.userRating)
  ).toFixed(2);

  const avgRuntime = average(
    watched?.map((movie) => Number(movie.Runtime.split(" ")[0]))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length || 0} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
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
