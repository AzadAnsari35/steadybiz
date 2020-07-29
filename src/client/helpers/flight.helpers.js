import { cabinClasses } from "Constants/flight.constant";
import { getPassengerTypeName, calculateTotalDuration } from "Helpers/global";

export const getCabinClassName = (code) => {
  return cabinClasses.map(
    (cabinclass) => cabinclass.CODE === code && cabinclass.NAME
  );
};

export const getFlightSegmentType = flightItinerary => {
  return flightItinerary[0].flightSegmentType;
};

export const checkIsFareRefundable = itinerary => {
  return itinerary && itinerary.totalfareDetails && itinerary.totalfareDetails.fareRefundable;
};

export const getTotalItineraryFareAndCurrency = itinerary => {
  let currency = "AED", totalAmount = 0;
  if (itinerary && itinerary.totalfareDetails) {
    if (!!itinerary.totalfareDetails.totalAmountCurrency) {
      currency = itinerary.totalfareDetails.totalAmountCurrency;
    }
    if (!!itinerary.totalfareDetails.totalAmount) {
      totalAmount = itinerary.totalfareDetails.totalAmount;
    }
  }
  return { currency, totalAmount };
};

export const getFlightSegmentByType = (itinerary, segmentType) => {
  const flightSegment = itinerary && itinerary.flightSegments.find(item => item.flightSegmentDirection === segmentType);
  return flightSegment;
};

export const getAirlineDetails = flightSegment => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (flightSegment && flightSegment.flightSegmentGroup && flightSegment.flightSegmentGroup.length > 0) {
    return flightSegment.flightSegmentGroup[0].airlineDetails;
  }
}

export const getDepartureSegmentDetails = flightSegment => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (flightSegment && flightSegment.flightSegmentGroup && flightSegment.flightSegmentGroup.length > 0) {
    return flightSegment.flightSegmentGroup[0].departureDetails;
  }
}

export const getArrivalSegmentDetails = flightSegment => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (flightSegment && flightSegment.flightSegmentGroup && flightSegment.flightSegmentGroup.length > 0) {
    return flightSegment.flightSegmentGroup[flightSegment.flightSegmentGroup.length - 1].arrivalDetails;
  }
}

export const getTotalFlightDuration = flightSegment => {
  const durationsArr = [];
  flightSegment.flightSegmentGroup.map((segmentGroup, index) => {
    if (index < flightSegment.flightSegmentGroup.length - 1) {
      durationsArr.push(segmentGroup.arrivalDetails.flightDuration, segmentGroup.arrivalDetails.layOverTime);
    } else {
      durationsArr.push(segmentGroup.arrivalDetails.flightDuration);
    }
  });

  return calculateTotalDuration(durationsArr);
}

export const getTotalPassengersCount = outboundItinerary => {
  if (outboundItinerary && outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails && outboundItinerary.totalfareDetails.fareDetails.length > 0) {
    return outboundItinerary.totalfareDetails.fareDetails.reduce((a, b) => a + (b['count'] || 0), 0);
  }
}

export const getBaseFareDetails = outboundItinerary => {
  let baseFareTotal = 0;
  const baseFareBreakup = [];
  if (outboundItinerary && outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails && outboundItinerary.totalfareDetails.fareDetails.length > 0) {
    baseFareTotal = outboundItinerary.totalfareDetails.baseFareTotal && outboundItinerary.totalfareDetails.baseFareTotal;
    outboundItinerary.totalfareDetails.fareDetails.map(passengerFareDetail => {
      baseFareBreakup.push({
        passengerType: getPassengerTypeName(passengerFareDetail.ptc),
        passengerCount: passengerFareDetail.count,
        passengerBaseFare: passengerFareDetail.count * passengerFareDetail.baseFare
      });
    });
  }
  return {
    baseFareTotal,
    baseFareBreakup
  };
}

const calculateAirlineFuelSurcharge = (taxDetails, index) => {
  const filteredTaxDetails = taxDetails.filter(taxItem =>
    taxItem.taxcode.startsWith("YQ") || taxItem.taxcode.startsWith("YR")
  );
  return filteredTaxDetails.reduce((a, b) => a + (b['taxAmount'] || 0), 0);
}

const calculateAirlineMiscellaneousFee = (taxDetails) => {
  const filteredTaxDetails = taxDetails.filter(taxItem =>
    !(taxItem.taxcode.startsWith("YQ") || taxItem.taxcode.startsWith("YR"))
  );
  return filteredTaxDetails.reduce((a, b) => a + (b['taxAmount'] || 0), 0);
}

export const getTaxesAndFeesDetails = outboundItinerary => {
  let taxTotal = 0;
  let airlineFuelSurcharge = 0;
  let airlineMiscellaneousFee = 0;
  const totalfareDetails = outboundItinerary.totalfareDetails && outboundItinerary.totalfareDetails;
  const fareDetails = !!totalfareDetails && totalfareDetails.fareDetails;
  if (fareDetails && fareDetails.length > 0) {
    taxTotal = !!totalfareDetails.taxTotal && totalfareDetails.taxTotal;
    fareDetails.map((passengerFareDetail, index) => {
      const taxDetails = passengerFareDetail.taxDetails;
      airlineFuelSurcharge += taxDetails && calculateAirlineFuelSurcharge(taxDetails, index);
      airlineMiscellaneousFee += taxDetails && calculateAirlineMiscellaneousFee(taxDetails);
    });
  }
  return {
    taxTotal,
    airlineFuelSurcharge,
    airlineMiscellaneousFee
  };
}

export const getTotalFare = outboundItinerary => {
  let totalFare = 0;
  const totalfareDetails = outboundItinerary.totalfareDetails;
  if (totalfareDetails) {
    totalFare = totalfareDetails.totalAmount;
  }
  return totalFare;
}

export const getHandlingCharges = outboundItinerary => {
  let handlingCharges = 0;
  return handlingCharges;
}

export const getTotalAmount = outboundItinerary => {
  let totalAmount = getTotalFare(outboundItinerary) + getHandlingCharges(outboundItinerary);
  return totalAmount;
}

export const getTotalAmountCurrency = outboundItinerary => {
  let currency = "";
  const totalfareDetails = outboundItinerary && outboundItinerary.totalfareDetails;
  if (totalfareDetails) {
    currency = totalfareDetails.totalAmountCurrency;
  }
  return currency;
};

export const getAirlineName = (airlines, airlineCode) => {
  const searchedAirline = airlines.find(airline => airline.airlineCode === airlineCode);
  return !!searchedAirline ? searchedAirline.airlineName : airlineCode;
};
