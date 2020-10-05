import { cabinClasses } from 'Constants/flight.constant';
import {
  addDurations,
  calculateDurationInMinutes,
  calculateTotalDuration,
  changeDateFormat,
  extractTime,
  getPassengerTypeName,
  getRange,
} from 'Helpers/global';

const positiveInfinity = Number.POSITIVE_INFINITY,
  negativeInfinity = Number.NEGATIVE_INFINITY;

export const getCabinClassName = (code) => {
  return cabinClasses.map(
    (cabinclass) => cabinclass.CODE === code && cabinclass.NAME
  );
};

export const getFlightSegmentType = (flightItinerary) => {
  return flightItinerary[0].flightSegmentType;
};

export const checkIsFareRefundable = (itinerary) => {
  return (
    itinerary &&
    itinerary.totalfareDetails &&
    itinerary.totalfareDetails.fareRefundable
  );
};

export const getTotalItineraryFareAndCurrency = (itinerary) => {
  let currency = 'AED',
    totalAmount = 0;
  if (itinerary && itinerary.totalfareDetails) {
    if (itinerary.totalfareDetails.totalAmountCurrency) {
      currency = itinerary.totalfareDetails.totalAmountCurrency;
    }
    if (itinerary.totalfareDetails.totalAmount) {
      totalAmount = itinerary.totalfareDetails.totalAmount;
    }
  }
  return { currency, totalAmount };
};

export const getFlightSegmentByType = (itinerary, segmentType) => {
  const flightSegment =
    itinerary &&
    itinerary.flightSegments.find(
      (item) => item.flightSegmentDirection === segmentType
    );
  return flightSegment;
};

export const getAirlineDetails = (flightSegment) => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (
    flightSegment &&
    flightSegment.flightSegmentGroup &&
    flightSegment.flightSegmentGroup.length > 0
  ) {
    return flightSegment.flightSegmentGroup[0].airlineDetails;
  }
};

export const getDepartureSegmentDetails = (flightSegment) => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (
    flightSegment &&
    flightSegment.flightSegmentGroup &&
    flightSegment.flightSegmentGroup.length > 0
  ) {
    return flightSegment.flightSegmentGroup[0].departureDetails;
  }
};

export const getArrivalSegmentDetails = (flightSegment) => {
  // NEED TO ADD LOGIC TO CHECK VALID ARRAY
  if (
    flightSegment &&
    flightSegment.flightSegmentGroup &&
    flightSegment.flightSegmentGroup.length > 0
  ) {
    return flightSegment.flightSegmentGroup[
      flightSegment.flightSegmentGroup.length - 1
    ].arrivalDetails;
  }
};

export const getTotalFlightDuration = (flightSegment) => {
  const durationsArr = [];
  flightSegment.flightSegmentGroup.map((segmentGroup, index) => {
    if (index < flightSegment.flightSegmentGroup.length - 1) {
      durationsArr.push(
        segmentGroup.arrivalDetails.flightDuration,
        segmentGroup.arrivalDetails.layOverTime
      );
    } else {
      durationsArr.push(segmentGroup.arrivalDetails.flightDuration);
    }
  });

  return calculateTotalDuration(durationsArr);
};

export const getTotalPassengersCount = (outboundItinerary) => {
  if (
    outboundItinerary &&
    outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails &&
    outboundItinerary.totalfareDetails.fareDetails.length > 0
  ) {
    return outboundItinerary.totalfareDetails.fareDetails.reduce(
      (a, b) => a + (b['count'] || 0),
      0
    );
  }
};

