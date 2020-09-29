import React from 'react';

import FlightItineraryCard from 'Components/Flights/Availability/FlightItineraryCard';

import './style.scss';

const FlightResults = (props) => {
  const { requestBody, results, setShowAgencyInfo } = props;

  return (
    <div className="FlightResults">
      {results.map((itinerary) => (
        <FlightItineraryCard
          key={itinerary.flightItineraryId}
          itinerary={itinerary}
          requestBody={requestBody}
          setShowAgencyInfo={setShowAgencyInfo}
        />
      ))}
    </div>
  );
};

export default FlightResults;
