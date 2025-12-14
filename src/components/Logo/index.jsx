import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <span role="img" className="text-3xl">🍿</span>
      <h1 className="text-2xl font-bold text-white tracking-tight">usePopcorn</h1>
    </Link>
  );
};

export default Logo;
