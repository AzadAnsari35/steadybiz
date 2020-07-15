import React, { useState } from "react";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FlightIcon from '@material-ui/icons/Flight';
import RefreshIcon from '@material-ui/icons/Refresh';
import ShareIcon from '@material-ui/icons/Share';

import colors from "Constants/colors";

import FlightDetails from "./../FlightDetails/index";
import ArrowIcon from "Widgets/Icons/ArrowIcon";
import Button from "Widgets/Button/index";
import Dot from "Widgets/Dot/index";
import Line from "Widgets/Line/index";
import Tag from "Widgets/Tag/index";
import Text from "Widgets/Text/index";

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
    id: "fareSummary",
    name: "Fare Summary & Policy",
  },
];

const FlightItineraryCard = () => {
  const [showTabSection, setShowTabSection] = useState(false);
  const [activeFlightTab, setActiveFlightTab] = useState("flightDetails");
  const isRefundable = true;

  const toggleFlightDetails = () => {
    setShowTabSection(!showTabSection);
  }

  const handleTabClick = id => {
    setActiveFlightTab(id);
  };

  return (
    <div className="FlightItineraryCard">
      <div className="FlightItineraryCard-content">
        <div className="FlightItineraryCard-top d-flex justify-content-between">
          <div>
            <div className="FlightItineraryCard-top__leftSection">
              <div className="segmentType font-primary-medium-14 d-flex align-items-center">
                <FlightIcon className="icon" /> Outbound
              </div>
              <div className="segmentDetail d-flex align-items-center">
                <div className="airline d-flex align-items-center">
                  <div className="airline-icon"></div>
                  <Text className="airline-name font-primary-medium-14" text="Emirates Airlines" />
                </div>
                <div className="departureTime d-flex flex-direction-column">
                  <Text className="time font-primary-bold-20" text="04:35 [TRV]" />
                  <Text className="city font-primary-medium-14" text="Thiruvanthpuram" />
                </div>
                <div className="stopsInfo d-flex align-items-center">
                  <FlightIcon />
                  <div className="d-flex flex-direction-column align-items-center width-100 height-100">
                    <Text className="font-primary-medium-12" text="26h 15m (2 stops)" />
                    <div className="stops d-flex width-100 align-items-center">
                      <Line />
                      <Dot big />
                      <Line />
                      <Dot big />
                      <Line />
                      <Dot big solid />
                    </div>
                    <div className="stop-names d-flex justify-content-center width-100">
                      <Text className="font-primary-regular-12" text="HYD" />
                      <Text className="font-primary-regular-12" text="HEL" />
                    </div>
                  </div>
                </div>
                <div className="arrivalTime d-flex flex-direction-column">
                  <Text className="arrivalDate font-primary-medium-12" text="Arrives: Sun, 05-Jul" />
                  <Text className="time font-primary-bold-20" text="21:20 [JFK]" />
                  <Text className="city font-primary-medium-14" text="New York" />
                </div>
              </div>
            </div>
            <div className="FlightItineraryCard-top__leftSection">
              <div className="segmentType font-primary-medium-14 d-flex align-items-center">
                <FlightIcon className="icon" /> Return
              </div>
              <div className="segmentDetail d-flex align-items-center">
                <div className="airline d-flex align-items-center">
                  <div className="airline-icon"></div>
                  <Text className="airline-name font-primary-medium-14" text="Emirates Airlines" />
                </div>
                <div className="departureTime d-flex flex-direction-column">
                  <Text className="time font-primary-bold-20" text="19:36 [JFK]" />
                  <Text className="city font-primary-medium-14" text="New York" />
                </div>
                <div className="stopsInfo d-flex align-items-center">
                  <FlightIcon />
                  <div className="d-flex flex-direction-column align-items-center width-100 height-100">
                    <Text className="font-primary-medium-12" text="18h 15m (2 stops)" />
                    <div className="stops d-flex width-100 align-items-center">
                      <Line />
                      <Dot big />
                      <Line />
                      <Dot big />
                      <Line />
                      <Dot big solid />
                    </div>
                    <div className="stop-names d-flex justify-content-center width-100">
                      <Text className="font-primary-regular-12" text="HEL" />
                      <Text className="font-primary-regular-12" text="HYD" />
                    </div>
                  </div>
                </div>
                <div className="arrivalTime d-flex flex-direction-column">
                  <Text className="arrivalDate font-primary-medium-12" text="Arrives: Wed, 22-Jul" />
                  <Text className="time font-primary-bold-20" text="03:20 [TRV]" />
                  <Text className="city font-primary-medium-14" text="Thiruvanthpuram" />
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* <div className="FlightItineraryCard-right__seatsFareInfo d-flex align-items-center"> */}
            <div className="FlightItineraryCard-top__rightSection-seatsFareInfo d-flex align-items-center">
              <Text className="font-primary-semibold-13" text="2 seats left!" />
              <Tag text={!!isRefundable ? "Refundable" : "Non Refundable"} isSuccess={!!isRefundable} />
            </div>
            <div className="FlightItineraryCard-top__rightSection-priceSelectFlight">
              <div className="price d-flex">
                <RefreshIcon />
                <Text className="font-primary-bold-20" text="AED 10,380" />
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
            <div className="d-flex align-items-center cursor-pointer" onClick={toggleFlightDetails}>
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
            <FlightDetails />
        </div>
        </div>
      }
    </div>
  )
};

export default FlightItineraryCard;
