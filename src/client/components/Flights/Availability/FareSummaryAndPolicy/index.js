import React from "react";
import { Grid } from "@material-ui/core";

import { Text } from "Widgets";

import FareSummary from "Components/Flights/Availability/FareSummary";
import FarePolicy from "Components/Flights/Availability/FarePolicy";

import "./style.scss";

const FareSummaryAndPolicy = props => {
  const { itinerary } = props;
  return (
    <div className="FareSummaryAndPolicy d-flex">
      <Grid item xs={12} md={6}>
        <div className="FareSummaryAndPolicy-fareSummary d-flex flex-direction-column height-100">
          <Text className="title font-primary-medium-18" text="Fare Summary" showLeftBorder />
          <FareSummary outboundItinerary={itinerary} />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="FareSummaryAndPolicy-farePolicy">
          <Text className="title font-primary-medium-18" text="Fare Policy" showLeftBorder />
          <FarePolicy outboundItinerary={itinerary} />
        </div>
      </Grid>
    </div>
  )
};

export default FareSummaryAndPolicy;