export const getBaseFareDetails = (outboundItinerary) => {
  let baseFareTotal = 0;
  const baseFareBreakup = [];
  if (
    outboundItinerary &&
    outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails &&
    outboundItinerary.totalfareDetails.fareDetails.length > 0
  ) {
    baseFareTotal =
      outboundItinerary.totalfareDetails.baseFareTotal &&
      outboundItinerary.totalfareDetails.baseFareTotal;
    outboundItinerary.totalfareDetails.fareDetails.map(
      (passengerFareDetail) => {
        baseFareBreakup.push({
          passengerType: getPassengerTypeName(passengerFareDetail.ptc),
          passengerCount: passengerFareDetail.count,
          passengerBaseFare:
            passengerFareDetail.count * passengerFareDetail.baseFare,
        });
      }
    );
  }
  return {
    baseFareTotal,
    baseFareBreakup,
  };
};

// export const calculateTaxBreakUp = (fareDetails, taxCode) => {
//   let taxAmount = 0;
//   fareDetails.map((passengerFareDetail) => {
//     const filteredTaxDetails = passengerFareDetail.taxDetails.filter(
//       (taxItem) => taxItem.taxcode.startsWith(taxCode)
//     );
//     taxAmount += filteredTaxDetails.reduce(
//       (a, b) => a + (b['taxAmount'] || 0),
//       0
//     );
//   });
//   return taxAmount;
// };

const calculateAirlineFuelSurcharge = (taxDetails, index) => {
  const filteredTaxDetails = taxDetails.filter(
    (taxItem) =>
      taxItem.taxcode.startsWith('YQ') || taxItem.taxcode.startsWith('YR')
  );
  return filteredTaxDetails.reduce((a, b) => a + (b['taxAmount'] || 0), 0);
};

const calculateAirlineMiscellaneousFee = (taxDetails) => {
  const filteredTaxDetails = taxDetails.filter(
    (taxItem) =>
      !(taxItem.taxcode.startsWith('YQ') || taxItem.taxcode.startsWith('YR'))
  );
  return filteredTaxDetails.reduce((a, b) => a + (b['taxAmount'] || 0), 0);
};

export const getTaxesAndFeesDetails = (outboundItinerary) => {
  let taxTotal = 0;
  let airlineFuelSurcharge = 0;
  let airlineMiscellaneousFee = 0;
  const totalfareDetails =
    outboundItinerary.totalfareDetails && outboundItinerary.totalfareDetails;
  const fareDetails = !!totalfareDetails && totalfareDetails.fareDetails;
  if (fareDetails && fareDetails.length > 0) {
    taxTotal = !!totalfareDetails.taxTotal && totalfareDetails.taxTotal;
    fareDetails.map((passengerFareDetail, index) => {
      const taxDetails = passengerFareDetail.taxDetails;
      airlineFuelSurcharge +=
        taxDetails && calculateAirlineFuelSurcharge(taxDetails, index);
      airlineMiscellaneousFee +=
        taxDetails && calculateAirlineMiscellaneousFee(taxDetails);
    });
  }
  return {
    taxTotal,
    airlineFuelSurcharge,
    airlineMiscellaneousFee,
  };
};

export const getTotalFare = (outboundItinerary) => {
  let totalFare = 0;
  const totalfareDetails = outboundItinerary.totalfareDetails;
  if (totalfareDetails) {
    totalFare = totalfareDetails.totalAmount;
  }
  return totalFare;
};

export const getHandlingCharges = (outboundItinerary) => {
  let handlingCharges = 0;
  return handlingCharges;
};
export const getTotalEarning = (outboundItinerary) => {
  const dealDiscount = outboundItinerary?.totalfareDetails?.dealDiscount;
  if (dealDiscount) return dealDiscount;
  else return 0;
};
export const getTotalAmount = (
  outboundItinerary,
  customer = { isForCustomer: false }
) => {
  let totalAmount =
    getTotalFare(outboundItinerary) + getHandlingCharges(outboundItinerary);
  if (!customer.isForCustomer)
    totalAmount = totalAmount - getTotalEarning(outboundItinerary);
  return totalAmount;
};

