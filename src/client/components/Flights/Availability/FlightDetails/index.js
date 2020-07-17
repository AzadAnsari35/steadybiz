import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FlightIcon from '@material-ui/icons/Flight';
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import colors from "Constants/colors";
import { displayImage } from "Helpers/utils";
import { changeDateFormat, convertIntoTime, extractTime } from "Helpers/global";
import { getCabinClassName } from "Helpers/flight.helpers";

import Chip from "Widgets/Chip/index";
import DashedLine from "Widgets/DashedLine/index";
import Dot from "Widgets/Dot/index";
import Line from "Widgets/Line/index";
import Text from "Widgets/Text/index";

import "./style.scss";

const itineraryObj = {
  "flightItineraryId": 10002,
  "itinerarySourceCode": "1S",
  "itinerarySourceName": "Sabre",
  "itineraryPCC": "7MQJ",
  "flightSegments": [
    {
      "flightSegments": 1,
      "stopCount": 0,
      "flightSegmentDirection": "Outbound",
      "departureAirport": "DEL",
      "arrivalAirport": "EWR",
      "dateTime": "2020-09-01T23:35:00+05:30",
      "flightSegmentGroup": [
        {
          "bookingClass": "L",
          "cabinClass": "Y",
          "seatsAvailable": 9,
          "baggageInformation": {
            "checkInBaggage": {
              "noOfPieces": 1,
              "weight": 0,
              "unit": null,
              "description": null
            },
            "cabinBaggage": {
              "noOfPieces": 1,
              "weight": 7,
              "unit": "kg",
              "description": null
            }
          },
          "marriageGroup": "O",
          "status": null,
          "noOfPassenger": null,
          "marriageGroupInd": null,
          "marriageGroupSequence": null,
          "departureDetails": {
            "airportCode": "DEL",
            "terminal": "3",
            "airportName": "Indira Gandhi International",
            "cityCode": "DEL",
            "cityName": "New Delhi",
            "countryCode": "IN",
            "countryName": "India",
            "date": "2020-09-01",
            "time": "23:35:00+05:30"
          },
          "arrivalDetails": {
            "airportCode": "EWR",
            "airportName": "Newark Liberty International",
            "cityCode": "NYC",
            "cityName": "New York",
            "countryCode": "US",
            "countryName": "United States",
            "time": "04:55:00-04:00",
            "date": "2020-09-02",
            "day": 1,
            "terminal": "C",
            "nightFlight": null,
            "flightDuration": "14:50",
            "layOverTime": null
          },
          "airlineDetails": {
            "marketingAirline": "UA",
            "marketingFlightNumber": 83,
            "operatingAirline": "UA",
            "operatingFlightNumber": 83,
            "equipmentTypeDescription": "777"
          },
          "eticket": null
        }
      ]
    },
    {
      "flightSegments": 2,
      "stopCount": 1,
      "flightSegmentDirection": "Inbound",
      "departureAirport": "EWR",
      "arrivalAirport": "DEL",
      "dateTime": "2020-09-08T20:45:00-04:00",
      "flightSegmentGroup": [
        {
          "bookingClass": "L",
          "cabinClass": "Y",
          "seatsAvailable": 9,
          "baggageInformation": {
            "checkInBaggage": {
              "noOfPieces": 1,
              "weight": 0,
              "unit": null,
              "description": null
            },
            "cabinBaggage": {
              "noOfPieces": 1,
              "weight": 7,
              "unit": "kg",
              "description": null
            }
          },
          "marriageGroup": "O",
          "status": null,
          "noOfPassenger": null,
          "marriageGroupInd": null,
          "marriageGroupSequence": null,
          "departureDetails": {
            "airportCode": "EWR",
            "terminal": "B",
            "airportName": "Newark Liberty International",
            "cityCode": "NYC",
            "cityName": "New York",
            "countryCode": "US",
            "countryName": "United States",
            "date": "2020-09-08",
            "time": "20:45:00-04:00"
          },
          "arrivalDetails": {
            "airportCode": "MUC",
            "airportName": "Franz Josef Strauss",
            "cityCode": "MUC",
            "cityName": "Munich",
            "countryCode": "DE",
            "countryName": "Germany",
            "time": "10:25:00+02:00",
            "date": "2020-09-09",
            "day": 1,
            "terminal": "2",
            "nightFlight": null,
            "flightDuration": "7:40",
            "layOverTime": "1:45"
          },
          "airlineDetails": {
            "marketingAirline": "LH",
            "marketingFlightNumber": 413,
            "operatingAirline": "LH",
            "operatingFlightNumber": 413,
            "equipmentTypeDescription": "359"
          },
          "eticket": null
        },
        {
          "bookingClass": "L",
          "cabinClass": "Y",
          "seatsAvailable": 9,
          "baggageInformation": {
            "checkInBaggage": {
              "noOfPieces": 1,
              "weight": 0,
              "unit": null,
              "description": null
            },
            "cabinBaggage": {
              "noOfPieces": 1,
              "weight": 7,
              "unit": "kg",
              "description": null
            }
          },
          "marriageGroup": "I",
          "status": null,
          "noOfPassenger": null,
          "marriageGroupInd": null,
          "marriageGroupSequence": null,
          "departureDetails": {
            "airportCode": "MUC",
            "terminal": "2",
            "airportName": "Franz Josef Strauss",
            "cityCode": "MUC",
            "cityName": "Munich",
            "countryCode": "DE",
            "countryName": "Germany",
            "date": "2020-09-09",
            "time": "12:10:00+02:00"
          },
          "arrivalDetails": {
            "airportCode": "DEL",
            "airportName": "Indira Gandhi International",
            "cityCode": "DEL",
            "cityName": "New Delhi",
            "countryCode": "IN",
            "countryName": "India",
            "time": "23:15:00+05:30",
            "date": "2020-09-09",
            "day": 0,
            "terminal": "3",
            "nightFlight": null,
            "flightDuration": "7:35",
            "layOverTime": null
          },
          "airlineDetails": {
            "marketingAirline": "LH",
            "marketingFlightNumber": 762,
            "operatingAirline": "LH",
            "operatingFlightNumber": 762,
            "equipmentTypeDescription": "359"
          },
          "eticket": null
        }
      ]
    }
  ],
  "totalfareDetails": {
    "fareDetails": [
      {
        "ptc": "ADT",
        "count": 1,
        "baseFare": 1740,
        "currenyCode": "AED",
        "penalties": [
          {
            "type": "Exchange",
            "applicability": "Before",
            "changeable": true,
            "refundable": null,
            "amount": 789,
            "currency": "AED",
            "cat16Info": null,
            "conditionsApply": true
          },
          {
            "type": "Exchange",
            "applicability": "After",
            "changeable": true,
            "refundable": null,
            "amount": 623,
            "currency": "AED",
            "cat16Info": null,
            "conditionsApply": true
          },
          {
            "type": "Refund",
            "applicability": "Before",
            "changeable": null,
            "refundable": true,
            "amount": 1580,
            "currency": "AED",
            "cat16Info": true,
            "conditionsApply": null
          },
          {
            "type": "Refund",
            "applicability": "After",
            "changeable": null,
            "refundable": true,
            "amount": 1580,
            "currency": "AED",
            "cat16Info": true,
            "conditionsApply": null
          }
        ],
        "fareBasisCode": [
          "LRCAAW",
          "LRCAAW"
        ],
        "taxDetails": [
          {
            "taxcode": "K38",
            "taxdescription": "GOODS AND SERVICE TAX INTERIM DOMESTIC AND INTERNATIONAL",
            "taxAmount": 80,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YQF",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED FUEL",
            "taxAmount": 890,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YRF",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED FUEL",
            "taxAmount": 310,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YC",
            "taxdescription": "CUSTOMS USER FEE",
            "taxAmount": 30,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "CH",
            "taxdescription": "AIRPORT PASSENGER SECURITY AND NOISE CHARGE",
            "taxAmount": 70,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YRF",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED FUEL",
            "taxAmount": 280,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YQI",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED MISC",
            "taxAmount": 70,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YQI",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED MISC",
            "taxAmount": 20,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "YQI",
            "taxdescription": "SERVICE FEE - CARRIER-IMPOSED MISC",
            "taxAmount": 20,
            "taxCurrency": "AED"
          },
          {
            "taxcode": "TR",
            "taxdescription": "AIRPORT SERVICE CHARGE INTERNATIONAL",
            "taxAmount": 30,
            "taxCurrency": "AED"
          }
        ]
      }
    ],
    "baseFareTotal": 1740,
    "taxTotal": 2340,
    "localTaxPercentage": 0,
    "localTaxAmount": 0,
    "totalAmount": 4080,
    "totalAmountCurrency": "AED",
    "fareBasisCode": "LRCAAW",
    "fareRule": null,
    "fareCategory": null,
    "fareRefundable": true,
    "fareRules": null,
    "cabinClassCode": null,
    "cabinClassName": null,
    "seatsAvailable": null,
    "dealCode": null,
    "commissionPercentage": 0,
    "commissionAmount": 0
  }
};

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
        borderRight: !!showBorder ? `1px solid ${colors.$codGray}` : "none",
        paddingLeft: !!leftPadding ? "8px" : "0",
        minHeight: minHeight,
      }}
      text={text}
    />
  );
};

