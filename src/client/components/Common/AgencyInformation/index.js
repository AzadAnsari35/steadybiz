/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import EarningDetails from '../EarningDetails';
import FareDetailsCard from '../FareDetailsCard';
import CustomerPaymentDetails from '../CustomerPaymentDetails';
import './style.scss';

const AgencyInformation = (props) => {
  const { outboundItinerary } = props;
  //console.log('outboundItinerary', outboundItinerary);
  const location = useLocation();

  const path = location.pathname.toUpperCase();
  const isBooking = path.includes('BOOKING');
  // const { fareBasisCode } = outboundItinerary.totalfareDetails;

  return (
    <div className="AgencyInformation">
      <FareDetailsCard outboundItinerary={outboundItinerary} />
      <EarningDetails
        outboundItinerary={outboundItinerary}
        isBooking={isBooking}
      />
      <CustomerPaymentDetails
        outboundItinerary={outboundItinerary}
        isBooking={isBooking}
      />
    </div>
  );
};

export default AgencyInformation;