export const getTotalAmountCurrency = (outboundItinerary) => {
  let currency = '';
  const totalfareDetails =
    outboundItinerary && outboundItinerary.totalfareDetails;
  if (totalfareDetails) {
    currency = totalfareDetails.totalAmountCurrency;
  }
  return currency;
};

export const getAirlineName = (airlines, airlineCode) => {
  const searchedAirline = airlines.find(
    (airline) => airline.airlineCode === airlineCode
  );
  return searchedAirline ? searchedAirline.airlineName : airlineCode;
};

const getMinimumValue = (value, min = positiveInfinity) => {
  if (value < min) {
    return value;
  }
  return min;
};

export const getFlightDuration = (flightSegment) => {
  const { flightSegmentGroup = [] } = !!flightSegment && flightSegment;
  let flightDurationTime = '00:00';
  if (flightSegment) {
    for (let i = 0; i <= flightSegment.stopCount; i++) {
      let segmentFlightDuration =
        flightSegmentGroup[i].arrivalDetails.flightDuration || '00:00';
      let segmentlayOverDuration =
        flightSegmentGroup[i].arrivalDetails.layOverTime || '00:00';
      flightDurationTime = addDurations([
        flightDurationTime,
        segmentFlightDuration,
        segmentlayOverDuration,
      ]);
    }
  }
  return flightDurationTime;
};

const getLayOverDuration = (flightSegment) => {
  const { flightSegmentGroup = [] } = !!flightSegment && flightSegment;
  let flightLayOverTime = '00:00';
  if (flightSegment) {
    for (let i = 0; i < flightSegment.stopCount; i++) {
      let segmentlayOverDuration =
        flightSegmentGroup[i].arrivalDetails.layOverTime || '00:00';
      flightLayOverTime = addDurations([
        flightLayOverTime,
        segmentlayOverDuration,
      ]);
    }
  }
  return flightLayOverTime;
};

