import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

export default function StarRating({ rating, setRating, readOnly = false }) {
  const [hoverValue, setHoverValue] = useState(undefined); // Track hover state
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    if (!readOnly) setRating(value);  // Only set rating if not read-only
  };

  const handleMouseOver = (value) => {
    if (!readOnly) setHoverValue(value);  // Set hover value
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(undefined);  // Reset hover state when mouse leaves
  };

  return (
    <div style={styles.starContainer}>
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size={24}
          onClick={() => handleClick(index + 1)}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
          color={(hoverValue || rating) > index ? colors.orange : colors.grey} // Hover value takes precedence over rating
          style={{
            marginRight: 10,
            cursor: readOnly ? "default" : "pointer"
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  starContainer: {
    display: "flex",
    flexDirection: "row"
  }
};
