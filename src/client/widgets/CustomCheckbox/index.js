import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';

import Text from 'Widgets/Text/index';

import './style.scss';

const CustomCheckbox = (props) => {
  const {
    control,
    name,
    primaryLabel,
    secondaryLabel,
    children,
    value,
    checked,
    validation = '',
    disabled = false,
    useReactHookForm = true,
    onChange,
    checkedValues,
    getValues,
  } = props;
  // const [checked, setChecked] = useState(false);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  console.log('checkedValues', checkedValues, checked);

  const otherProps = {
    ...(checked ||
      (checkedValues && {
        checked: checked || checkedValues.includes(value),
      })),
  };

  const handleCheck = (value) => {
    const selectedValues = getValues(name);
    const newValues = selectedValues?.includes(value)
      ? selectedValues?.filter((id) => id !== value)
      : [...(selectedValues || []), value];
    return newValues;
  };

  // console.log(
  //   { name: name },
  //   { control: control },
  //   { getValues: getValues },
  //   { value: value }
  // );
  // console.log('checkedValues', checkedValues.includes(value));

  return (
    <div className="CustomCheckbox d-flex align-items-center">
      {useReactHookForm ? (
        <Controller
          name={name}
          control={control}
          value={value}
          render={(props) => (
            <Checkbox
              onChange={() => props.onChange(handleCheck(value))}
              checked={props.value && props.value.includes(value)}
              disableRipple
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
            />
          )}
        />
      ) : (
        <Checkbox
          value={value}
          name={name}
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
          disableRipple
          onChange={() => onChange(value)}
          {...otherProps}
        />
      )}
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
