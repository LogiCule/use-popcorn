import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";

const Search = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
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
