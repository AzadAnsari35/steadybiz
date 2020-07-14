import React from "react";

import colors from "Constants/colors";

const ArrowIcon = ({ color = colors.doveGray, size = 24, orientation = 0 }) => {
  return (
    <>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 306 306"
        style={{ transform: `rotate(${orientation}deg)` }}
        xml="preserve"
      >
        <g>
          <g id="chevron-right">
            <polygon
              fill={color}
              points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </>
  );
};

export default ArrowIcon;
