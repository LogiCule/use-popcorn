import PropTypes from "prop-types";

const Search = ({ query, setQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

Search.propTypes = { query: PropTypes.string, setQuery: PropTypes.func };

export default Search;
