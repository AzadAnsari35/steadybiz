import React from "react";

import "./style.scss";

const Line = props => {
  const { adjustTop, vertical } = props;

  return (
    <div
      className="Line"
      style={{
        width: !!vertical ? "2px" : "0",
        marginTop: !!adjustTop ? "-4px" : "0",
      }}
    />
  )
};

export default Line;
