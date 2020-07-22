import { cabinClasses } from "Constants/flight.constant";
import FlightItineraryCard from "Components/Flights/Availability/FlightItineraryCard/index";

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