// filters data
export const getFiltersData = (outboundItinerary) => {
  let priceRange = [positiveInfinity, negativeInfinity],
    refundableMinPrice = positiveInfinity,
    nonRefundableMinPrice = positiveInfinity;
  const nearbyAirportsData = {
    outbound: {
      departure: {},
      arrival: {},
    },
    return: {
      departure: {},
      arrival: {},
    },
  };
  const stopsData = {
    outbound: {
      directFlightsMinPrice: positiveInfinity,
      oneStopFlighstMinPrice: positiveInfinity,
      twoStopFlighstMinPrice: positiveInfinity,
    },
    return: {
      directFlightsMinPrice: positiveInfinity,
      oneStopFlighstMinPrice: positiveInfinity,
      twoStopFlighstMinPrice: positiveInfinity,
    },
  };
  const airlinesData = {};
  const timeSlotsInitialObj = {
    first: positiveInfinity,
    second: positiveInfinity,
    third: positiveInfinity,
    fourth: positiveInfinity,
  };
  const flightSlots = {
    outbound: {
      departure: { ...timeSlotsInitialObj },
      arrival: { ...timeSlotsInitialObj },
    },
    return: {
      departure: { ...timeSlotsInitialObj },
      arrival: { ...timeSlotsInitialObj },
    },
  };
  const layoverDurations = {
    outbound: [positiveInfinity, negativeInfinity],
    return: [positiveInfinity, negativeInfinity],
  };
  const tripDurations = {
    outbound: [positiveInfinity, negativeInfinity],
    return: [positiveInfinity, negativeInfinity],
  };
  const itineraryCityNames = [
    {
      id: 'departure',
      value: '',
    },
    {
      id: 'arrival',
      value: '',
    },
  ];

  outboundItinerary.forEach((itinerary, index) => {
    const { flightSegments, totalfareDetails } = itinerary;
    const { totalAmount, fareRefundable } = totalfareDetails;
    const {
      flightSegmentGroup: outboundFlightSegmentGroup,
    } = flightSegments[0];
    const { flightSegmentGroup: returnFlightSegmentGroup } =
      !!flightSegments && flightSegments.length > 1 && flightSegments[1];
    const outboundDepartureFlightSegmentGroup = outboundFlightSegmentGroup[0];
    const outboundArrivalFlightSegmentGroup =
      outboundFlightSegmentGroup[outboundFlightSegmentGroup.length - 1];
    const returnDepartureFlightSegmentGroup =
      !!returnFlightSegmentGroup && returnFlightSegmentGroup[0];
    const returnArrivalFlightSegmentGroup =
      !!returnFlightSegmentGroup &&
      returnFlightSegmentGroup[returnFlightSegmentGroup.length - 1];
    const outboundDepartureFlightSegmentGroupAirline =
      outboundDepartureFlightSegmentGroup.airlineDetails.marketingAirline;
    const outboundDepartureDetails =
      outboundDepartureFlightSegmentGroup.departureDetails;
    const outboundArrivalDetails =
      outboundArrivalFlightSegmentGroup.arrivalDetails;
    const returnDepartureDetails =
      !!returnDepartureFlightSegmentGroup &&
      returnDepartureFlightSegmentGroup.departureDetails;
    const returnArrivalDetails =
      !!returnArrivalFlightSegmentGroup &&
      returnArrivalFlightSegmentGroup.arrivalDetails;
    // PRICE RANGE
    priceRange = getRange(totalAmount, priceRange[0], priceRange[1]);
    // NEARBY AIRPORTS
    if (
      outboundDepartureDetails.airportCode in
        nearbyAirportsData.outbound.departure &&
      nearbyAirportsData.outbound.departure[
        outboundDepartureDetails.airportCode
      ].price < totalAmount
    ) {
      nearbyAirportsData.outbound.departure[
        outboundDepartureDetails.airportCode
      ].price = getMinimumValue(
        totalAmount,
        nearbyAirportsData.outbound.departure[outboundDepartureDetails]
      );
    } else {
      nearbyAirportsData.outbound.departure[
        outboundDepartureDetails.airportCode
      ] = {
        name: outboundDepartureDetails.airportName,
        price: totalAmount,
      };
    }
    if (
      outboundArrivalDetails.airportCode in
        nearbyAirportsData.outbound.arrival &&
      nearbyAirportsData.outbound.arrival[outboundArrivalDetails.airportCode]
        .price < totalAmount
    ) {
      nearbyAirportsData.outbound.arrival[
        outboundArrivalDetails.airportCode
      ].price = getMinimumValue(
        totalAmount,
        nearbyAirportsData.outbound.arrival[outboundArrivalDetails]
      );
    } else {
      nearbyAirportsData.outbound.arrival[
        outboundArrivalDetails.airportCode
      ] = {
        name: outboundArrivalDetails.airportName,
        price: totalAmount,
      };
    }
    if (
      returnDepartureDetails.airportCode in
        nearbyAirportsData.return.departure &&
      nearbyAirportsData.return.departure[returnDepartureDetails.airportCode]
        .price < totalAmount
    ) {
      nearbyAirportsData.return.departure[
        returnDepartureDetails.airportCode
      ].price = getMinimumValue(
        totalAmount,
        nearbyAirportsData.return.departure[returnDepartureDetails]
      );
    } else {
      nearbyAirportsData.return.departure[
        returnDepartureDetails.airportCode
      ] = {
        name: returnDepartureDetails.airportName,
        price: totalAmount,
      };
    }
    if (
      returnArrivalDetails.airportCode in nearbyAirportsData.return.arrival &&
      nearbyAirportsData.return.arrival[returnArrivalDetails.airportCode]
        .price < totalAmount
    ) {
      nearbyAirportsData.return.arrival[
        returnArrivalDetails.airportCode
      ].price = getMinimumValue(
        totalAmount,
        nearbyAirportsData.return.arrival[returnArrivalDetails]
      );
    } else {
      nearbyAirportsData.return.arrival[returnArrivalDetails.airportCode] = {
        name: returnArrivalDetails.airportName,
        price: totalAmount,
      };
    }
    // STOPS
    // flightSegments.forEach((segment, index) => {
    //   const segmentName = index === 0 ? "outbound" : "return";
    //   if (segment.stopCount === 0 && totalAmount < stopsData[segmentName].directFlightsMinPrice) {
    //     stopsData[segmentName].directFlightsMinPrice = totalAmount;
    //   } else if (segmentName.stopCount === 1 && totalAmount < stopsData[segmentName].oneStopFlighstMinPrice) {
    //     stopsData[segmentName].oneStopFlighstMinPrice = totalAmount;
    //   } else if (segmentName.stopCount === 2 && totalAmount < stopsData[segmentName].twoStopFlighstMinPrice) {
    //     stopsData[segmentName].twoStopFlighstMinPrice = totalAmount;
    //   }
    // });
    if (
      flightSegments[0].stopCount === 0 &&
      totalAmount < stopsData.outbound.directFlightsMinPrice
    ) {
      stopsData.outbound.directFlightsMinPrice = totalAmount;
    } else if (
      flightSegments[0].stopCount === 1 &&
      totalAmount < stopsData.outbound.oneStopFlighstMinPrice
    ) {
      stopsData.outbound.oneStopFlighstMinPrice = totalAmount;
    } else if (
      flightSegments[0].stopCount === 2 &&
      totalAmount < stopsData.outbound.twoStopFlighstMinPrice
    ) {
      stopsData.outbound.twoStopFlighstMinPrice = totalAmount;
    }
    if (flightSegments.length > 1) {
      if (
        flightSegments[1].stopCount === 0 &&
        totalAmount < stopsData.return.directFlightsMinPrice
      ) {
        stopsData.return.directFlightsMinPrice = totalAmount;
      } else if (
        flightSegments[1].stopCount === 1 &&
        totalAmount < stopsData.return.oneStopFlighstMinPrice
      ) {
        stopsData.return.oneStopFlighstMinPrice = totalAmount;
      } else if (
        flightSegments[1].stopCount === 2 &&
        totalAmount < stopsData.return.twoStopFlighstMinPrice
      ) {
        stopsData.return.twoStopFlighstMinPrice = totalAmount;
      }
    }
    // FARE TYPES
    if (fareRefundable) {
      refundableMinPrice = getMinimumValue(totalAmount, refundableMinPrice);
    } else {
      nonRefundableMinPrice = getMinimumValue(
        totalAmount,
        nonRefundableMinPrice
      );
    }
    // AIRLINES
    if (
      outboundDepartureFlightSegmentGroupAirline in airlinesData &&
      airlinesData[outboundDepartureFlightSegmentGroupAirline] < totalAmount
    ) {
      airlinesData[
        outboundDepartureFlightSegmentGroupAirline
      ] = getMinimumValue(
        totalAmount,
        airlinesData[outboundDepartureFlightSegmentGroupAirline]
      );
    } else {
      airlinesData[
        outboundDepartureFlightSegmentGroupAirline
      ] = getMinimumValue(
        totalAmount,
        airlinesData[outboundDepartureFlightSegmentGroupAirline]
      );
    }
    // FLIGHT TIME
    // OUTBOUND DEPARTURE
    if (
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) >= 360 &&
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) <= 719 &&
      totalAmount < flightSlots.outbound.departure.first
    ) {
      flightSlots.outbound.departure.first = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) >= 720 &&
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) <= 1079 &&
      totalAmount < flightSlots.outbound.departure.second
    ) {
      flightSlots.outbound.departure.second = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) >= 1080 &&
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) <= 1439 &&
      totalAmount < flightSlots.outbound.departure.third
    ) {
      flightSlots.outbound.departure.third = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) >= 0 &&
      calculateDurationInMinutes(
        extractTime(outboundDepartureFlightSegmentGroup.departureDetails.time)
      ) <= 359 &&
      totalAmount < flightSlots.outbound.departure.fourth
    ) {
      flightSlots.outbound.departure.fourth = totalAmount;
    }
    // OUTBOUND ARRIVAL
    if (
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) >= 360 &&
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) <= 719 &&
      totalAmount < flightSlots.outbound.arrival.first
    ) {
      flightSlots.outbound.arrival.first = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) >= 720 &&
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) <= 1079 &&
      totalAmount < flightSlots.outbound.arrival.second
    ) {
      flightSlots.outbound.arrival.second = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) >= 1080 &&
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) <= 1439 &&
      totalAmount < flightSlots.outbound.arrival.third
    ) {
      flightSlots.outbound.arrival.third = totalAmount;
    }
    if (
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) >= 0 &&
      calculateDurationInMinutes(
        extractTime(outboundArrivalFlightSegmentGroup.departureDetails.time)
      ) <= 359 &&
      totalAmount < flightSlots.outbound.arrival.fourth
    ) {
      flightSlots.outbound.arrival.fourth = totalAmount;
    }
    if (returnDepartureFlightSegmentGroup) {
      // RETURN DEPARTURE
      if (
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) >= 360 &&
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) <= 719 &&
        totalAmount < flightSlots.return.departure.first
      ) {
        flightSlots.return.departure.first = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) >= 720 &&
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) <= 1079 &&
        totalAmount < flightSlots.return.departure.second
      ) {
        flightSlots.return.departure.second = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) >= 1080 &&
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) <= 1439 &&
        totalAmount < flightSlots.return.departure.third
      ) {
        flightSlots.return.departure.third = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) >= 0 &&
        calculateDurationInMinutes(
          extractTime(returnDepartureFlightSegmentGroup.departureDetails.time)
        ) <= 359 &&
        totalAmount < flightSlots.return.departure.fourth
      ) {
        flightSlots.return.departure.fourth = totalAmount;
      }
      // OUTBOUND ARRIVAL
      if (
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) >= 360 &&
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) <= 719 &&
        totalAmount < flightSlots.return.arrival.first
      ) {
        flightSlots.return.arrival.first = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) >= 720 &&
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) <= 1079 &&
        totalAmount < flightSlots.return.arrival.second
      ) {
        flightSlots.return.arrival.second = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) >= 1080 &&
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) <= 1439 &&
        totalAmount < flightSlots.return.arrival.third
      ) {
        flightSlots.return.arrival.third = totalAmount;
      }
      if (
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) >= 0 &&
        calculateDurationInMinutes(
          extractTime(returnArrivalFlightSegmentGroup.departureDetails.time)
        ) <= 359 &&
        totalAmount < flightSlots.return.arrival.fourth
      ) {
        flightSlots.return.arrival.fourth = totalAmount;
      }
    }

    // LAYOVER DURATION
    layoverDurations.outbound = getRange(
      calculateDurationInMinutes(getLayOverDuration(flightSegments[0])),
      layoverDurations.outbound[0],
      layoverDurations.outbound[1]
    );
    layoverDurations.return = getRange(
      calculateDurationInMinutes(getLayOverDuration(flightSegments[1])),
      layoverDurations.outbound[0],
      layoverDurations.return[1]
    );

    // TRIP DURATION
    tripDurations.outbound = getRange(
      calculateDurationInMinutes(getFlightDuration(flightSegments[0])),
      tripDurations.outbound[0],
      tripDurations.outbound[1]
    );
    tripDurations.return = getRange(
      calculateDurationInMinutes(getFlightDuration(flightSegments[1])),
      tripDurations.return[0],
      tripDurations.return[1]
    );
    itineraryCityNames[0].value =
      outboundDepartureFlightSegmentGroup.departureDetails.cityName;
    itineraryCityNames[1].value =
      outboundArrivalFlightSegmentGroup.arrivalDetails.cityName;
  });
  return {
    priceRange,
    nearbyAirportsData,
    refundableMinPrice,
    nonRefundableMinPrice,
    stopsData,
    airlinesData,
    flightSlots,
    layoverDurations,
    tripDurations,
    itineraryCityNames,
  };
};

