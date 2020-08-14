import React, { useState } from 'react';
import CustomCheckbox from 'Widgets/CustomCheckbox';
import Checkbox from '@material-ui/core/Checkbox';
import { Controller } from 'react-hook-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxGroup = (props) => {
  const { label, checkboxes, name, register, disabled, checkedValues } = props;

  return (
    <div className="CheckboxContainer">
      <div className="CheckboxContainer-label font-primary-medium-16 pb-20">
        {label}
      </div>

      <div className="d-flex justify-content-between">
        {checkboxes.map((cur, index) => (
          <CustomCheckbox
            value={cur.value}
            primaryLabel={cur.primaryLabel}
            name={name}
            key={index}
            register={register}
            disabled={disabled}
            checkedValues={checkedValues}
          />

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
        ))}
      </div>
    </div>
  );
};
export default CheckboxGroup;
