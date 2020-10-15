import React from 'react';

import { Button, Image } from 'Widgets';

import './style.scss';

const Alert = (props) => {
  const {
    danger,
    className,
    alertTitle,
    alertMessage,
    showSecondaryAction,
    secondaryActionText,
    showPrimaryAction,
    primaryActionText,
    onCancelClick,
    onConfirmClick,
  } = props;

  return (
    <div
      className={`alert  ${danger ? 'danger' : 'success'} ${
        className ? className : ''
      }`}
    >
      <div className="alert-content">
        <div className="d-flex">
      <div className={`alert-border ${danger ? 'danger' : 'success'}`} />

        <div className="alert-content__text d-flex">
          <div
            className={`icon ${
              danger ? 'danger' : 'success'
            } d-flex justify-content-center align-items-center`}
          >
            {/* <img alt="info red" src={!!danger ? infoRed : infoGreen} /> */}
            <Image
              altText="info red"
              imgName="info-red.svg"
              imgName={`info-${danger ? 'red' : 'green'}.svg`}
            />
          </div>
          <div className={`alert-text ${danger ? 'danger' : 'success'}`}>
            <div className="alert-text__title">{alertTitle}</div>
            <div className="alert-text__message">{alertMessage}</div>
          </div>
        </div>
        </div>
        <div className="alert-content__action d-flex justify-content-end">
          {!!showSecondaryAction && (
            <Button
              className={`${showPrimaryAction ? 'mr-14' : ''}`}
              text={secondaryActionText}
              secondary
              onClick={onCancelClick}
            />
          )}
          {!!showPrimaryAction && (
            <Button text={primaryActionText} onClick={onConfirmClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
