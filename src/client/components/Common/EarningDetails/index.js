import React from 'react';

import './style.scss';

const EarningDetails = () => {
  return (
    <div className="EarningDetails">
      <div className="font-primary-semibold-14 pb-12">EARNING</div>

      <div className="EarningDetails-earning">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Commission @ 2%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Incentive @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>GDS Discount</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Deal Discount @ 2%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Discount @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Markup @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Run Time Markup</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Total Earning</div>
          <div>77.16</div>
        </div>
      </div>

      <div className="font-primary-semibold-14 pb-12 pt-24">TAXES</div>
      <div className="EarningDetails-earning">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>VAT / GST Amount @ 5%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Net Amount to be Paid</div>
          <div>77.16</div>
        </div>
      </div>
    </div>
  );
};

export default EarningDetails;
