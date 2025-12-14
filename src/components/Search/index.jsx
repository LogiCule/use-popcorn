import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const Search = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      className="w-full md:w-[40rem] bg-black/40 text-primary-foreground placeholder:text-primary-foreground/50 transition-all focus-visible:ring-offset-2 focus-visible:ring-offset-primary border-none shadow-sm rounded-md"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

Search.propTypes = { query: PropTypes.string, setQuery: PropTypes.func };

export default Search;