const FlightSegmentGroup = (props) => {
  const { segmentGroupArray, index, fareBasisCode } = props;
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
                style={{ borderLeft: `1px solid ${colors.$codGray}` }}
                text={changeDateFormat(
                  segmentGroupArray[index].departureDetails.date
                )}
              />
            )}
          </div>
        </div>
        <div className="FlightSegmentGroup-right__flightInformation">
          <div className="flight-info d-flex align-items-center">
            <img
              src=""
              className="airline-icon"
            />
            <AirlineText
              showBorder
              text="United Airline"
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
                style={{ borderLeft: `1px solid ${colors.$codGray}` }}
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
          <FlightIcon style={{ transform: "rotate(180deg)" }} />
          <Text
            className="font-primary-medium-16"
            text={
              itinerary[0].flightSegmentGroup[totalSegmentGroup - 1].arrivalDetails.cityName
            }
          />
        </Chip>
        <div className="FlightSegment-content d-flex flex-direction-column">
          <Text
            className="FlightSegment-content__date font-primary-bold-18"
            text={`Depart: ${changeDateFormat(
              itinerary[0].flightSegmentGroup[0].departureDetails.date
            )}`}
          />
          <div
            className="FlightSegment-content__segmentGroup"
            style={{
              borderRight: isInboundFound ? `1px solid ${colors.alto}` : "none",
            }}
          >
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

const FlightDetails = () => {
  // const { itineraryObj } = props;
  const checkInboundItinerary = () => {
    if(isInboundFound) {
      return <FlightSegment fareBasisCode={fareBasisCode} itinerary={returnItinerary("Inbound")} />;
    }
  };
      
  const returnItinerary= type => {
    const data = itineraryObj.flightSegments.filter(element => element.flightSegmentDirection === type);
    return data;
  };
  const outbound=returnItinerary("Outbound");
  const isInboundFound = itineraryObj.flightSegments.some(element => element.flightSegmentDirection === "Inbound");
  const fareBasisCode = itineraryObj.totalfareDetails.fareBasisCode;

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
