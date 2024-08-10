import Logo from "../Logo";
import Search from "../Search";
import SearchResults from "../SearchResults";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <SearchResults />
    </nav>
  );
};

export default Navbar;
