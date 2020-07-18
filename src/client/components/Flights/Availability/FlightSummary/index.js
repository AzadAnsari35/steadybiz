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

import { Text } from "Widgets";

import "./style.scss";

const FlightSummary = (props) => {
  // const { outboundItinerary } = props;

  // const outboundFlightSegmentGroup = getOutboundFlightSegmentGroup(
  //   outboundItinerary
  // );
  // const returnFlightSegmentGroup = getReturnFlightSegmentGroup(
  //   outboundItinerary
  // );
  // const departDate =
  //   isValidList(outboundFlightSegmentGroup) &&
  //   getDepartureDate(outboundFlightSegmentGroup);
  // const returnDate =
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
            // text={departureAirportCode}
            text="TRV"
          />
          <Text
            className="city-name text-capitalize font-primary-regular-18"
            // text={departureCityName}
            text="Thriuvanthpuram"
          />
        </div>
        <img
          alt="segment connection"
          // src={segmentConnectionIcon}
          src={displayImage("segment-connection-arrows.svg")}
        />
        <div className="segment">
          <Text
            className="airport-code text-uppercase font-primary-semibold-20"
            // text={arrivalAirportCode}
            text="JFK"
          />
          <Text
            className="city-name text-capitalize font-primary-regular-18"
            // text={arrivalCityName}
            text="New York"
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
            // text={departDate}
            text="Monday, Jun 15"
          />
        </div>
        {/* {!!returnDate && ( */}
          <div className="d-flex">
            <Text
              className="label font-primary-regular-16 mr-6"
              text="Return : "
            />
            <Text
              className="label font-primary-semibold-16"
              // text={returnDate}
              text="Friday, Jun 26"
            />
          </div>
        {/* )} */}
      </div>
      <div className="other-details">
        <div className="d-flex">
          <Text
            className="label font-primary-regular-16 mr-6"
            text="Cabin Class : "
          />
          <Text
            className="label font-primary-semibold-16"
            // text={cabinClass}
            text="Economy"
          />
        </div>
        <div className="d-flex">
          <Text
            className="label font-primary-regular-16 mr-6"
            text="Passenger(s) : "
          />
          <Text
            className="label font-primary-semibold-16"
            // text={passengerCountAndType.join(", ")}
            text="2 Adult, 1 Child, 1 Infant"
          />
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
