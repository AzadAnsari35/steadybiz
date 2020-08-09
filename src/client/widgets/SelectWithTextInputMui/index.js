import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import colors from "Constants/colors";
import ArrowIcon from "Widgets/Icons/ArrowIcon";

import { Text } from "Widgets";

import "./style.scss";

const useStyles = makeStyles(() => ({
  select: {
    maxHeight: "150px",
    overflow: "scroll",
    overflowX: "hidden",
    "& li": {
      fontSize: "16px",
      fontFamily: "Montserrat Medium",
      "&:hover": {
        backgroundColor: colors.mystic,
        color: colors.biscay,
        fontFamily: "Montserrat SemiBold",
      },
      "&.Mui-selected": {
        backgroundColor: colors.mystic,
        color: colors.biscay,
        fontFamily: "Montserrat SemiBold",
      },
    },
  },
}));

const SelectWithTextInput = (props) => {
  const {
    id,
    className,
    data,
    icon,
    type = "text",
    label,
    placeholder = "",
    selectInputId,
    selectPlaceholder = "",
    initialSelectedValue = "",
    value,
    disabled,
    hasError = false,
    onFocus,
    onChange,
  } = props;
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(initialSelectedValue);
  const [open, setOpen] = useState(false);

  const handleFocus = (key) => {
    onFocus(key);
  };

  const handleChange = (key, value) => {
    setSelectedOption(value);
    onChange(key, value);
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
      <div>
        <FormControl>
          {!selectedOption && (
            <InputLabel id="demo-controlled-open-select-label">
              {selectPlaceholder}
            </InputLabel>
          )}
          <Select
            id={selectInputId}
            open={open}
            value={selectedOption}
            IconComponent={() => (
              <div
                className="cursor-pointer d-flex justify-content-center align-items-center"
                onClick={handleOpen}
              >
                {!icon ? (
                  <ArrowIcon
                    size={12}
                    color={colors.black5}
                    orientation={90}
                  />
                ) : (
                  icon
                )}
              </div>
            )}
            MenuProps={{ classes: { paper: classes.select } }}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={(e) => handleChange(selectInputId, e.target.value)}
          >
            {data.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          id={id}
          className={`SelectWithTextInput-input font-primary-semibold-16 ${
            hasError ? "thin-red-border" : ""
          } ${!!className ? className : ""} ${
            !!disabled ? "input-disabled" : ""
          }`}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onFocus={() => (!!onFocus ? handleFocus(id) : () => {})}
          onChange={(e) => onChange(id, e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectWithTextInput;
