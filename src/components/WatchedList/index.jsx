import PropTypes from "prop-types";
import WatchDetails from "../WatchDetails";

const WatchedList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchDetails key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

WatchedList.propTypes = {
  watched: PropTypes.array,
};

export default WatchedList;
