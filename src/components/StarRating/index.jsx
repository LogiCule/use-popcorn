import PropTypes from "prop-types";
import Star from "../Star";
import { useState } from "react";

const containerStyle = { display: "flex", alignItems: "center", gap: "1rem" };
const starContainerStyle = { display: "flex" };

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = null,
  defaultRating = 0,
  onSetRating = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(null);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  let message = "";

  if (messages?.length === maxRating) {
    if (tempRating) message = messages[tempRating - 1];
    else if (rating) message = messages[rating - 1];
    else message = "";
  } else {
    if (tempRating) message = tempRating;
    else if (rating) message = rating;
    else message = "";
  }

  const stars = Array.from({ length: maxRating }, (_, i) => (
    <Star
      color={color}
      outline={color}
      size={size}
      key={i + 1}
      onRate={() => {
        handleRate(i + 1);
        onSetRating(i + 1);
      }}
      isFull={tempRating ? i < tempRating : i < rating}
      handleTemp={() => setTempRating(i + 1)}
      handleReset={() => setTempRating(null)}
    />
  ));

  function handleRate(newRating) {
    setRating(newRating);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>{stars}</div>
      <p style={textStyle}>{message}</p>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array || null,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default StarRating;
