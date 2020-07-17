import React from "react";

import "./style.scss";

const Text = (props) => {
  const { className, showLeftBorder, style, text, ...rest } = props;

  return (
    <div
      className={`Text ${!!className ? className : ""} ${
        !!showLeftBorder ? "thick-left-blue-border pl-6 text-blue" : ""
      }`}
      style={style}
      {...rest}
    >
      {text}
    </div>
  );
};

export default Text;
