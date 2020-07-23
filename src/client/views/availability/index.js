import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SwapVertIcon from '@material-ui/icons/SwapVert';

import colors from "Constants/colors";
import useToggle from "Hooks/useToggle";
import { commonAction } from "Actions";
import endpoint from 'Config/endpoint';

import Filters from "Components/Flights/Availability/Filters";
import FlightResults from "Components/Flights/Availability/FlightResults";
import FlightSummary from "Components/Flights/Availability/FlightSummary";
import SearchBar from "Components/Flights/SearchBar";

import { Button, IconWithBackground, MultiSelect, Text, LinearLoader, ScrollableList } from "Widgets";

import "./style.scss";

const sortingOptions = [
  { value: "price", label: "Price" },
  { value: "duration", label: "Duration" },
  { value: "departure", label: "Departure" },
  { value: "arrival", label: "Arrival" },
  { value: "airline", label: "Airline" },
];

const Availability = () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useToggle(false);
  const { control } = useForm({
    defaultValues: {
      sortingOptions: sortingOptions[0],
    }
  });

  const flightSearchInput = useSelector((state) => state.flightSearchInput);
  useEffect(() => {
    if (!!flightSearchInput.items && !!flightSearchInput.items.data) {
      try {
        dispatch(commonAction(endpoint.flights.flightSearch, flightSearchInput.items.data));
      } catch (err) {
        showError(err, setError);
      }
    }
  }, []);

  const flightSearchResponse = useSelector((state) => state.flightSearch);

  return (
    <div className="Availability">
      <div className="Availability-modifySearch">
        {!showSearch ? 
          <div className="d-flex justify-content-between align-items-center">
            {!!flightSearchInput.items && !!flightSearchInput.items.data &&
              <FlightSummary isSearch requestBody={flightSearchInput.items.data} />
            }
            <Button secondary text="Modify Search" onClick={setShowSearch} />
          </div> :
          <div className="Availability-modifySearch__searchSection">
            <div className="d-flex justify-content-between">
              <Text className="modify-text font-primary-bold-20 text-uppercase" text="Modify Search" />
              <IconWithBackground showCursor bgColor={colors.red1} onClick={setShowSearch}>
                <ClearIcon style={{ color: colors.red }} />
              </IconWithBackground>
            </div>
            <SearchBar />
          </div>
        }
      </div>
      <div className="Availability-mainSection">
        {!flightSearchResponse.items &&
          <Grid item xs={12}>
            <LinearLoader label="Getting the best fare from more than 600 airlines..." />
          </Grid>
        }
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <div className="Availability-mainSection__filtersContainer">
              <Filters />
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="Availability-mainSection__lowestFareFlightsSection">
              <ScrollableList />
            </div>
            <div className="Availability-mainSection__resultsContainer">
              <div className="info-sort-section d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <Text className="font-primary-medium-14 mr-4" text="All Amounts in " />
                  <Text className="font-primary-bold-14" text="AED" />
                </div>
                <div className="sort d-flex align-items-center">
                  <SwapVertIcon className="sort-reverse" />
                  <Text className="font-primary-medium-14 mr-10" text="Sort by: " />
                  <MultiSelect
                    control={control}
                    isOptionUppercase
                    labelKey="label"
                    name="sortingOptions"
                    options={sortingOptions}
                    valueKey="value"
                    width={100}
                  />
                </div>
              </div>
              {!!flightSearchResponse.items &&
                flightSearchResponse.items.data &&
                <FlightResults
                  results={flightSearchResponse.items.data}
                />
              }
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default Availability;
