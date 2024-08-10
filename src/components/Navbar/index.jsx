import PropTypes from "prop-types";
import Logo from "../Logo";

const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};
Navbar.propTypes = { children: PropTypes.node };
export default Navbar;
