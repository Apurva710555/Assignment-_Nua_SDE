// src/components/Shimmer.jsx
import React from "react";
import "./Shimmer.css";

/**
 * Shimmer loading skeleton for product grid.
 * Props:
 *  - count (number) : how many placeholder cards to render (default 8)
 */
const Shimmer = ({ count = 8 }) => {
  const boxes = Array.from({ length: count });

  return (
    <div
      className="shimmer-grid"
      role="status"
      aria-label="Loading products"
      aria-busy="true"
    >
      {boxes.map((_, i) => (
        <div className="shimmer-card" key={i}>
          <div className="shimmer-image" />
          <div className="shimmer-body">
            <div className="shimmer-line shimmer-line--title" />
            <div className="shimmer-line shimmer-line--title short" />
            <div className="shimmer-line shimmer-line--price" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
