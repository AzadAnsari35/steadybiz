import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FlightIcon from '@material-ui/icons/Flight';
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import colors from "Constants/colors";
import { displayImage } from "Helpers/utils";
import { changeDateFormat, convertIntoTime, extractTime, getDataFromRedux } from "Helpers/global";
import { getCabinClassName, getAirlineName } from "Helpers/flight.helpers";
import endpoint from "Config/endpoint";

import Chip from "Widgets/Chip/index";
import DashedLine from "Widgets/DashedLine/index";
import Dot from "Widgets/Dot/index";
import Line from "Widgets/Line/index";
import Text from "Widgets/Text/index";

import "./style.scss";

const FlightLayover = (layoverDuration) => {  
  return (
    <div className="FlightLayover d-flex">
      <div className="d-flex flex-direction-column align-items-center">
        <DashedLine />
      </div>
      <Chip
        isBordered
        style={{
          margin: "40px 0",
        }}
      >
        <Text className="font-primary-medium-14" text={`Layover time : ${convertIntoTime(layoverDuration.layoverDuration)}`} />
      </Chip>
    </div>
  )
};

const AirlineText = (props) => {
  const { showBorder, leftPadding, text, minHeight } = props;

  return (
    <Text
      className="airline-text font-primary-regular-16"
      style={{
        borderRight: !!showBorder ? `1px solid ${colors.gray}` : "none",
        paddingLeft: !!leftPadding ? "8px" : "0",
        minHeight: minHeight,
      }}
      text={text}
    />
  );
};

