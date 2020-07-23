import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";

import { Text } from "Widgets";

import "./style.scss";

const FarePolicy = (props) => {
  const { outboundItinerary } = props;
  const exchangeBefore = outboundItinerary.totalfareDetails.fareDetails[0].penalties.find(penalty => 
    penalty.type === "Exchange" && penalty.applicability === "Before");
  const exchangeAfter = outboundItinerary.totalfareDetails.fareDetails[0].penalties.find(penalty => 
    penalty.type === "Exchange" && penalty.applicability === "After");
  const refundBefore = outboundItinerary.totalfareDetails.fareDetails[0].penalties.find(penalty => 
    penalty.type === "Refund" && penalty.applicability === "Before");
  const refundAfter = outboundItinerary.totalfareDetails.fareDetails[0].penalties.find(penalty => 
    penalty.type === "Refund" && penalty.applicability === "After");

	return (
		<div className="FarePolicy">
      {outboundItinerary.flightSegments.map((segment, index) =>
        <Fragment key={index}>
          <Text
            className="FarePolicy-segment font-primary-semibold-14"
            text={
              `${segment.flightSegmentDirection === "Outbound" ? "Outbound" : "Return"
              } : [ ${segment.departureAirport} - ${segment.arrivalAirport} ]`
            }
          />
          <div className="FarePolicy-table">
            <Text className="FarePolicy-table__title font-primary-semibold-13" text="Changes / Rebooking Charges" />
            <div className="FarePolicy-table__header d-flex">
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-left" text="Pax type" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="Before Departure" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="After Departure" />
              </Grid>
            </div>
            <div className="FarePolicy-table__body">
              {["Adult", "Child", "Infant"].map((item, index) =>
                <div key={index} className="data-row d-flex">
                  <Grid item xs={4}>
                    <Text className="font-primary-regular-13 text-align-left" text={item} />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={`${exchangeBefore.currency} ${exchangeBefore.amount}`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={`${exchangeAfter.currency} ${exchangeAfter.amount}`}
                    />
                  </Grid>
                </div>
              )}
            </div>
          </div>
          <div className="FarePolicy-table">
            <Text className="FarePolicy-table__title font-primary-semibold-13" text="Cancellation Charges" />
            <div className="FarePolicy-table__header d-flex">
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-left" text="Pax type" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="Before Departure" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="After Departure" />
              </Grid>
            </div>
            <div className="FarePolicy-table__body">
              {["Adult", "Child", "Infant"].map((item, index) =>
                <div key={index} className="data-row d-flex">
                  <Grid item xs={4}>
                    <Text className="font-primary-regular-13 text-align-left" text={item} />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={`${refundBefore.refundable ? "Refundable" : "Non-Refundable"}`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={`${refundAfter.refundable ? "Refundable" : "Non-Refundable"}`}
                    />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
		</div>
	);
};

export default FarePolicy;
