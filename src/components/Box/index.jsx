// import { useState } from "react";
import PropTypes from "prop-types";

const Box = ({ children, extraClass = "" }) => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`box ${extraClass}`}>
      {/* <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button> */}
      {children}
    </div>
  );
};

Box.propTypes = { children: PropTypes.node, extraClass: PropTypes.string };

export default Box;
