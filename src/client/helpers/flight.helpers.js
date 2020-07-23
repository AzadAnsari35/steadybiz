import { cabinClasses } from "Constants/flight.constant";
import { getPassengerTypeName } from "Helpers/global";

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
  if (outboundItinerary && outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails && outboundItinerary.totalfareDetails.fareDetails.length > 0) {
    taxTotal = outboundItinerary.totalfareDetails.taxTotal && outboundItinerary.totalfareDetails.taxTotal;
    outboundItinerary.totalfareDetails.fareDetails.map((passengerFareDetail, index) => {
      airlineFuelSurcharge +=
        passengerFareDetail.taxDetails && calculateAirlineFuelSurcharge(passengerFareDetail.taxDetails, index);
      airlineMiscellaneousFee +=
        passengerFareDetail.taxDetails && calculateAirlineMiscellaneousFee(passengerFareDetail.taxDetails);
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
  if (outboundItinerary && outboundItinerary.totalfareDetails) {
    totalFare = outboundItinerary.totalfareDetails.totalAmount;
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
  if (outboundItinerary && outboundItinerary.totalfareDetails) {
    currency = outboundItinerary.totalfareDetails.totalAmountCurrency;
  }
  return currency;
}
