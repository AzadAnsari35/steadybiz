import React from 'react';

import './style.scss';

const PrimaryTableHeader = (props) => {
  const { officeName, officeId, officeLevel } = props;
  return (
    <div className="PrimaryTableHeader d-flex justify-content-between align-items-center pb-28">
      <div className="font-primary-semibold-18">
        <span className="PrimaryTableHeader-officeName ">{officeName} </span>
        <span className="PrimaryTableHeader-officeDisplayId">
          [ {officeId} ]
        </span>
      </div>
      <div className="PrimaryTableHeader-level font-primary-semibold-16">
        [Level - {officeLevel}]
      </div>
    </div>
  );
};

export default PrimaryTableHeader;
