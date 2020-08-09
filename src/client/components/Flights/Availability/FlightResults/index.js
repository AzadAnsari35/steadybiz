import React from "react";

import FlightItineraryCard from "Components/Flights/Availability/FlightItineraryCard";

import "./style.scss";

const FlightResults = props => {
  const { results: { commonRS: { flightItinerary } } } = props;

  return (
    <div className="FlightResults">
      {flightItinerary[0].outboundItinerary.map(itinerary =>
        <FlightItineraryCard
          key={itinerary.flightItineraryId}
          itinerary={itinerary}
        />
      )}
    </div>
  )
};

export default FlightResults;
