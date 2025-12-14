import PropTypes from "prop-types";
import WatchDetails from "../WatchDetails";

const WatchedList = ({ watched, handleDelete }) => {
  return (
    <ul className="divide-y divide-border">
      {watched?.map((movie) => (
        <WatchDetails
          key={movie.imdbID}
          movie={movie}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

WatchedList.propTypes = {
  watched: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default WatchedList;