export const getOutboundFlightSegmentGroup = (outboundItinerary) => {
  const { flightSegments } = outboundItinerary;
  const outboundFlightSegment = flightSegments.find(
    (segment) => segment.flightSegmentDirection.toLowerCase() === 'outbound'
  );
  return outboundFlightSegment.flightSegmentGroup;
};

export const getReturnFlightSegmentGroup = (outboundItinerary) => {
  const { flightSegments } = outboundItinerary;
  const returnFlightSegment = flightSegments.find(
    (segment) => segment.flightSegmentDirection.toLowerCase() === 'inbound'
  );
  return !!returnFlightSegment && returnFlightSegment.flightSegmentGroup;
};

export const getDepartureAirportCodeCityName = (outboundFlightSegmentGroup) => {
  if (
    outboundFlightSegmentGroup[0].departureDetails &&
    outboundFlightSegmentGroup[0].departureDetails.airportCode &&
    outboundFlightSegmentGroup[0].departureDetails.cityName
  ) {
    return {
      departureAirportCode:
        outboundFlightSegmentGroup[0].departureDetails.airportCode,
      departureCityName:
        outboundFlightSegmentGroup[0].departureDetails.cityName,
    };
  }
  return {
    departureAirportCode: '',
    departureCityName: '',
  };
};

