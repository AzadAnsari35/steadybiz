import React from "react";
import "./style.scss";

const BoxRadio = (props) => {
  const { label, handleClick, name, value, checked, className } = props;
  return (
    <label
      className={`BoxRadio-label font-primary-medium-20 ${
        checked ? "BoxRadio-selected" : ""
      } ${className ? className : ""}`}
      onClick={handleClick}
    >
      {label}
      <input
        type="radio"
        className="BoxRadio-default-radio"
        name={name}
        value={value}
        defaultChecked={checked}
      />
    </label>
  );
};

export default BoxRadio;
