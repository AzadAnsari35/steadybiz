import React from "react";

import colors from "Constants/colors";

import "./style.scss";

const Dot = props => {
  const { big, solid } = props;

  return (
    <div
      className="Dot"
      style={{
        width: !!big ? "12px" : "6px",
        height: !!big ? "12px" : "6px",
        backgroundColor: !!solid ? colors.gray : colors.white,
      }}
    />
  )
};

export default Dot;
