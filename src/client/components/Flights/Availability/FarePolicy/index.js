import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";

import { Text } from "Widgets";

import "./style.scss";

const FarePolicy = (props) => {
  const { outboundItinerary, passengersType } = props;
  const { penalties } = outboundItinerary.totalfareDetails.fareDetails[0];
  const exchangeBefore = penalties.find(penalty => 
    penalty.type === "Exchange" && penalty.applicability === "Before");
  const exchangeAfter = penalties.find(penalty => 
    penalty.type === "Exchange" && penalty.applicability === "After");
  const refundBefore = penalties.find(penalty => 
    penalty.type === "Refund" && penalty.applicability === "Before");
  const refundAfter = penalties.find(penalty => 
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
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="Before Depart" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="After Depart" />
              </Grid>
            </div>
            <div className="FarePolicy-table__body">
              {passengersType.map((item, index) =>
                <div key={index} className="data-row d-flex">
                  <Grid item xs={4}>
                    <Text className="font-primary-regular-13 text-align-left" text={item} />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={!!exchangeBefore.currency && !!exchangeBefore.amount
                        ? `${exchangeBefore.currency} ${exchangeBefore.amount}`
                        : "N/A"
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Text
                      className="font-primary-regular-13 text-align-center"
                      text={!!exchangeAfter.currency && !!exchangeAfter.amount
                        ? `${exchangeAfter.currency} ${exchangeAfter.amount}`
                        : "N/A"
                      }
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
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="Before Depart" />
              </Grid>
              <Grid item xs={4}>
                <Text className="font-primary-medium-13 text-uppercase text-align-center" text="After Depart" />
              </Grid>
            </div>
            <div className="FarePolicy-table__body">
              {passengersType.map((item, index) =>
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
