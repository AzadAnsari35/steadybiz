import React, { useState, useEffect } from 'react';

import './style.scss';

const TextInput = (props) => {
  const {
    id,
    name,
    classes = { root: '', input: '' },
    type = 'text',
    maxLength = 500,
    label,
    placeholder = '',
    disabled,
    errors = {},
    register = {},
    validation,
    useReactHookForm = true,
    onChange,
    value = '',
    ...rest
  } = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <div className={`TextInput ${classes.root ? classes.root : ''} `}>
      {!!label && (
        <p className="TextInput-label font-primary-medium-16 mb-8">{label}</p>
      )}
      <input
        name={name}
        id={id}
        maxLength={maxLength}
        className={`TextInput-input font-primary-semibold-16 ${
          errors[name] ? 'thin-red-border' : ''
        } ${disabled ? 'input-disabled border-none py-10' : ''}  `}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        ref={useReactHookForm ? register(validation) : null}
        {...(value ? { value: useReactHookForm ? inputValue : value } : {})}
        onChange={
          !useReactHookForm ? (e) => onChange(id, e.target.value) : null
        }
        autoComplete="off"
        {...rest}
      />
      {errors[name] && (
        <p className="error-message mt-6 font-primary-medium-16 mb-0">
          {errors[name].message}
        </p>
      )}

      
    </div>
  );
};

export default TextInput;
