import React from "react";

interface Props {
  // Props if needed
}

const Arrow: React.FC<Props> = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_221_8)">
        <rect x="80" width="170" height="30" fill="black" />

        <rect
          x="220"
          y="170"
          width="170"
          height="30"
          transform="rotate(-90 220 170)"
          fill="black"
        />

        <rect
          x="0.182617"
          y="228.403"
          width="323.011"
          height="30"
          transform="rotate(-45 0.182617 228.403)"
          fill="black"
        />
      </g>

      <defs>
        <clipPath id="clip0_221_8">
          <rect width="250" height="250" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Arrow;
