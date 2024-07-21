import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  setRating: PropTypes.func,
};

export default function StarRating({
  color = "#fcc419",
  size = 2.4,
  className = "",
  messages,
  maxRating = messages ? messages.length : 10,
  defaultRating = 0,
  setRating,
}) {
  const [hoverStars, setHoverStars] = useState(0);
  const [fixedStar, setfixedStar] = useState(defaultRating);

  const handleRating = (rating) => {
    setfixedStar(rating);
    if (setRating) setRating(rating);
  };

  const textStyle = {
    color: color,
    fontSize: `${size * 0.9}rem`,
    lineHeight: 1,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={hoverStars ? i + 1 <= hoverStars : i + 1 <= fixedStar}
            handleClick={() => handleRating(i + 1)}
            handleEnter={() => setHoverStars(i + 1)}
            handleLeave={() => setHoverStars(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {(hoverStars && (messages?.at(hoverStars - 1) || hoverStars)) ||
          (fixedStar && (messages?.at(fixedStar - 1) || fixedStar)) ||
          ""}
      </p>
    </div>
  );
}

function Star({ full, size, color, handleEnter, handleLeave, handleClick }) {
  const spanStyle = {
    width: `${size}rem`,
    height: `${size}rem`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={spanStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <svg
        className={`reviews__star reviews__star--${
          full ? "active" : "inactive"
        }`}
      >
        <use xlinkHref="/img/icons.svg#icon-star"></use>
      </svg>
    </span>
  );
}
