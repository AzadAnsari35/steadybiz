import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import colors from "Constants/colors";

import { Text } from "Widgets";
import ArrowIcon from "Widgets/Icons/ArrowIcon";

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

const SelectField = (props) => {
  const {
    data,
    hasError = false,
    icon,
    id,
    initialSelectedValue = "",
    label,
    placeholder,
    limitDataCount = data.length,
    onChange,
  } = props;
  const classes = useStyles();
  const [value, setValue] = useState(initialSelectedValue);
  const [open, setOpen] = useState(false);

  const handleChange = (key, value) => {
    setValue(value);
    onChange(key, value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={`SelectField ${!!hasError ? "has-error" : ""}`}>
      {!!label && (
        <Text
          className="SelectField-label font-primary-medium-16"
          text={label}
        />
      )}
      <FormControl className={classes.formControl}>
        {!value && <InputLabel>{placeholder}</InputLabel>}
        <Select
          labelId="demo-controlled-open-select-label"
          id={id}
          open={open}
          value={value}
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
          onChange={(e) => handleChange(id, e.target.value)}
        >
          {data &&
            data.map(
              (item, index) =>
                !!limitDataCount &&
                index <= limitDataCount && (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
            )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
