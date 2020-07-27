import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SwapVertIcon from '@material-ui/icons/SwapVert';

import colors from "Constants/colors";
import { loaderTypes } from "Constants/commonConstant";
import useToggle from "Hooks/useToggle";
import { commonAction } from "Actions";
import endpoint from 'Config/endpoint';
import { showError } from "Helpers/utils";

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

  const flightSearchInput = useSelector(state => state.flightSearchInput);
  const flightSearchResponse = useSelector(state => state.flightSearch);
  const loaderStatus = useSelector(state => state.loaderStatus);

  const { flightSegmentGroup } = !!flightSearchResponse.items && !!flightSearchResponse.items.data &&
    flightSearchResponse.items.data.commonRS.flightItinerary[0].outboundItinerary[0].flightSegments[0];

  const { totalfareDetails } = !!flightSearchResponse.items && !!flightSearchResponse.items.data &&
    flightSearchResponse.items.data.commonRS.flightItinerary[0].outboundItinerary[0];

  useEffect(() => {
    try {
      dispatch(commonAction(endpoint.master.airlines));
    } catch (err) {
      showError(err, setError);
    }
    if (!!flightSearchInput.items && !!flightSearchInput.items.data) {
      try {
        dispatch(commonAction(
          endpoint.flights.flightSearch,
          flightSearchInput.items.data,
          {
            loaderType: loaderTypes.linearProgress,
            loaderText: "Getting the best fare from more than 600 airlines...",
            top: "170px",
          }
        ));
      } catch (err) {
        showError(err, setError);
      }
    }
  }, []);

  return (
    <div className="Availability">
      <div className="Availability-modifySearch layout-wrapper">
        {!showSearch ? 
          <div className="d-flex justify-content-between align-items-center">
            {!!flightSearchInput.items && !!flightSearchInput.items.data &&
              <FlightSummary
                isSearch
                requestBody={flightSearchInput.items.data}
                departureCity={flightSegmentGroup && flightSegmentGroup[0].departureDetails.cityName}
                arrivalCity={flightSegmentGroup && flightSegmentGroup[flightSegmentGroup.length - 1].arrivalDetails.cityName}
              />
            }
            <Button className="ml-auto" secondary text="Modify Search" onClick={setShowSearch} />
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
      <div className={`Availability-mainSection layout-wrapper ${
          loaderStatus.items && !loaderStatus.items.data.isLoaderVisible ? "adjust-padding" : ""
        }`}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <div className="Availability-mainSection__filtersContainer">
              <Filters
                results={
                  !!flightSearchResponse.items &&
                  flightSearchResponse.items.data
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="Availability-mainSection__lowestFareFlightsSection">
              <ScrollableList />
            </div>
            <div className="Availability-mainSection__resultsContainer">
              <div className="info-sort-section d-flex justify-content-between align-items-center">
                {!!totalfareDetails &&
                  <div className="d-flex">
                    <Text className="font-primary-medium-14 mr-4" text="All Amounts in " />
                    <Text className="font-primary-bold-14" text={totalfareDetails.totalAmountCurrency} />
                  </div>
                }
                <div className="sort d-flex align-items-center ml-auto">
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
