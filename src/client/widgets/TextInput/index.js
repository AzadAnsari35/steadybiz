import React from "react";

import "./style.scss";

const TextInput = (props) => {
  const {
    name,
    classes = { root: "", input: "" },
    type = "text",
    label,
    placeholder = "",
    disabled,
    errors,
    register,
    validation,
  } = props;
  console.log("root", classes.root);

  return (
    <div className={`TextInput ${classes.root ? classes.root : ""}`}>
      {!!label && (
        <p className="TextInput-label font-primary-medium-16 mb-8">{label}</p>
      )}
      <input
        name={name}
        className={`TextInput-input font-primary-semibold-16 ${
          errors[name] ? "thin-red-border" : ""
        }  `}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        ref={register(validation)}
      />
      {errors[name] && (
        <p className="error-message mt-6 font-primary-medium-16 mb-0">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
