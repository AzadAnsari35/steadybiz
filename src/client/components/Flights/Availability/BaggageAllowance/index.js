import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import FlightIcon from '@material-ui/icons/Flight';

import { getAirlineName } from "Helpers/flight.helpers";
import { getDataFromRedux } from "Helpers/global";
import endpoint from "Config/endpoint";

import { Chip, Image, Text } from "Widgets";

import "./style.scss";

const BaggageAllowance = props => {
  const { itinerary, passengersType } = props;
  const masterAirlinesResponse = useSelector(
    (state) => state[endpoint.master.airlines.reducerName]
  );

  const masterAirlines =
    !!getDataFromRedux(masterAirlinesResponse) &&
    getDataFromRedux(masterAirlinesResponse).data;

  return (
    <div className="BaggageAllowance d-flex">
      {itinerary.flightSegments.map((segment, index) =>
        <Grid key={index} item xs={12} md={6}>
          <div className="d-flex flex-direction-column align-items-start height-100">
            <Chip className="BaggageAllowance-sector">
              <Text
                className="font-primary-medium-16"
                text={segment.flightSegmentGroup[0].departureDetails.cityName}
              />
              <FlightIcon style={{ transform: "rotate(90deg)" }} />
              <Text
                className="font-primary-medium-16"
                text={segment.flightSegmentGroup[segment.flightSegmentGroup.length - 1].arrivalDetails.cityName}
              />
            </Chip>
            <div className={`BaggageAllowance-content height-100 ${itinerary.flightSegments.length === 1 ? "no-border" : ""} `}>
              <div className="BaggageAllowance-airline d-inline-flex align-items-center">
                <div className="BaggageAllowance-airline__icon d-flex justify-content-center align-items-center">
                  <Image
                    altText={segment.flightSegmentGroup[0].airlineDetails.marketingAirline}
                    imgName={`${segment.flightSegmentGroup[0].airlineDetails.marketingAirline}.png`}
                    imgPath="images/airlines/newIcons"
                    fallbackImgName="airlineDefault.png"
                    style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
                  />
                </div>
                <div className="BaggageAllowance-airline__name">
                  <Text
                    className="font-primary-medium-16"
                    text={!!masterAirlines &&
                      getAirlineName(masterAirlines, segment.flightSegmentGroup[0].airlineDetails.marketingAirline)
                    }
                  />
                  <Text
                    className="font-primary-regular-15"
                    text={`${segment.flightSegmentGroup[0].airlineDetails.marketingAirline} ${
                      segment.flightSegmentGroup[0].airlineDetails.marketingFlightNumber}`}
                  />
                </div>
              </div>
              {segment.flightSegmentGroup.map((flightSegment, index) =>
                <div className="BaggageAllowance-segment">
                  <div className="BaggageAllowance-segment__header d-flex">
                    <Grid item xs={6}>
                      <Text
                        className="font-primary-semibold-14 segment d-inline"
                        text={`${flightSegment.departureDetails.airportCode} - ${flightSegment.arrivalDetails.airportCode}`}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Text className="font-primary-semibold-14 text-uppercase text-align-center" text="Check In" />
                    </Grid>
                    <Grid item xs={3}>
                      <Text className="font-primary-semibold-14 text-uppercase text-align-center" text="Cabin" />
                    </Grid>
                  </div>
                  <div className="BaggageAllowance-segment__body">
                    {passengersType.map((item, index) =>
                      <div key={index} className="data-row d-flex">
                        <Grid item xs={6}>
                          <Text className="font-primary-regular-12 segment d-inline" text={item} />
                        </Grid>
                        {!!flightSegment.baggageInformation &&
                          <>
                            {!!flightSegment.baggageInformation.checkInBaggage &&
                              <Grid item xs={3}>
                                <Text
                                  className="font-primary-regular-12 text-uppercase text-align-center"
                                  text={
                                    index < 2
                                    ? flightSegment.baggageInformation.checkInBaggage.noOfPieces
                                      ? `${flightSegment.baggageInformation.checkInBaggage.noOfPieces} Pieces`
                                      : `${flightSegment.baggageInformation.checkInBaggage.weight} KG`
                                    : "NA"
                                  }
                                />
                              </Grid>
                            }
                            {!!flightSegment.baggageInformation.cabinBaggage &&
                              <Grid item xs={3}>
                                <Text
                                  className="font-primary-regular-12 text-uppercase text-align-center"
                                  text={
                                    index < 2
                                    ? `${flightSegment.baggageInformation.cabinBaggage.weight} KG`
                                    : "NA"
                                  }
                                />
                              </Grid>
                            }
                          </>
                        }
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
      )}
    </div>
  )
};

export default BaggageAllowance;
