import React from "react";

import FlightItineraryCard from "Components/Flights/Availability/FlightItineraryCard";

import "./style.scss";

const FlightResults = props => {
  const { requestBody, results } = props;

  return (
    <div className="FlightResults">
      {results.map(itinerary =>
        <FlightItineraryCard
          key={itinerary.flightItineraryId}
          itinerary={itinerary}
          requestBody={requestBody}
        />
      )}
    </div>
  )
};

export default FlightResults;
