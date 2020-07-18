import React from "react";

import { getFlightSegmentType } from "Helpers/flight.helpers";

import FlightItineraryCard from "Components/Flights/Availability/FlightItineraryCard";

import "./style.scss";

const FlightResults = props => {
  const { results } = props;
  const { commonRS: { flightItinerary } } = results;
  const flightSegmentType = getFlightSegmentType(flightItinerary);
  const { outboundItinerary } = flightItinerary[0];

  return (
    <div className="FlightResults">
      {outboundItinerary.map(itinerary =>
        <FlightItineraryCard
          key={itinerary.flightItineraryId}
          flightSegmentType={flightSegmentType}
          itinerary={itinerary}
        />
      )}
    </div>
  )
};

export default FlightResults;
