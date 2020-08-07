import React from 'react';

import colors from 'Constants/colors';

const ParentGroupIcon = ({ color = colors.black, size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
    >
      <g transform="translate(-157 -556)">
        <g class="a" transform="translate(157 556)">
          <rect class="c" width="26" height="26" rx="2" />
          <rect class="d" x="0.5" y="0.5" width="25" height="25" rx="1.5" />
        </g>
        <path
          class="b"
          fill={color}
          d="M17,16l-4-4V8.82a3,3,0,1,0-2,0V12L7,16H3v5H8V17.95l4-4.2,4,4.2V21h5V16Z"
          transform="translate(158 557)"
        />
      </g>
    </svg>
  );
};

export default ParentGroupIcon;
