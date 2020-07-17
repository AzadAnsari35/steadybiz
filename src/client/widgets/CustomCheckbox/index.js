import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';

import Text from "Widgets/Text/index";

import "./style.scss";

const renderCheckboxIcon = (checked) => (
  <div className={`CustomCheckbox-icon ${!!checked ? "checked d-flex justify-content-center align-items-center" : ""}`}>
    {checked && <CheckIcon className="CustomCheckbox-icon__checked" />}
  </div>
);

const CustomCheckbox = props => {
  const { control, name, primaryLabel, secondaryLabel, children } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Controller
      render={(props) => (
        <div className="CustomCheckbox d-flex align-items-center">
          <Checkbox
            checked={checked}
            icon={renderCheckboxIcon()}
            checkedIcon={renderCheckboxIcon(checked)}
            onChange={handleChange}
          />
          {!children ?
            <div className="CustomCheckbox-label d-flex justify-content-between">
              <Text className="font-primary-regular-14" text={primaryLabel} />
              {!!secondaryLabel && <Text className="font-primary-regular-14" text={secondaryLabel} />}
            </div>
            : children
          }
        </div>
      )}
      control={control}
      name={name}
    />
  )
};

export default CustomCheckbox;
