import React from "react";

import "./style.scss";

const Button = (props) => {
  const {
    className,
    disabled = false,
    icon,
    isLinkType = false,
    secondary,
    text,
    type = "button",
    onClick,
  } = props;

  return (
    <button
      type={type}
      className={`btn${isLinkType ? "-link" : ""} ${isLinkType ? `btn-link__${!secondary
        ? "primary" : "secondary"}` : `btn-${!secondary ? "primary" : "secondary"}`} ${
        !!className ? className : ""
      } ${!!disabled ? "btn-disabled" : ""} d-flex justify-content-center align-items-center`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className={`btn-text ${!!icon ? "add-margin" : ""}`}>{text}</span>
      {!!icon && icon}
    </button>
  );
};

export default Button;
