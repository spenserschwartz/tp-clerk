import React from "react";

const BubbleBackground = () => {
  return (
    <div
      className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
      aria-hidden="true"
    >
      <svg
        width="1360"
        height="578"
        viewBox="0 0 1360 578"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="custom-illustration"
          >
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#EAEAEA" offset="77.402%" />
            <stop stopColor="#DFDFDF" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="url(#custom-illustration)" fillRule="evenodd">
          <circle cx="1080" cy="200" r="100" />
          <circle cx="280" cy="378" r="50" />
          <circle cx="600" cy="100" r="30" />
        </g>
      </svg>
    </div>
  );
};

export default BubbleBackground;
