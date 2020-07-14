import React from "react";
import "./style.scss";

const CustomRadio = (props) => {
  const {
    id,
    label,
    name,
    errors,
    register,
    validation,
    disabled = false,
    subLabel = "",
    value,
  } = props;
  return (
    <div className="CustomRadio d-flex curson-pointer">
      <input
        name={name}
        className="CustomRadio-radio"
        id={id}
        type="radio"
        disabled={disabled}
        ref={register(validation)}
        value={value}
      />
      <label className="d-flex flex-direction-column pl-10" htmlFor={id}>
        <span className="font-primary-medium-16 pb-12">{label}</span>
        {subLabel && (
          <span className="font-primary-regular-14">{subLabel}</span>
        )}
      </label>
    </div>
  );
};

export default CustomRadio;
