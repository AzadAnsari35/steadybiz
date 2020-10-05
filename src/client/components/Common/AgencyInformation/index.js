/* eslint-disable react/prop-types */
import React from 'react';
import EarningDetails from '../EarningDetails';
import FareDetailsCard from '../FareDetailsCard';
import CustomerPaymentDetails from '../CustomerPaymentDetails';
import './style.scss';

const AgencyInformation = (props) => {
  const { outboundItinerary } = props;
  //console.log('outboundItinerary', outboundItinerary);

  // const { fareBasisCode } = outboundItinerary.totalfareDetails;

  return (
    <div className="AgencyInformation">
      <FareDetailsCard outboundItinerary={outboundItinerary} />
      <EarningDetails outboundItinerary={outboundItinerary} />
      <CustomerPaymentDetails outboundItinerary={outboundItinerary} />
    </div>
  );
};

export default AgencyInformation;
