import React from 'react';
import MultiSelect from 'Widgets/MultiSelect';
import Text from 'Widgets/Text';
import '../../styles/_variables.scss';
import './style.scss';

const SelectWithTextInput = (props) => {
  const {
    name,
    selectInputName,
    className,
    data,
    icon,
    type = 'text',
    label,
    placeholder = '',
    selectPlaceholder = '',
    initialSelectedValue = '',
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
    selectWidth = '30%',
    fullWidthDropdown = false,
    isSearchable,
  } = props;

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
          className={`SelectWithTextInput-container-select  ${
            disabled ? 'input-disabled' : ''
          }`}
          style={{ width: `calc(${selectWidth} - 40px)` }}
          name={selectInputName}
          options={data}
          placeholder={selectPlaceholder}
          changeStyle={true}
          control={control}
          validation={selectValidation}
          showBorder={false}
          initialValue={initialSelectedValue}
          showValue={showValue}
          disabled={disabled}
          fullWidthDropdown
          isSearchable
        />

        <input
          name={name}
          className={`SelectWithTextInput-container-input font-primary-semibold-16 ${
            errors[name] || errors[selectInputName] ? 'thin-red-border' : ''
          }  ${disabled ? 'input-disabled border-none' : ''}  `}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          ref={register(validation)}
          style={{ paddingLeft: selectWidth }}
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
          ''
        )}
      </div>
    </div>
  );
};

export default SelectWithTextInput;
