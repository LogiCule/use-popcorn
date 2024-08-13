import PropTypes from "prop-types";

const SearchResults = ({ resultCount }) => {
  return (
    <p className="num-results">
      Found <strong>{resultCount}</strong> results
    </p>
  );
};

SearchResults.propTypes = { resultCount: PropTypes.number };

export default SearchResults;
