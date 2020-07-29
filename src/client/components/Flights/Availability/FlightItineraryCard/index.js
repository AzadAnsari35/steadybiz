import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FlightIcon from '@material-ui/icons/Flight';
import RefreshIcon from '@material-ui/icons/Refresh';
import ShareIcon from '@material-ui/icons/Share';

import colors from "Constants/colors";
import useToggle from "Hooks/useToggle";
import {
  checkIsFareRefundable,
  getTotalItineraryFareAndCurrency,
  getFlightSegmentByType,
  getAirlineDetails,
  getDepartureSegmentDetails,
  getArrivalSegmentDetails,
  getTotalFlightDuration,
  getAirlineName,
} from "Helpers/flight.helpers";
import { applyCommaToPrice, extractTime, checkDataStatus, getDataFromRedux } from "Helpers/global";
import { displayImage } from "Helpers/utils";

import FlightDetails from "Components/Flights/Availability/FlightDetails";
import BaggageAllowance from "Components/Flights/Availability/BaggageAllowance";
import FareSummaryAndPolicy from "Components/Flights/Availability/FareSummaryAndPolicy";
import { ArrowIcon, Button, Dot, Image, Line, Tag, Text } from "Widgets";

import "./style.scss";

const flightDetailsTabs = [
  {
    id: "flightDetails",
    name: "Flight Details",
  },
  {
    id: "baggageAllowance",
    name: "Baggage Allowance",
  },
  {
    id: "fareSummaryAndPolicy",
    name: "Fare Summary & Policy",
  },
];

