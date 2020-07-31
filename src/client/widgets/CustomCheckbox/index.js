import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';

import Text from 'Widgets/Text/index';

import './style.scss';

const renderCheckboxIcon = (checked) => (
  <div
    className={`CustomCheckbox-icon ${
      !!checked
        ? 'checked d-flex justify-content-center align-items-center'
        : ''
    }`}
  >
    {checked && <CheckIcon className="CustomCheckbox-icon__checked" />}
  </div>
);

const CustomCheckbox = (props) => {
  const {
    control,
    name,
    primaryLabel,
    secondaryLabel,
    children,
    value,
    checked,
    register,
    validation = '',
    disabled = false,
    useReactHookForm = true,
    onChange,
  } = props;
  // const [checked, setChecked] = useState(false);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <div className="CustomCheckbox d-flex align-items-center">
      <Checkbox
        value={value}
        name={name}
        inputRef={register}
        disabled={disabled}
        icon={
          <div
            className={`CustomCheckbox-icon ${
              disabled ? 'CustomCheckbox-disabled' : ''
            }`}
          ></div>
        }
        checkedIcon={
          <CheckIcon
            classes={{
              root: `CustomCheckbox-checkedIcon ${
                disabled ? 'CustomCheckbox-disabled' : ''
              }`,
            }}
          />
        }
        onChange={!useReactHookForm ? () => onChange(value) : null}
      />
      {!children ? (
        <div className="CustomCheckbox-label d-flex justify-content-between">
          <Text className="font-primary-regular-14" text={primaryLabel} />
          {!!secondaryLabel && (
            <Text className="font-primary-regular-14" text={secondaryLabel} />
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default CustomCheckbox;
