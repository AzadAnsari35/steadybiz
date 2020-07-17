import React from "react";
import { Grid } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import colors from "Constants/colors";
import useToggle from "Client/hooks/useToggle";

import FlightResults from "Components/Flights/Availability/FlightResults";
import FlightSummary from "Components/Flights/Availability/FlightSummary";
import SearchBar from "Components/Flights/SearchBar";

import { Button, IconWithBackground, Text } from "Widgets";

import "./style.scss";

const Availability = () => {
  const [showSearch, setShowSearch] = useToggle(false);

  return (
    <div className="Availability">
      <div className="Availability-modifySearch">
        {!showSearch ? 
          <div className="d-flex justify-content-between align-items-center">
            <FlightSummary />
            <Button secondary text="Modify Search" onClick={setShowSearch} />
          </div> :
          <div className="Availability-modifySearch__searchSection">
            <div className="d-flex justify-content-between">
              <Text className="modify-text font-primary-bold-20 text-uppercase" text="Modify your Search" />
              <IconWithBackground showCursor bgColor={colors.red1} onClick={setShowSearch}>
                <ClearIcon style={{ color: colors.red }} />
              </IconWithBackground>
            </div>
            <SearchBar />
          </div>
        }
      </div>
      <div className="Availability-mainSection">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="Availability-mainSection__resultsContainer">
              <FlightResults />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default Availability;