export const getArrivalAirportCodeCityName = (
  flightSegmentGroup,
  isRoundTrip = true
) => {
  if (
    isRoundTrip &&
    flightSegmentGroup[0].departureDetails &&
    flightSegmentGroup[0].departureDetails.airportCode &&
    flightSegmentGroup[0].departureDetails.cityName
  ) {
    return {
      arrivalAirportCode: flightSegmentGroup[0].departureDetails.airportCode,
      arrivalCityName: flightSegmentGroup[0].departureDetails.cityName,
    };
  } else if (
    flightSegmentGroup[0].arrivalDetails &&
    flightSegmentGroup[0].arrivalDetails.airportCode &&
    flightSegmentGroup[0].arrivalDetails.cityName
  ) {
    return {
      arrivalAirportCode: flightSegmentGroup[0].arrivalDetails.airportCode,
      arrivalCityName: flightSegmentGroup[0].arrivalDetails.cityName,
    };
  }
  return {
    arrivalAirportCode: '',
    arrivalCityName: '',
  };
};

export const getDepartureDate = (outboundFlightSegmentGroup) => {
  if (
    outboundFlightSegmentGroup[0].departureDetails &&
    outboundFlightSegmentGroup[0].departureDetails.date
  ) {
    return changeDateFormat(
      outboundFlightSegmentGroup[0].departureDetails.date
    );
  }
  return '';
};

export const getArrivalDate = (returnFlightSegmentGroup) => {
  if (
    returnFlightSegmentGroup[0].departureDetails &&
    returnFlightSegmentGroup[0].departureDetails.date
  ) {
    return changeDateFormat(returnFlightSegmentGroup[0].departureDetails.date);
  }
  return '';
};

export const getPassengerTypeAndCount = (outboundItinerary) => {
  const passengerCountAndType = [];
  if (
    outboundItinerary &&
    outboundItinerary.totalfareDetails &&
    outboundItinerary.totalfareDetails.fareDetails &&
    outboundItinerary.totalfareDetails.fareDetails.length > 0
  ) {
    outboundItinerary.totalfareDetails.fareDetails.map((item) =>
      passengerCountAndType.push(
        `${item.count} ${getPassengerTypeName(item.ptc)}`
      )
    );
  }
  return passengerCountAndType;
};
