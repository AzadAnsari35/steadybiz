import React from "react";

import { displayImage } from "Helpers/utils";
import {
  getCabinClassName,
  getOutboundFlightSegmentGroup,
  getReturnFlightSegmentGroup,
  getDepartureAirportCodeCityName,
  getDepartureDate,
  getArrivalAirportCodeCityName,
  getArrivalDate,
  getPassengerTypeAndCount,
} from "Helpers/flight.helpers";
import { getPassengerTypeName, changeDateFormat } from "Helpers/global";

import { Text } from "Widgets";

import "./style.scss";

const FlightSummary = (props) => {
  const { outboundItinerary, requestBody, useSearchInput = true } = props;

  let departureAirportCode, arrivalAirportCode, departureDate, arrivalDate, cabinClass,
  passengerCountAndType = [], departureCityName, arrivalCityName;

  if (!!requestBody && requestBody.flightSearchRQ && useSearchInput) {
    const { flightSearchRQ } = requestBody;
    departureAirportCode = flightSearchRQ.originDestination[0].originAirportCode;
    departureCityName = flightSearchRQ.originDestination[0].originAirport.subTitle.split(",")[0],
    departureDate = changeDateFormat(flightSearchRQ.originDestination[0].originDate);
    arrivalAirportCode = flightSearchRQ.originDestination[0].destinationAirportCode;
    arrivalCityName = flightSearchRQ.originDestination[0].destinationAirport.subTitle.split(",")[0],
    arrivalDate = !!flightSearchRQ.originDestination[0].destinationDate &&
      changeDateFormat(flightSearchRQ.originDestination[0].destinationDate);
    cabinClass = getCabinClassName(flightSearchRQ.cabinCode);
    flightSearchRQ.passengerList.passenger.map(item => {
      passengerCountAndType.push(`${item.count} ${getPassengerTypeName(item.PTC)}`)
    });
  } else {
    const outboundFlightSegmentGroup = getOutboundFlightSegmentGroup(outboundItinerary);
    const returnFlightSegmentGroup = getReturnFlightSegmentGroup(outboundItinerary);
    const { departureAirportCode: departureCode, departureCityName: departureName } =
      outboundFlightSegmentGroup.length > 0 &&
      getDepartureAirportCodeCityName(outboundFlightSegmentGroup);
    departureAirportCode = departureCode;
    departureCityName = departureName;
    departureDate = outboundFlightSegmentGroup.length > 0 &&
      getDepartureDate(outboundFlightSegmentGroup);
    const { arrivalAirportCode: arrivalCode, arrivalCityName: arrivalName } =
      returnFlightSegmentGroup.length > 0
      ? getArrivalAirportCodeCityName(returnFlightSegmentGroup)
      : getArrivalAirportCodeCityName(outboundFlightSegmentGroup, false);
    arrivalAirportCode = arrivalCode;
    arrivalCityName = arrivalName;
    arrivalDate = returnFlightSegmentGroup.length > 0 &&
      getArrivalDate(returnFlightSegmentGroup);
    cabinClass = outboundFlightSegmentGroup.length > 0 &&
      getCabinClassName(outboundFlightSegmentGroup[0].cabinClass);
    passengerCountAndType = getPassengerTypeAndCount(outboundItinerary);
  }

  return (
    <div className="FlightSummary d-flex">
      <div className="segments position-relative d-flex border-right-gray-thin">
        <div className="segment">
          <Text
            className="airport-code text-uppercase font-primary-semibold-20"
            text={departureAirportCode}
          />
          <Text
            className="city-name text-capitalize font-primary-regular-18"
            text={departureCityName}
          />
        </div>
        <img
          alt="segment connection"
          src={displayImage("segment-connection-arrows.svg")}
        />
        <div className="segment">
          <Text
            className="airport-code text-uppercase font-primary-semibold-20"
            text={arrivalAirportCode}
          />
          <Text
            className="city-name text-capitalize font-primary-regular-18"
            text={arrivalCityName}
          />
        </div>
      </div>
      <div className="dates border-right-gray-thin">
        <div className="d-flex">
          <Text
            className="label font-primary-regular-16 mr-6"
            text="Outbound : "
          />
          <Text
            className="label font-primary-semibold-16"
            text={departureDate}
          />
        </div>
        {!!arrivalDate && (
          <div className="d-flex">
            <Text
              className="label font-primary-regular-16 mr-6"
              text="Return : "
            />
            <Text
              className="label font-primary-semibold-16"
              text={arrivalDate}
            />
          </div>
        )}
      </div>
      <div className="other-details">
        <div className="d-flex">
          <Text
            className="label font-primary-regular-16 mr-6"
            text="Cabin Class : "
          />
          <Text
            className="label font-primary-semibold-16"
            text={cabinClass}
          />
        </div>
        <div className="d-flex">
          <Text
            className="label font-primary-regular-16 mr-6"
            text="Passenger(s) : "
          />
          <Text
            className="label font-primary-semibold-16"
            text={passengerCountAndType.join(", ")}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
