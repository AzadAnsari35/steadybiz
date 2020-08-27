import React from 'react';
import { DatePicker, MultiSelect, Text } from 'Widgets';

import './style.scss';

const SelectWithDatePickers = (props) => {
  const {
    name = { select: '', datePicker1: '', datePicker2: '' },
    data,
    label,
    selectPlaceholder = '',
    initialSelectedValue = '',
    disabled,
    errors,
    selectValidation,
    control,
    showValue,
    selectWidth = '33%',
    isSearchable = false,
  } = props;
  return (
    <div className="SelectWithDatePickers">
      {!!label && (
        <Text
          className="SelectWithTextInput-label font-primary-medium-16"
          text={label}
        />
      )}
      <div
        className="SelectWithDatePickers-container"
        style={{
          border: '1px solid #00000080',
          display: 'flex',
          borderRadius: 4,
        }}
      >
        <MultiSelect
          className={`SelectWithDatePickers-container-select  pl-20 pr-20
          ${disabled ? 'input-disabled' : ''}`}
          style={{ width: `calc(${selectWidth} - 40px)` }}
          name={name?.select}
          options={data}
          placeholder={selectPlaceholder}
          changeStyle={true}
          control={control}
          validation={selectValidation}
          showBorder={false}
          initialValue={initialSelectedValue}
          showValue={showValue}
          disabled={disabled}
          isSearchable
        />

        <DatePicker
          control={control}
          name={name?.datePicker1}
          className="SelectWithDatePickers-container-datePicker-1"
        />

        <DatePicker
          control={control}
          name={name?.datePicker1}
          className="SelectWithDatePickers-container-datePicker-2"
        />

        {/* {errors[name] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[name].message}
          </p>
        ) : errors[selectInputName] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[selectInputName].message}
          </p>
        ) : (
          ''
        )} */}
      </div>
    </div>
  );
};
export default SelectWithDatePickers;
