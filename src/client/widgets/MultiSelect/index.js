import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CheckIcon from '@material-ui/icons/Check';
import { Controller } from 'react-hook-form';

import colors from 'Constants/colors';

import Text from 'Widgets/Text/index';

import './style.scss';

const Option = (props, label, isUppercase) => (
  <components.Option {...props}>
    {props.isSelected && (
      <CheckIcon
        className="react-select__option-checked"
        style={{ color: colors.royalBlue }}
      />
    )}
    <Text
      className={`font-primary-medium-14 ${
        isUppercase ? 'text-uppercase' : ''
      }`}
      text={props.data[label]}
    />
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
    id = '',
    label,
    closeMenuOnSelect = true,
    isMulti = false,
    labelKey = 'label',
    isOptionUppercase = false,
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
    getValues = () => {},
    style = {},
    defaultValue = null,
    useReactHookForm = true,
    onSelectChange,
    fullWidthDropdown,
    isClearable = true,
    isSearchable = true,
    hideMultiValueSelection = false,
    value,
  } = props;
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (id, selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption, id);
  };

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  // useEffect(() => {
  //   let selectedOption = options.find(
  //     (option) => option.value === control.defaultValuesRef.current[name]
  //   );

  //   console.log('selectedOption', selectedOption);
  // }, []);

  // console.log('control', getValues(name));
  // console.log('control', control.defaultValuesRef.current[name]);

  // console.log('fullWidthDropdown', fullWidthDropdown);

  return (
    <>
      {!!label && (
        <p className="TextInput-label font-primary-medium-16 mb-8">{label}</p>
      )}
      {useReactHookForm ? (
        <>
          <Controller
            render={(props) => (
              <div
                className={`MultiSelect 
                ${className ? className : ''} 
                ${changeStyle ? `MultiSelect-customStyle` : ''}  
                ${showBorder ? `MultiSelect-showBorder` : ''} 
                ${fullWidthDropdown ? 'MultiSelect-fullWidthDropdown' : ''}
                ${errors[name] ? `thin-red-border` : ''} 
                ${isSearchable ? 'MultiSelect-isSearchable' : ''}
                ${
                  disabled
                    ? 'MultiSelect-disabled input-disabled border-none py-10'
                    : ''
                }`}
                style={{ width: `${width}px`, ...style }}
              >
                <Select
                  className={`react-select-container`}
                  classNamePrefix="react-select"
                  clearable={true}
                  closeMenuOnSelect={closeMenuOnSelect}
                  components={{
                    DropdownIndicator,
                    Option: (props) =>
                      Option(props, labelKey, isOptionUppercase),
                    MultiValue: (props) =>
                      showValue
                        ? MultiValue(props, valueKey)
                        : MultiValue(props, labelKey),
                  }}
                  hideSelectedOptions={false}
                  isClearable={isClearable}
                  isMulti={isMulti}
                  isSearchable={isSearchable}
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
      ) : (
        <div
          className={`MultiSelect 
          ${className ? className : ''} 
          ${changeStyle ? `MultiSelect-customStyle` : ''}  
          ${showBorder ? `MultiSelect-showBorder` : ''} 
          ${fullWidthDropdown ? 'MultiSelect-fullWidthDropdown' : ''}
          ${errors[name] ? `thin-red-border` : ''}
          ${isSearchable ? 'MultiSelect-isSearchable' : ''}
          ${
            disabled
              ? 'MultiSelect-disabled input-disabled border-none py-10'
              : ''
          }`}
          style={{ width: `${width}px`, ...style }}
        >
          <Select
            className={`react-select-container`}
            classNamePrefix="react-select"
            clearable={true}
            closeMenuOnSelect={closeMenuOnSelect}
            components={{
              DropdownIndicator,
              Option: (props) => Option(props, labelKey, isOptionUppercase),
              ...(!hideMultiValueSelection
                ? {
                    MultiValue: (props) => MultiValue(props, valueKey),
                  }
                : {
                    ValueContainer: ({ children, ...props }) => {
                      let [values, input] = children;
                      if (Array.isArray(values)) {
                        const plural = values.length === 1 ? '' : 's';
                        values = `${values.length} field${plural} selected`;
                      }
                      return (
                        <components.ValueContainer {...props}>
                          {values}
                          {input}
                        </components.ValueContainer>
                      );
                    },
                  }),
            }}
            hideSelectedOptions={false}
            isClearable={isClearable}
            isMulti={isMulti}
            isSearchable={isSearchable}
            placeholder={placeholder}
            getOptionLabel={(option) =>
              `${showValue ? option[valueKey] : option[labelKey]}`
            }
            getOptionValue={(option) => option[valueKey]}
            options={options}
            isDisabled={disabled}
            // menuIsOpen={true}
            value={selectedOption}
            onChange={(value) => handleChange(id, value)}
            // {...props}
          />
        </div>
      )}
      
    </>
  );
};

export default MultiSelect;
