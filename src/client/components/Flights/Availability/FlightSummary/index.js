import React from "react";

// import {
//   getArrivalDate,
//   getArrivalAirportCodeCityName,
//   getDepartureAirportCodeCityName,
//   getDepartureDate,
//   getPassengerTypeAndCount,
//   getOutboundFlightSegmentGroup,
//   getReturnFlightSegmentGroup,
// } from "./../../utils/helpers/passengerInformation";
// import { getCabinClassName } from "Helpers/flight.helpers";
import { displayImage } from "Helpers/utils";
import { getCabinClassName } from "Helpers/flight.helpers";
import { getPassengerTypeName, changeDateFormat } from "Helpers/global";

import { Text } from "Widgets";

import "./style.scss";

const FlightSummary = (props) => {
  const { outboundItinerary, requestBody } = props;

  let departureAirportCode, arrivalAirportCode, departureDate, arrivalDate, cabinClass,
  passengerCountAndType = [], departureCityName, arrivalCityName;

  if (requestBody.flightSearchRQ) {
    const { flightSearchRQ } = requestBody;
    departureAirportCode = flightSearchRQ.originDestination[0].originAirportCode;
    departureCityName = flightSearchRQ.originDestination[0].originAirport.subTitle.split(",")[0],
    departureDate = changeDateFormat(flightSearchRQ.originDestination[0].originDate);
    arrivalAirportCode = flightSearchRQ.originDestination[0].destinationAirportCode;
    arrivalCityName = flightSearchRQ.originDestination[0].destinationAirport.subTitle.split(",")[0],
    arrivalDate = changeDateFormat(flightSearchRQ.originDestination[0].destinationDate);
    cabinClass = getCabinClassName(flightSearchRQ.cabinCode);
    flightSearchRQ.passengerList.passenger.map(item => {
      passengerCountAndType.push(`${item.count} ${getPassengerTypeName(item.PTC)}`)
    });
  }

  // const outboundFlightSegmentGroup = getOutboundFlightSegmentGroup(
  //   outboundItinerary
  // );
  // const returnFlightSegmentGroup = getReturnFlightSegmentGroup(
  //   outboundItinerary
  // );
  // const departDate =
  //   isValidList(outboundFlightSegmentGroup) &&
  //   getDepartureDate(outboundFlightSegmentGroup);
  // const arrivalDate =
  //   isValidList(returnFlightSegmentGroup) &&
  //   getArrivalDate(returnFlightSegmentGroup);
  // const passengerCountAndType = getPassengerTypeAndCount(outboundItinerary);
  // const cabinClass =
  //   isValidList(outboundFlightSegmentGroup) &&
  // getCabinClassName(outboundFlightSegmentGroup[0].cabinClass);
  // const { departureAirportCode, departureCityName } =
  //   isValidList(outboundFlightSegmentGroup) &&
  //   getDepartureAirportCodeCityName(outboundFlightSegmentGroup);
  // const { arrivalAirportCode, arrivalCityName } = isValidList(
  //   returnFlightSegmentGroup
  // )
  //   ? getArrivalAirportCodeCityName(returnFlightSegmentGroup)
  //   : getArrivalAirportCodeCityName(outboundFlightSegmentGroup, false);

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
