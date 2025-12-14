import PropTypes from "prop-types";

const EmptyMovieState = ({ message, type, onSearch }) => {
  const isWelcome = type === "welcome";
  
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center h-full text-muted-foreground animate-in fade-in duration-500">
      <span className="text-4xl mb-4">
        {isWelcome ? "🍿" : "🚫"}
      </span>
      <h3 className="text-lg font-medium mb-2 text-foreground">{message}</h3>
      {isWelcome && (
        <p className="text-sm flex flex-wrap justify-center gap-2 mt-2">
          Try searching for 
          <span className="bg-muted px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors font-semibold shadow-sm" onClick={() => onSearch("Interstellar")}>Interstellar</span>
          <span className="bg-muted px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors font-semibold shadow-sm" onClick={() => onSearch("Dune")}>Dune</span>
          <span className="bg-muted px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors font-semibold shadow-sm" onClick={() => onSearch("Oppenheimer")}>Oppenheimer</span>
        </p>
      )}
    </div>
  );
};

EmptyMovieState.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["welcome", "no-results"]),
  onSearch: PropTypes.func,
};

export default EmptyMovieState;
