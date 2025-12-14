import PropTypes from "prop-types";
import Logo from "../Logo";

const Navbar = ({ children }) => {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-3 items-center h-auto md:h-[7.2rem] px-8 py-4 bg-primary/20 backdrop-blur-md border-b border-white/10 text-primary-foreground shadow-sm gap-4">
      <Logo />
      {children}
    </nav>
  );
};
Navbar.propTypes = { children: PropTypes.node };
export default Navbar;
