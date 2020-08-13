import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Grid } from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";

import { commonActionWithoutApi } from "Actions";
import useToggle from "Client/hooks/useToggle";
import endpointWithoutApi from 'Config/endpointWithoutApi';
import colors from "Constants/colors";
import routes from "Constants/routes";
import { getDataFromRedux } from "Helpers/global";
import { displayImage, showError, setItemToStorage, getItemFromStorage } from "Helpers/utils";
import endpoint from "Config/endpoint";

import {
  AutoSuggest,
  Button,
  DatesRangePicker,
  DropdownBox,
  ExpandArrow,
  MultiSelect,
  RoundedButton,
  Text,
} from "Widgets";
import PassengersSelectCount from "./PassengersSelectCount";

import "./style.scss";

const segmentTypes = [
  { value: "RT", label: "Return" },
  { value: "OW", label: "One-way" },
];

const cabinClasses = [
  { value: "F", label: "First" },
  { value: "J", label: "Business" },
  { value: "W", label: "Premium Economy" },
  { value: "Y", label: "Economy" },
];

const passengerTypes = [
  {
    id: "ADT",
    type: "Adult",
    ageLimitText: "(Above 12 Yrs)",
    count: 1,
  },
  {
    id: "CHD",
    type: "Children",
    ageLimitText: "(2 - 12 Yrs)",
    count: 0,
  },
  {
    id: "INF",
    type: "Infants",
    ageLimitText: "(Below 2 Yrs)",
    count: 0,
  },
];

const airlinesOptions = [
  { airlineValue: "FZ", airlineLabel: "Flydubai (FZ)" },
  { airlineValue: "G9", airlineLabel: "Air Arabia (G9)" },
  { airlineValue: "WY", airlineLabel: "Oman Air (WY)" },
  { airlineValue: "EY", airlineLabel: "Etihad Airways (EY)" },
  { airlineValue: "ET", airlineLabel: "Ethiopian Airlines (ET)" },
];

const gdsAggregatorOptions = [
  { value: "1S", label: "Sabre (1S)" },
  { value: "1A", label: "Amadeus (1A)" },
  { value: "1G", label: "Travelport (1G)" },
  { value: "TF", label: "Travelfusion (TF)" },
  { value: "HH", label: "HitchHiker (HH)" },
];

const directConnectOptions = [
  { value: "FZ", label: "Flydubai (FZ)" },
  { value: "G9", label: "Air Arabia (G9)" },
  { value: "WY", label: "Oman Air (WY)" },
  { value: "EY", label: "Etihad Airways (EY)" },
  { value: "ET", label: "Airlines (ET)" },
];

