import PropTypes from "prop-types";

const SearchResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

SearchResults.propTypes = { movies: PropTypes.array };

export default SearchResults;
