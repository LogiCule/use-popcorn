import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const Search = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="relative w-full md:w-[40rem]">
      <Input
        ref={inputRef}
        className="w-full bg-black/40 text-primary-foreground placeholder:text-primary-foreground/50 transition-all focus-visible:ring-offset-2 focus-visible:ring-offset-primary border-none shadow-sm rounded-md pr-10"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
            inputRef.current.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Search.propTypes = { query: PropTypes.string, setQuery: PropTypes.func };

export default Search;
