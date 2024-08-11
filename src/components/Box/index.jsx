// import { useState } from "react";
import PropTypes from "prop-types";

const Box = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      {/* <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button> */}
      {children}
    </div>
  );
};

Box.propTypes = { children: PropTypes.node };

export default Box;
