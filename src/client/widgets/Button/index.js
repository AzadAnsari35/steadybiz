import React from "react";

import "./style.scss";

const Button = (props) => {
  const {
    className,
    disabled = false,
    secondary,
    text,
    onClick,
    type = "submit",
  } = props;

  return (
    <button
      type="button"
      className={`btn btn-${!secondary ? "primary" : "secondary"} ${
        !!className ? className : ""
      } ${!!disabled ? "btn-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
