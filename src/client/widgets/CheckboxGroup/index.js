import React, { useState } from 'react';
import CustomCheckbox from 'Widgets/CustomCheckbox';
import Checkbox from '@material-ui/core/Checkbox';
import { Controller } from 'react-hook-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxGroup = (props) => {
  const {
    label,
    checkboxes,
    name,
    disabled,
    checkedValues = [],
    getValues,
    control,
    useReactHookForm = true,
    handleChange,
    className,
    checkboxClassName,
  } = props;

  console.log('checkboxes', checkboxes);

  return (
    <div className={`CheckboxContainer ${className ? className : ''}`}>
      <div className="CheckboxContainer-label font-primary-medium-16 pb-20">
        {label}
      </div>

      <div className="d-flex justify-content-between flex-wrap-wrap">
        {checkboxes.map(
          (cur, index) =>
            useReactHookForm ? (
              <CustomCheckbox
                value={cur.value}
                primaryLabel={cur.primaryLabel}
                name={name}
                key={index}
                control={control}
                getValues={getValues}
                disabled={disabled}
                checkedValues={checkedValues}
                className={checkboxClassName}
              />
            ) : (
              <CustomCheckbox
                value={cur.value}
                primaryLabel={cur.primaryLabel}
                disabled={disabled}
                onChange={handleChange}
                useReactHookForm={false}
                name={name}
                className={checkboxClassName}
              />
            )

          // <FormControlLabel
          //   control={
          //     <Controller
          //       as={<Checkbox />}
          //       control={control}
          //       checked={checkedValues.includes(cur.value)}
          //       name={name}
          //       onChange={() => handleSelect(cur.value)}
          //     />
          //   }
          //   key={index}
          //   label={cur.value}
          // />
        )}
      </div>
    </div>
  );
};
export default CheckboxGroup;
