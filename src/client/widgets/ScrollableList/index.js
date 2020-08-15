import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { useSelector } from "react-redux";

import { getFiltersData, getAirlineName } from 'Helpers/flight.helpers';
import colors from "Constants/colors";
import endpoint from "Config/endpoint";
import { getDataFromRedux } from "Helpers/global";

import { Image, Text } from "Widgets";

import "./style.scss";

const Airline = props => {
  const { airlineCode, airlineName, count, price, currency } = props;
  return (
    <div className="airline-container d-flex">
      <div
        className="airline-icon d-flex justify-content-center align-items-center"
        style={{ width: "46px", height: "46px", borderRadius: "4px", marginRight: "12px" }}
      >
        <Image
          altText={airlineCode}
          imgName={`${airlineCode}.png`}
          imgPath="images/airlines/newIcons"
          fallbackImgName="airlineDefault.png"
          style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
        />
      </div>
      <div className="airline-content d-flex flex-direction-column justify-content-around">
        <Text className="font-primary-semibold-12" text={airlineName} />
        {/* <Text className="font-primary-semibold-10" text={`${count} Flights`} /> */}
        <Text className="font-primary-semibold-12" text={`${currency} ${price}`} style={{ color: colors.biscay }} />
      </div>
    </div>
  )
};

const ScrollableList = props => {
  const { results, currency } = props;
  
  const masterAirlinesResponse = useSelector(
    (state) => state[endpoint.master.airlines.reducerName]
  );

  const masterAirlines =
    !!getDataFromRedux(masterAirlinesResponse) &&
    getDataFromRedux(masterAirlinesResponse).data;

  const {
    airlinesData,
  } = !!results && getFiltersData(results);
  
  
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
          {!!airlinesData &&
            Object.keys(airlinesData).map((airline, index) => {
              return (
                <Airline
                  key={index}
                  airlineCode={airline}
                  airlineName={!!masterAirlines && getAirlineName(masterAirlines, airline)}
                  count="14"
                  price={airlinesData[airline]}
                  currency={currency}
                />
              )
            })}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default ScrollableList;
