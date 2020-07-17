import React from "react";

import "./style.scss";

const IconWithBackground = props => {
  const { bgColor, children, className, showCursor, ...rest } = props;

  return (
    <div
      className={
        `IconWithBackground d-flex justify-content-center align-items-center ${
          !!showCursor 
          ? "cursor-pointer" : ""
        } ${!!className ? className : ""}`
      }
      style={{ backgroundColor: bgColor }}
      {...rest}
    >
      {children}
    </div>
  )
};

export default IconWithBackground;
