import React from "react";

import "./style.scss";

const Chip = props => {
  const { className, children, isBordered = false, style } = props;

  return (
    <div
      className={
        `Chip font-primary-regular d-flex justify-content-center ${!!isBordered ? "bordered" : ""} ${!!className ? className : ""}`
      }
      style={style}
    >
      {children}
    </div>
  )
};

export default Chip;
