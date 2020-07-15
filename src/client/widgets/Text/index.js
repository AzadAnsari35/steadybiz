import React from "react";

import "./style.scss";

const Text = (props) => {
  const { className, showLeftBorder, style, text } = props;

  return (
    <div
      className={`Text ${!!className ? className : ""} ${
        !!showLeftBorder ? "thick-left-blue-border pl-6 text-blue" : ""
      }`}
      style={style}
    >
      {text}
    </div>
  );
};

export default Text;
