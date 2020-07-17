import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CheckIcon from '@material-ui/icons/Check';
import { Controller } from 'react-hook-form';

import colors from 'Constants/colors';

import './style.scss';

const Option = (props, label) => (
  <components.Option {...props}>
    {props.isSelected && (
      <CheckIcon
        className="react-select__option-checked"
        style={{ color: colors.royalBlue }}
      />
    )}
    {props.data[label]}
  </components.Option>
);

const CaretDownIcon = () => {
  return <KeyboardArrowDownIcon style={{ color: colors.black }} />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

const MultiValue = (props, value) => {
  let labelToBeDisplayed = `${props.data[value]}`;
  return <span className="mr-4">{labelToBeDisplayed}</span>;
};

// useEffect(() => {
//   // Get the Value via AJAX and then set it

//   props.setValue([props.name], props.initialValue);
// }, [props]);

const MultiSelect = (props) => {
  const {
    label,
    closeMenuOnSelect = true,
    isMulti = false,
    labelKey = 'label',
    options,
    placeholder = 'Select',
    showValue = false,
    valueKey = 'value',
    width = '90',
    className,
    name,
    changeStyle,
    showBorder,
    control,
    errors = {},
    validation,
    disabled,
  } = props;
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  // };

  return (
    <>
      {!!label && (
        <p className="TextInput-label font-primary-medium-16 mb-8">{label}</p>
      )}
      <Controller
        render={(props) => (
          <div
            className={`MultiSelect ${className ? className : ''} ${
              changeStyle ? `MultiSelect-customStyle` : ''
            }  ${showBorder ? `MultiSelect-showBorder` : ''} ${
              errors[name] ? `thin-red-border` : ''
            } ${disabled ? 'input-disabled border-none py-10' : ''}`}
            style={{ width: `${width}px` }}
          >
            <Select
              className={`react-select-container`}
              classNamePrefix="react-select"
              clearable={true}
              closeMenuOnSelect={closeMenuOnSelect}
              components={{
                DropdownIndicator,
                Option: (props) => Option(props, labelKey),
                MultiValue: (props) => MultiValue(props, valueKey),
              }}
              hideSelectedOptions={false}
              isClearable={false}
              isMulti={isMulti}
              isSearchable={false}
              placeholder={placeholder}
              getOptionLabel={(option) =>
                `${showValue ? option[valueKey] : option[labelKey]}`
              }
              getOptionValue={(option) => option[valueKey]}
              options={options}
              isDisabled={disabled}
              // menuIsOpen={true}
              {...props}
            />
          </div>
        )}
        control={control}
        name={name}
        rules={validation}
      />
      {errors[name] && (
        <p className="error-message mt-6 font-primary-medium-16 mb-0">
          {errors[name].message}
        </p>
      )}
    </>
  );
};

export default MultiSelect;
