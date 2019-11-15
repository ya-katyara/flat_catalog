import React from "react";

const SvgClose = props => (
  <svg width={20} height={20} {...props}>
    <path
      d="M2 18L18 2m0 16L2 2"
      stroke="#222"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    />
  </svg>
);

export default SvgClose;
