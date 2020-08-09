import React from "react";

import Text from "../Text";

import './style.scss';

const TextInput = (props) => {
  const {
    id,
    className,
    type = "text",
    label,
    placeholder = "",
    value,
    disabled,
    hasError = false,
    onFocus,
    onChange
  } = props;

  return (
    <div className="TextInput">
      {!!label && <Text className="TextInput-label font-primary-medium-16" text={label} />}
      <input
        id={id}
        className={
          `TextInput-input font-primary-semibold-16 ${hasError ? 'thin-red-border' : ''} ${!!className ? className: ''} ${!!disabled ? "input-disabled" : ""}`
        }
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onFocus={() => !!onFocus ? onFocus(id) : () => {}}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  )
};

export default TextInput;