const FlightItineraryCard = props => {
  const { itinerary } = props;
  const [activeFlightTab, setActiveFlightTab] = useState("flightDetails");
  const [showTabSection, setShowTabSection] = useToggle(false);

  const masterAirlinesResponse = useSelector(state => state.masterAirlines);
  
  const isFareRefundable = checkIsFareRefundable(itinerary);
  const { currency, totalAmount } = getTotalItineraryFareAndCurrency(itinerary);

  const outboundFlightSegment = getFlightSegmentByType(itinerary, "Outbound");
  const inboundFlightSegment = getFlightSegmentByType(itinerary, "Inbound");

  const outboundAirlineDetails = getAirlineDetails(outboundFlightSegment);
  const inboundAirlineDetails = getAirlineDetails(inboundFlightSegment);

  const outboundDepartureDetails = getDepartureSegmentDetails(outboundFlightSegment);
  const outboundArrivalDetails = getArrivalSegmentDetails(outboundFlightSegment);

  const inboundDepartureDetails = getDepartureSegmentDetails(inboundFlightSegment);
  const inboundArrivalDetails = getArrivalSegmentDetails(inboundFlightSegment);

  const seatsLeft = Math.min.apply(Math, itinerary.flightSegments.map(segment =>
      Math.max.apply(Math, segment.flightSegmentGroup.map(obj => obj.seatsAvailable))
    ));

  const totalFlightDuration = getTotalFlightDuration(outboundFlightSegment);

  const handleTabClick = id => setActiveFlightTab(id);

  const airlines = checkDataStatus(masterAirlinesResponse) && getDataFromRedux(masterAirlinesResponse).data;

  return (
    <div className="FlightItineraryCard">
      <div className="FlightItineraryCard-content">
        <div className="FlightItineraryCard-top d-flex justify-content-between">
          <div>
            {/* LOGIC TO CHECK FLIGHT SEGMENTS LENGTH */}
            {itinerary && itinerary.flightSegments && itinerary.flightSegments.map((segment, index) =>
              <div key={index} className="FlightItineraryCard-top__leftSection">
                <div className="segmentType font-primary-medium-14 d-flex align-items-center">
                  <FlightIcon className="icon" />{index === 0 ? "Outbound" : "Return"}
                </div>
                <div className="segmentDetail d-flex align-items-center">
                  <div className="airline d-flex align-items-center">
                    <div className="airline-icon">
                      <Image
                        altText={
                          index === 0
                          ? outboundAirlineDetails.marketingAirline
                          : inboundAirlineDetails.marketingAirline
                        }
                        imgName={`${
                          index === 0
                          ? outboundAirlineDetails.marketingAirline
                          : inboundAirlineDetails.marketingAirline
                        }.png`}
                        imgPath="images/airlines/bigicons"
                        fallbackImgName="airline default.png"
                      />
                    </div>
                    <Text
                      className="airline-name font-primary-medium-14"
                      text={
                        index === 0
                        ? !!airlines && getAirlineName(airlines, outboundAirlineDetails.marketingAirline)
                        : !!airlines && getAirlineName(airlines, inboundAirlineDetails.marketingAirline)
                      }
                    />
                  </div>
                  <div className="departureTime d-flex flex-direction-column">
                    <Text
                      className="time font-primary-semibold-20"
                      text={`${
                        index === 0
                          ? extractTime(outboundDepartureDetails.time)
                          : extractTime(inboundDepartureDetails.time)
                      } [${
                        index === 0
                          ? outboundDepartureDetails.airportCode
                          : inboundDepartureDetails.airportCode
                        }]`
                      }
                    />
                    <Text
                      className="city font-primary-medium-14"
                      text={`${index === 0 ? outboundDepartureDetails.cityName : inboundDepartureDetails.cityName}`}
                    />
                  </div>
                  <div className="stopsInfo d-flex align-items-center">
                    <FlightIcon />
                    <div className="d-flex flex-direction-column align-items-center width-100 height-100">
                      <Text
                        className="font-primary-medium-12"
                        text={`${totalFlightDuration} ${
                          index === 0
                          ? outboundFlightSegment.stopCount > 0
                            ? `(${outboundFlightSegment.stopCount} stop${outboundFlightSegment.stopCount > 1 ? "s" : ""})`
                            : ""
                          : inboundFlightSegment.stopCount > 0
                            ? `(${inboundFlightSegment.stopCount} stop${outboundFlightSegment.stopCount > 1 ? "s" : ""})`
                            : ""
                        }`}
                      />
                      <div className="stops d-flex width-100 align-items-center">
                        <Line />
                        {index === 0
                          ? outboundFlightSegment.stopCount > 0 &&
                            Array(outboundFlightSegment.stopCount).fill(null).map((item, index) => (
                            <Fragment key={index}>
                              <Dot big />
                              <Line />
                            </Fragment>
                          ))
                          : inboundFlightSegment.stopCount > 0 &&
                            Array(inboundFlightSegment.stopCount).fill(null).map((item, index) => (
                            <Fragment key={index}>
                              <Dot big />
                              <Line />
                            </Fragment>
                          ))
                        }
                        <Dot big solid />
                      </div>
                      <div className="stop-names d-flex justify-content-center width-100">
                        {index === 0 ?
                          outboundFlightSegment.stopCount > 0 &&
                          outboundFlightSegment.flightSegmentGroup.map((flightSegment, index) => {
                            if (index < outboundFlightSegment.stopCount) {
                              return (
                                <Text
                                  key={index}
                                  className="font-primary-regular-12"
                                  text={flightSegment.arrivalDetails.airportCode}
                                  style={{
                                    left: outboundFlightSegment.stopCount === 1
                                      && "-4px"
                                  }}
                                />
                              )
                            }
                          })
                          : inboundFlightSegment.stopCount > 0 &&
                            inboundFlightSegment.flightSegmentGroup.map((flightSegment, index) => {
                            if (index < inboundFlightSegment.stopCount) {
                              return (
                                <Text
                                  key={index}
                                  className="font-primary-regular-12"
                                  text={flightSegment.arrivalDetails.airportCode}
                                  style={{
                                    left: inboundFlightSegment.stopCount === 1
                                      && "-4px"
                                  }}
                                />
                              )
                            }
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="arrivalTime d-flex flex-direction-column">
                    <Text
                      className="arrivalDate font-primary-medium-12"
                      text={`Arrives: ${
                        index === 0
                        ? moment(outboundArrivalDetails.date).format("ddd, DD-MMM")
                        : moment(inboundArrivalDetails.date).format("ddd, DD-MMM")
                      }`}
                    />
                    <Text
                      className="time font-primary-semibold-20"
                      text={`${
                        index === 0
                          ? extractTime(outboundArrivalDetails.time)
                          : extractTime(inboundArrivalDetails.time)
                      } [${
                        index === 0
                          ? outboundArrivalDetails.airportCode
                          : inboundArrivalDetails.airportCode
                        }]`
                      }
                    />
                    <Text
                      className="city font-primary-medium-14"
                      text={`${index === 0 ? outboundArrivalDetails.cityName : inboundArrivalDetails.cityName}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex align-items-center">
            <div className="FlightItineraryCard-top__rightSection-seatsFareInfo d-flex align-items-center">
              <Text className="font-primary-semibold-13" text={`${seatsLeft} seats left!`} />
              <Tag text={!!isFareRefundable ? "Refundable" : "Non Refundable"} isSuccess={!!isFareRefundable} />
            </div>
            <div className="FlightItineraryCard-top__rightSection-priceSelectFlight d-flex flex-direction-column justify-content-end">
              <div className="price d-flex justify-content-end">
                <RefreshIcon />
                <Text className="font-primary-bold-20" text={`${currency} ${applyCommaToPrice(totalAmount)}`} />
              </div>
              <Button text="select flight" />
            </div>
          </div>
        </div>
        <div className="FlightItineraryCard-bottom d-flex justify-content-between">
          <div className="FlightItineraryCard-bottom__leftAction d-flex align-items-center cursor-pointer">
            <AccountBalanceWalletIcon />
            <Text className="font-primary-medium-14" text="Agency Info" />
          </div>
          <div className="FlightItineraryCard-bottom__rightAction d-flex">
            <div className="d-flex align-items-center cursor-pointer">
              <ShareIcon />
              <Text className="font-primary-medium-14" text="Quote" />
            </div>
            <div className="d-flex align-items-center cursor-pointer" onClick={setShowTabSection}>
              <Text className="font-primary-medium-14" text="Flight Details" />
              <ArrowIcon size={12} color={colors.gray} orientation={90} />
            </div>
          </div>
        </div>
      </div>
      {showTabSection &&
        <div className="FlightItineraryCard-flightDetails">
          <div className="FlightItineraryCard-flightDetails__tabs d-flex">
            {flightDetailsTabs.map(tab =>
              <div
                key={tab.id}
                className={`tab ${activeFlightTab === tab.id ? "active" : ""} cursor-pointer`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Text className="font-primary-medium-14" text={tab.name} />
              </div>
            )}
          </div>
          <div className="FlightItineraryCard-flightDetails__content">
            {activeFlightTab === "flightDetails" &&
              <FlightDetails itinerary={itinerary} />
            }
            {activeFlightTab === "baggageAllowance" &&
              <BaggageAllowance itinerary={itinerary} />
            }
            {activeFlightTab === "fareSummaryAndPolicy" &&
              <FareSummaryAndPolicy itinerary={itinerary} />
            }
          </div>
        </div>
      }
    </div>
  )
};

export default FlightItineraryCard;
