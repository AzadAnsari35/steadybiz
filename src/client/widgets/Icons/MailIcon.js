import React from "react";
import PropTypes from "prop-types";

import colors from "Constants/colors";

const MailIcon = ({ color, size }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32.748 24.945"
      >
        <g transform="translate(1.645)">
          <path
            d="M53.946,61H26.954a2.845,2.845,0,0,0-1.233.288L40.386,75.953l3.287-3.159h0L55.179,61.289A2.845,2.845,0,0,0,53.946,61Z"
            transform="translate(-25.721 -61)"
            fill={color}
          />
        </g>
        <g transform="translate(21.632 1.646)">
          <path
            d="M349.041,86.728,338.213,97.555l10.827,10.827a2.844,2.844,0,0,0,.288-1.233V87.961A2.844,2.844,0,0,0,349.041,86.728Z"
            transform="translate(-338.213 -86.728)"
            fill={color}
          />
        </g>
        <g transform="translate(0 1.645)">
          <path
            d="M.288,86.721A2.845,2.845,0,0,0,0,87.954v19.188a2.845,2.845,0,0,0,.288,1.233L11.116,97.548Z"
            transform="translate(0 -86.721)"
            fill={color}
          />
        </g>
        <g transform="translate(1.645 13.829)">
          <path
            d="M44.345,277.211l-3.287,3.159a.959.959,0,0,1-1.357,0l-3.159-3.159L25.714,288.038a2.845,2.845,0,0,0,1.234.289H53.939a2.845,2.845,0,0,0,1.233-.288Z"
            transform="translate(-25.714 -277.211)"
            fill={color}
          />
        </g>
      </svg>
    </>
  );
};

MailIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

MailIcon.defaultProps = {
  color: colors.doveGray,
  size: 32,
};

export default MailIcon;
