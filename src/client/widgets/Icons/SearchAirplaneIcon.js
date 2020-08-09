import React from "react";
import PropTypes from "prop-types";

import colors from "Constants/colors";

const SearchAirplaneIcon = ({ color, size, orientation }) => {
  return (
    <svg
      version="1.1"
      width={size}
      height={size}
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 426.667 426.667"
      style={{ transform: `rotate(${orientation}deg)` }}
      xml="preserve"
    >
      <g>
        <g>
          <path
            fill={color}
            d="M416,298.667V256L245.333,149.333V32c0-17.707-14.293-32-32-32s-32,14.293-32,32v117.333L10.667,256v42.667
			l170.667-53.333v117.333l-42.667,32v32l74.667-21.333L288,426.667v-32l-42.667-32V245.333L416,298.667z"
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
  );
};

SearchAirplaneIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  orientation: PropTypes.number
};

SearchAirplaneIcon.defaultProps = {
  color: colors.doveGray,
  size: 32,
  orientation: 90
};

export default SearchAirplaneIcon;
