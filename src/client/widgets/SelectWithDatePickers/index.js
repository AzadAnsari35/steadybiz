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
    defaultValues,
    useReactHookForm,
    onSelectChange,
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
        {useReactHookForm ?
          <MultiSelect
            className={`SelectWithDatePickers-container-select pl-20 pr-20
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
          /> :
          <MultiSelect
            className={`SelectWithDatePickers-container-select
            ${disabled ? 'input-disabled' : ''}`}
            style={{ width: `calc(${selectWidth} - 40px)` }}
            name={name?.select}
            options={data}
            placeholder={selectPlaceholder}
            // changeStyle={true}
            showBorder={false}
            initialValue={initialSelectedValue}
            showValue={showValue}
            disabled={disabled}
            isSearchable={isSearchable}
            defaultValue={defaultValues?.select}
            useReactHookForm={useReactHookForm}
            onSelectChange={onSelectChange}
          />
        }

        {useReactHookForm ?
          <DatePicker
            control={control}
            name={name?.datePicker1}
            className="SelectWithDatePickers-container-datePicker-1"
          /> :
          <DatePicker
            name={name?.datePicker1}
            className="SelectWithDatePickers-container-datePicker-1"
            useReactHookForm={useReactHookForm}
          />
        }

        {useReactHookForm ?
          <DatePicker
            control={control}
            name={name?.datePicker2}
            className="SelectWithDatePickers-container-datePicker-2"
          /> :
          <DatePicker
            name={name?.datePicker2}
            className="SelectWithDatePickers-container-datePicker-2"
            useReactHookForm={useReactHookForm}
          />
        }

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
