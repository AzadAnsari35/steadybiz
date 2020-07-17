import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import '../../styles/_variables.scss';
import RootRef from '@material-ui/core/RootRef';
import { Controller } from 'react-hook-form';
import MultiSelect from 'Widgets/MultiSelect';
import Select, { components } from 'react-select';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Text from 'Widgets/Text';

import './style.scss';

const TextWithTextInput = (props) => {
  const {
    names = { input1: '', input2: '' },
    classNames = { input1: '', input2: '' },
    icon,
    type = 'text',
    label,
    placeholders = { input1: '', input2: '' },
    disabled,
    onFocus,
    errors,
    register = () => {},
    validations = { input1: {}, input2: {} },
    control,
  } = props;

  return (
    <div className={`TextWithTextInput `}>
      {!!label && (
        <Text
          className="TextWithTextInput-label font-primary-medium-16"
          text={label}
        />
      )}
      <div className={`TextWithTextInput-container`}>
        <div className="TextWithTextInput-container-input1 input-">
          <input
            className={`font-primary-semibold-16 ${
              disabled ? 'input-disabled' : ''
            } `}
            name={names.input1}
            type={type}
            disabled={disabled}
            placeholder={placeholders.input1}
            ref={register(validations.input1)}
          />
        </div>

        <input
          name={names.input2}
          className={`TextWithTextInput-container-input2 font-primary-semibold-16 ${
            errors[names.input2] || errors[names.input1]
              ? 'thin-red-border'
              : ''
          } ${disabled ? 'input-disabled border-none' : ''} `}
          type={type}
          disabled={disabled}
          placeholder={placeholders.input2}
          ref={register(validations.input2)}
        />
        {errors[names.input1] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[names.input1].message}
          </p>
        ) : errors[names.input1] ? (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[names.input1].message}
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TextWithTextInput;
