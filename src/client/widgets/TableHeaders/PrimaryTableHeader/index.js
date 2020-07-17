import React from 'react';

import './style.scss';

const PrimaryTableHeader = () => {
  return (
    <div className="PrimaryTableHeader d-flex justify-content-between align-items-center pb-28">
      <div className="font-primary-semibold-18">
        <span className="PrimaryTableHeader-officeName ">
          Hans Tours &amp; Travel
        </span>{' '}
        <span className="PrimaryTableHeader-officeDisplayId">[ UIDSBR02 ]</span>
      </div>
      <div className="PrimaryTableHeader-level font-primary-semibold-16">
        [Level - 0]
      </div>
    </div>
  );
};

export default PrimaryTableHeader;
