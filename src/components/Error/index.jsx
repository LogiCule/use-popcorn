import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
};

Error.propTypes = { message: PropTypes.string };

export default Error;
