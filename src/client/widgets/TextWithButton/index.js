import React from 'react';
import { Text, TextInput, Button } from 'Widgets';
import './style.scss';

const TextWithButton = (props) => {
  const {
    label,
    names,
    type = 'text',
    disabled,
    register = {},
    placeholders,
    validation,
    buttonText,
    errors = {},
    useReactHookForm = true,
    onChange,
  } = props;

  return (
    <div className={`TextWithButton `}>
      {!!label && (
        <Text
          className="TextWithButton-label font-primary-medium-16"
          text={label}
        />
      )}
      <div className={`TextWithButton-container`}>
        <div className="TextWithButton-container-input">
          <input
            className={`font-primary-semibold-16 ${
              disabled ? 'input-disabled' : ''
            } `}
            name={names}
            type={type}
            disabled={disabled}
            placeholder={placeholders}
            ref={useReactHookForm ? register(validation) : null}
            onChange={
              !useReactHookForm ? (e) => onChange(name, e.target.value) : null
            }
          />
          <Button
            text={buttonText}
            className="TextWithButton-container-button"
          />
        </div>

        {errors[name] && (
          <p className="error-message mt-6 font-primary-medium-16 mb-0">
            {errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextWithButton;