const flightInitialDates = {
  startDate: moment(),
  endDate: moment().add(1, "days"),
};

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const flightSearchInput = useSelector(state => state[endpointWithoutApi.flights.flightSearchInput.reducerName]);
  let defaultSegmentType = segmentTypes[0], defaultCabinClass = cabinClasses[3],
    initialDepartureAirport = null, initialArrivalAirport = null;
  if (!!getDataFromRedux(flightSearchInput)) {
    const { flightSearchRQ } = flightSearchInput.items.data;
    defaultSegmentType = flightSearchRQ.originDestination.length === 1 &&
    !!flightSearchRQ.originDestination[0].destinationDate ? segmentTypes[0] : segmentTypes[1];
    defaultCabinClass = cabinClasses.find(cabinClass => cabinClass.value === flightSearchRQ.cabinCode);
    flightSearchRQ.passengerList.passenger.forEach(item => {
      const passengerType = passengerTypes.find(passenger => passenger.id === item.PTC);
      passengerType.count = item.count;
    });
    flightInitialDates.startDate = moment(flightSearchRQ.originDestination[0].originDate);
    flightInitialDates.endDate = moment(flightSearchRQ.originDestination[0].destinationDate);
    initialDepartureAirport = flightSearchRQ.originDestination[0].originAirport;
    initialArrivalAirport = flightSearchRQ.originDestination[0].destinationAirport;
  }
  const [expandAdvanceSearch, setExpandAdvanceSearch] = useToggle(false);
  const [isPassengerCountDropdownOpen, setIsPassengerCountDropdownOpen] = useToggle(false);
  const [flightDates, setFlightDates] = useState(flightInitialDates);
  const { handleSubmit,control } = useForm({
    defaultValues: {
      segmentTypes: defaultSegmentType,
      cabinClasses: defaultCabinClass,
    },
  });

  const [passengers, setPassengers] = useState(passengerTypes);

  const [formData, setFormData] = useState({
    departureAirport: initialDepartureAirport,
    arrivalAirport: initialArrivalAirport,
  });

  const [error, setError] = useState(null);

  const calculateTotalPassengers = passengers => {
    setPassengers(passengers);
  };

  const handleResetPassengersCount = () => {
    setPassengers(passengerTypes);
    setIsPassengerCountDropdownOpen(!isPassengerCountDropdownOpen);
  };

  const handleSelectSuggestion = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const handleFlightDates = (startDate, endDate) => {
    let flightDate = { ...flightDates };
    flightDate.startDate = startDate;
    flightDate.endDate = endDate;
    setFlightDates(flightDate);
  };

  const onSubmit = (data, e) => {
    const passengersData = passengers.filter(passenger => passenger.count > 0);
    const searchRequest = {
      flightSearchRQ: {
        cabinCode: data.cabinClasses.value,
        passengerList: {
          passenger: passengersData.map(passenger => {
            return {
              PTC: passenger.id,
              count: passenger.count
            }
          }),
        },
        originDestination: [
          {
            originAirportCode: formData.departureAirport.code,
            originAirport: formData.departureAirport,
            originDate: moment(flightDates.startDate).format("YYYY-MM-DD"),
            destinationAirportCode: formData.arrivalAirport.code,
            destinationAirport: formData.arrivalAirport,
            destinationDate: moment(flightDates.endDate).format("YYYY-MM-DD"),
          }
        ],
      },
    };

    try {
      const searchCount = getItemFromStorage("searchCount", 1);
      setItemToStorage("searchCount", Number(searchCount) + 1, 1);
      dispatch(commonActionWithoutApi(endpoint.flights.flightSearch, false));
      dispatch(commonActionWithoutApi(endpointWithoutApi.flights.flightSearchInput, searchRequest));
      history.push(routes.flight.availability);
    } catch (err) {
      showError(err, setError);
    }
  };

  return (
    <div className="SearchBar">
      <p>{error}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="SearchBar-basicSearch d-flex">
          <MultiSelect
            control={control}
            name="segmentTypes"
            options={segmentTypes}
          />
          <MultiSelect
            control={control}
            name="cabinClasses"
            options={cabinClasses}
            width={164}
          />
          <DropdownBox
            isContentVisible={isPassengerCountDropdownOpen}
            placeholder={`${passengers[0].count + passengers[1].count + passengers[2].count} Passenger(s)`}
            onClick={setIsPassengerCountDropdownOpen}
          >
            <PassengersSelectCount
              passengerTypes={passengers}
              calculateTotalPassengers={calculateTotalPassengers}
              onApplyClick={setIsPassengerCountDropdownOpen}
              onResetClick={handleResetPassengersCount}
            />
          </DropdownBox>
        </div>
        <div className="SearchBar-inputs">
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <AutoSuggest
                icon={
                  <img
                    alt="departure"
                    src={displayImage("departure.svg")}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="departureAirport"
                label="Departure City / Airport"
                initialValue={initialDepartureAirport}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Grid>
            {!isPassengerCountDropdownOpen && <RoundedButton />}
            <Grid item xs={12} md={4}>
              <AutoSuggest
                icon={
                  <img
                    alt="arrival"
                    src={displayImage("arrival.svg")}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="arrivalAirport"
                label="Arrival City / Airport"
                initialValue={initialArrivalAirport}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatesRangePicker
                // control={control}
                // name="flightDates"
                dates={flightDates}
                onDateChange={handleFlightDates}
                // enableSingleDatePicker
              />
            </Grid>
          </Grid>
        </div>
        <div className="SearchBar-advanceSearch d-flex">
          <Grid container spacing={1}>
            <Grid item xs={12} md={10} className="d-flex align-items-center">
              <div className="d-flex">
                <div
                  className="d-flex align-items-center mr-24 cursor-pointer"
                  onClick={setExpandAdvanceSearch}
                >
                  <Text
                    className="font-primary-medium-16 mr-16"
                    text="Advance Search"
                    style={{ color: colors.royalBlue }}
                  />
                  <ExpandArrow
                    isHorizontal
                    expand={expandAdvanceSearch}
                  />
                </div>
                {expandAdvanceSearch && (
                  <div className="d-flex align-items-center">
                    <MultiSelect
                      closeMenuOnSelect={false}
                      isMulti
                      labelKey="airlineLabel"
                      options={airlinesOptions}
                      placeholder="Airline Preference"
                      showValue
                      valueKey="airlineValue"
                      width="156"
                      control={control}
                      name="airlinesOptions"
                    />
                    <MultiSelect
                      closeMenuOnSelect={false}
                      isMulti
                      placeholder="GDS & Aggregator"
                      options={gdsAggregatorOptions}
                      showValue
                      width="158"
                      control={control}
                      name="gdsAggregatorOptions"
                    />
                    <MultiSelect
                      options={directConnectOptions}
                      placeholder="Direct Connect"
                      width="136"
                      control={control}
                      name="directConnectOptions"
                    />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                className="SearchBar-advanceSearch__searchFlight"
                icon={
                  <FlightIcon
                    style={{ color: colors.white, transform: "rotate(90deg)" }}
                  />
                }
                text="search flight"
                type="submit"
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
