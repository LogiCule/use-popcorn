import PropTypes from "prop-types";
import Logo from "../Logo";

const Navbar = ({ children }) => {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-3 items-center h-auto md:h-[7.2rem] px-8 py-4 bg-primary text-primary-foreground shadow-md gap-4">
      <Logo />
      {children}
    </nav>
  );
};
Navbar.propTypes = { children: PropTypes.node };
export default Navbar;
