import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "../../styles/_variables.scss";
import RootRef from "@material-ui/core/RootRef";
import { Controller } from "react-hook-form";
import MultiSelect from "Widgets/MultiSelect";
import Select, { components } from "react-select";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Text from "Widgets/Text";

import "./style.scss";

const SelectWithTextInput = (props) => {
  const {
    name,
    selectInputName,
    className,
    data,
    icon,
    type = "text",
    label,
    placeholder = "",
    selectPlaceholder = "",
    initialSelectedValue = "",
    value,
    disabled,
    onFocus,
    onChange,
    errors,
    register,
    validation,
    selectValidation,
    control,
    showValue,
  } = props;
  const [selectedOption, setSelectedOption] = useState(initialSelectedValue);
  const [open, setOpen] = useState(false);

  const handleFocus = (key) => {
    onFocus(key);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="SelectWithTextInput">
      {!!label && (
        <Text
          className="SelectWithTextInput-label font-primary-medium-16"
          text={label}
        />
      )}
      <div className="SelectWithTextInput-container">
        <MultiSelect
          className="SelectWithTextInput-container-select"
          name={selectInputName}
          options={data}
          placeholder={selectPlaceholder}
          changeStyle={true}
          control={control}
          validation={selectValidation}
          showBorder={false}
          initialValue={initialSelectedValue}
          showValue={showValue}
        />

        <input
          name={name}
          className={`SelectWithTextInput-container-input font-primary-semibold-16 ${
            errors[name] || errors[selectInputName] ? "thin-red-border" : ""
          }  `}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          ref={register(validation)}
        />
        {errors[name] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[name].message}
          </p>
        ) : errors[selectInputName] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[selectInputName].message}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectWithTextInput;
