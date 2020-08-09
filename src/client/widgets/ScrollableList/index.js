import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import FlightIcon from "@material-ui/icons/Flight";

import colors from "Constants/colors";

import { Text } from "Widgets";

import "./style.scss";

const Airline = props => {
  const { airlineName, count, price, currency } = props;
  return (
    <div className="airline-container d-flex">
      <div
        className="airline-icon d-flex justify-content-center align-items-center"
        style={{ width: "46px", height: "46px", borderRadius: "4px", backgroundColor: colors.gray, marginRight: "12px" }}
      >
        <FlightIcon
          style={{ transform: "rotate(90deg)", color: colors.white }}
        />
      </div>
      <div className="airline-content d-flex flex-direction-column">
        <Text className="font-primary-semibold-12" text={airlineName} />
        <Text className="font-primary-semibold-10" text={`${count} Flights`} />
        <Text className="font-primary-semibold-12" text={`${currency} ${price}`} style={{ color: colors.biscay }} />
      </div>
    </div>
  )
};

const ScrollableList = () => {
  return (
    <div className="ScrollableList d-flex justify-content-center">
      <AppBar position="static" color="default">
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Airline airlineName="Lufhtansa" count="10" price="4,000" currency="AED" />
          <Airline airlineName="Air Asia" count="10" price="4,500" currency="AED" />
          <Airline airlineName="American Airlines" count="04" price="5,000" currency="AED" />
          <Airline airlineName="Air Lingus" count="08" price="5,500" currency="AED" />
          <Airline airlineName="KLM" count="15" price="6,000" currency="AED" />
          <Airline airlineName="Emirates" count="09" price="6,600" currency="AED" />
          <Airline airlineName="Etihad" count="14" price="7,000" currency="AED" />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default ScrollableList;
