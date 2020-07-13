import React, { useState } from "react";
import Select, { components } from "react-select";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CheckIcon from "@material-ui/icons/Check";

import colors from "Constants/colors";

import "./style.scss";

const Option = (props, label) => (
  <components.Option {...props}>
    {props.isSelected && <CheckIcon className="react-select__option-checked" style={{ color: colors.royalBlue }} />}
    {props.data[label]}
  </components.Option>
);

const CaretDownIcon = () => {
  return <KeyboardArrowDownIcon style={{ color: colors.black }} />;
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

const MultiValue = (props, value) => {
  let labelToBeDisplayed = `${props.data[value]}`;
  return (
    <span className="mr-4">{labelToBeDisplayed}</span>
  );
};
 
const MultiSelect = props => {
  const {
    closeMenuOnSelect = true,
    isMulti = false,
    labelKey = "label",
    options,
    placeholder = "Select",
    showValue = false,
    valueKey = "value",
    width = "90",
  } = props;
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };
 
  return (
    <div className="MultiSelect" style={{ width: `${width}px` }}>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        clearable={true}
        closeMenuOnSelect={closeMenuOnSelect}
        components={
          {
            DropdownIndicator,
            Option: props => Option(props, labelKey),
            MultiValue: props => MultiValue(props, valueKey),
          }
        }
        hideSelectedOptions={false}
        isClearable={false}
        isMulti={isMulti}
        isSearchable={false}
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        getOptionLabel ={option => `${showValue ? option[valueKey] : option[labelKey]}`}
        getOptionValue ={option => option[valueKey]}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiSelect;
