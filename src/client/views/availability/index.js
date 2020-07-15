import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import colors from "Constants/colors";

import FlightResults from "Components/Flights/Availability/FlightResults/index";
import FlightSummary from "Components/Flights/Availability/FlightSummary/index";
import SearchBar from "Components/Flights/SearchBar/index";

import Button from "Widgets/Button/index";
import IconWithBackground from "Widgets/IconWithBackground/index";
import Text from "Widgets/Text/index";

import "./style.scss";

const Availability = () => {
  const [showSearch, setShowSearch] = useState(true);
  
  const toggleModifySearch = () => {
    setShowSearch(true);
  };
  
  const handleCloseModifySearch = () => {
    setShowSearch(false);
  };

  return (
    <div className="Availability">
      <div className="Availability-modifySearch">
        {!showSearch ? 
          <div className="d-flex justify-content-between align-items-center">
            <FlightSummary />
            <Button secondary text="Modify Search" onClick={toggleModifySearch} />
          </div> :
          <div className="Availability-modifySearch__searchSection">
            <div className="d-flex justify-content-between">
              <Text className="modify-text font-primary-bold-20 text-uppercase" text="Modify your Search" />
              <IconWithBackground showCursor bgColor={colors.red1} onClick={handleCloseModifySearch}>
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