const FlightSegmentGroup = (props) => {
  const { segmentGroupArray, index, fareBasisCode } = props;
  const masterAirlinesResponse = useSelector(
    (state) => state[endpoint.master.airlines.reducerName]
  );

  const masterAirlines =
    !!getDataFromRedux(masterAirlinesResponse) &&
    getDataFromRedux(masterAirlinesResponse).data;

  return (
    <div className="FlightSegmentGroup d-flex">
      <div className="FlightSegmentGroup-left d-flex flex-direction-column justify-content-between">
        <div>
          <Text
            className="font-primary-bold-16"
            text={segmentGroupArray[index].departureDetails.airportCode}
          />
          <Text
            className="font-primary-bold-16"
            text={extractTime(segmentGroupArray[index].departureDetails.time)}
          />
        </div>
        <div className="d-flex flex-direction-column align-items-center">
          <AccessTimeIcon
            style={{ color: colors.black5, width: "16px", height: "16px" }}
          />
          <Text
            className="font-primary-regular-16"
            style={{ opacity: "0.5" }}
            text={extractTime(
              segmentGroupArray[index].arrivalDetails.flightDuration
            )}
          />
        </div>
        <div>
          <Text
            className="font-primary-bold-16"
            text={segmentGroupArray[index].arrivalDetails.airportCode}
          />
          <Text
            className="font-primary-bold-16"
            text={extractTime(segmentGroupArray[index].arrivalDetails.time)}
          />
        </div>
      </div>
      <div className="FlightSegmentGroup-middle d-flex flex-direction-column align-items-center">
        {index > 0 ? (
          <div className="FlightSegmentGroup-middle__dotContainer d-flex justify-content-center align-items-center">
            <Dot big />
          </div>
        ) : (
          <FlightIcon style={{ height: "20px", width: "20px", transform: "rotate(180deg)" }} />
        )}
        <Line vertical adjustTop={index > 0} />
        {!!segmentGroupArray && segmentGroupArray.length - 1 === index ? (
          <Dot big solid />
        ) : (
          <Dot big />
        )}
      </div>
      <div className="FlightSegmentGroup-right">
        <div>
          <Text
            className="font-primary-bold-16"
            text={segmentGroupArray[index].departureDetails.airportName}
          />
          <div className="d-flex">
            <Text
              className="font-primary-regular-14 pr-8"
              text={
                segmentGroupArray[index].departureDetails.terminal
                  ? `Terminal ${segmentGroupArray[index].departureDetails.terminal}`
                  : "Terminal"
              }
            />
            {segmentGroupArray && index !== 0 && (
              <Text
                className="font-primary-regular-14 pl-8"
                style={{ borderLeft: `1px solid ${colors.gray}` }}
                text={changeDateFormat(
                  segmentGroupArray[index].departureDetails.date
                )}
              />
            )}
          </div>
        </div>
        <div className="FlightSegmentGroup-right__flightInformation">
          <div className="flight-info d-flex align-items-center">
            {/* <img
              src=""
              className="airline-icon"
            /> */}
            <FlightIcon className="airline-icon" style={{ transform: "rotate(90deg)" }} />
            <AirlineText
              showBorder
              text={!!masterAirlines && getAirlineName(masterAirlines, segmentGroupArray[index].airlineDetails.marketingAirline)}
            />
            <AirlineText
              leftPadding
              text={` ${segmentGroupArray[index].airlineDetails.marketingAirline}${segmentGroupArray[index].airlineDetails.marketingFlightNumber}`}
            />
          </div>
          <div className="flight-info d-flex align-items-center">
            <AirlineText
              showBorder
              text={getCabinClassName(segmentGroupArray[index].cabinClass)}
            />
            <AirlineText
              leftPadding
              showBorder
              text={`${segmentGroupArray[index].bookingClass}`}
            />
            <AirlineText leftPadding showBorder text={`${fareBasisCode}`} />
            <AirlineText
              leftPadding
              text={
                segmentGroupArray[index].airlineDetails.equipmentTypeDescription
              }
            />
          </div>
          <div>
            {/* Add operating Airline logic for text */}
            <AirlineText
              text={
                segmentGroupArray[index].airlineDetails.marketingAirline !==
                  segmentGroupArray[index].airlineDetails.operatingAirline &&
                `Operated by ${segmentGroupArray[index].airlineDetails.operatingAirline}`
              }
            />
          </div>
        </div>
        <div
          style={{
            minHeight: `calc(102px +  ${
              segmentGroupArray[index].airlineDetails.marketingAirline !==
              segmentGroupArray[index].airlineDetails.operatingAirline
                ? "0px"
                : "25px"
            })`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="FlightSegmentGroup-right__baggageDetails">
            {!!segmentGroupArray[0].baggageInformation && !!segmentGroupArray[0].baggageInformation.checkInBaggage &&
            <div className="checkin d-flex align-items-center">
              <Text
                className="font-primary-regular-14 mr-10"
                style={{
                  opacity: "0.5",
                  minWidth: "80px",
                }}
                text="Check In"
              />
              <img
                alt="checkin baggage"
                src={displayImage("checkin-baggage-black.svg")}
                width={24}
                height={24}
                className="mr-10"
              />
              <AirlineText
                className="font-primary-regular-14"
                text={
                  segmentGroupArray[0].baggageInformation.checkInBaggage
                    .noOfPieces
                    ? `${segmentGroupArray[0].baggageInformation.checkInBaggage.noOfPieces} Pieces / Person`
                    : `${segmentGroupArray[0].baggageInformation.checkInBaggage.weight} kg / Person`
                }
              />
            </div>
            }
            {!!segmentGroupArray[0].baggageInformation && !!segmentGroupArray[0].baggageInformation.cabinBaggage.weight &&
              <div className="cabin d-flex align-items-center">
                <Text
                  className="font-primary-regular-14 mr-10"
                  style={{
                    opacity: "0.5",
                    minWidth: "80px",
                  }}
                  text="Cabin"
                />
                <WorkOutlineIcon
                  style={{ width: "24px", height: "24px", marginRight: "10px" }}
                />
                <Text
                  className="font-primary-regular-14"
                  text={`${segmentGroupArray[0].baggageInformation.cabinBaggage.weight} kg / Person`}
                />
              </div>
            }
          </div>
        </div>
        <div>
          <Text
            className="font-primary-bold-16"
            text={segmentGroupArray[0].arrivalDetails.airportName}
          />
          <div className="d-flex">
            <Text
              className="font-primary-regular-14 pr-8"
              text={segmentGroupArray[0].arrivalDetails.terminal
                ? `Terminal ${segmentGroupArray[0].arrivalDetails.terminal}`
                : "Terminal"
              }
            />

            {segmentGroupArray && segmentGroupArray.length - 1 !== index && (
              <Text
                className="font-primary-regular-14 pl-8"
                style={{ borderLeft: `1px solid ${colors.gray}` }}
                text={changeDateFormat(
                  segmentGroupArray[index].arrivalDetails.date
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FlightSegment = (props) => {
  const { fareBasisCode = "", isInboundFound = false, itinerary = [] } = props;
  const totalSegmentGroup = itinerary[0].flightSegmentGroup.length;

  return (
    <Grid item xs={12} md={6}>
      <div className="FlightSegment d-flex flex-direction-column align-items-start">
        <Chip className="FlightSegment-segment">
          <Text
            className="font-primary-medium-16"
            text={itinerary[0].flightSegmentGroup[0].departureDetails.cityName}
          />
          <FlightIcon style={{ transform: "rotate(90deg)" }} />
          <Text
            className="font-primary-medium-16"
            text={
              itinerary[0].flightSegmentGroup[totalSegmentGroup - 1].arrivalDetails.cityName
            }
          />
        </Chip>
        <div
          className="FlightSegment-content d-flex flex-direction-column"
          style={{
            borderRight: isInboundFound ? `1px solid ${colors.alto}` : "none",
          }}
        >
          <Text
            className="FlightSegment-content__date font-primary-bold-18"
            text={`Depart: ${changeDateFormat(
              itinerary[0].flightSegmentGroup[0].departureDetails.date
            )}`}
          />
          <div className="FlightSegment-content__segmentGroup">
            {itinerary[0].flightSegmentGroup.map((item, index, arr) => (
              <Fragment key={index}>
                <FlightSegmentGroup
                  index={index}
                  segmentGroupArray={arr}
                  fareBasisCode={fareBasisCode}
                />

                {arr.length - 1 !== index && (
                  <FlightLayover
                    layoverDuration={item.arrivalDetails.layOverTime}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Text
            className="FlightSegment-content__date font-primary-bold-18"
            text={`Arrive: ${changeDateFormat(
              itinerary[0].flightSegmentGroup[totalSegmentGroup - 1]
                .arrivalDetails.date
            )}`}
          />
        </div>
      </div>
    </Grid>
  );
};

const FlightDetails = props => {
  const { itinerary } = props;
  const checkInboundItinerary = () => {
    if(isInboundFound) {
      return <FlightSegment fareBasisCode={fareBasisCode} itinerary={returnItinerary("Inbound")} />;
    }
  };
      
  const returnItinerary = type => {
    const data = itinerary.flightSegments.filter(element => element.flightSegmentDirection === type);
    return data;
  };
  const outbound=returnItinerary("Outbound");
  const isInboundFound = itinerary.flightSegments.some(element => element.flightSegmentDirection === "Inbound");
  const fareBasisCode = itinerary.totalfareDetails.fareBasisCode;

  return (
    <div className="FlightDetails">
      <Grid container>
        <FlightSegment itinerary={outbound} isInboundFound={isInboundFound} fareBasisCode={fareBasisCode}  />
        {checkInboundItinerary()}
      </Grid>
    </div>
  )
};

export default FlightDetails;
