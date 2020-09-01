import React from 'react';

import './style.scss';

const PrimaryTableHeader = (props) => {
  const { officeName, officeId, officeLevel, showServiceIcon = false } = props;
  return (
    <div className="PrimaryTableHeader ">
      <div className="PrimaryTableHeader-officeDetail d-flex justify-content-between align-items-center pb-28">
        <div className="font-primary-semibold-18">
          <span className="PrimaryTableHeader-officeDetail-officeName ">
            {officeName}{' '}
          </span>
          <span className="PrimaryTableHeader-officeDetail-officeDisplayId">
            [ {officeId} ]
          </span>
        </div>
        <div className="PrimaryTableHeader-officeDetail-level font-primary-semibold-16">
          [Level - {officeLevel}]
        </div>
      </div>
      {showServiceIcon && (
        <div className="PrimaryTableHeader-serviceIcon d-flex justify-content-center align-items-center position-relative mb-20">
          <div className="PrimaryTableHeader-serviceIcon__content d-flex justify-content-center align-items-center">
            {showServiceIcon.icon}
            <span className="font-primary-regular-14 ml-10">
              {showServiceIcon.text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimaryTableHeader;
