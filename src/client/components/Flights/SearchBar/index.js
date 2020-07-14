import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";

import { displayImage } from "Helpers/utils";
import colors from "Constants/colors";

import AutoSuggest from "Widgets/AutoSuggest/index";
import Button from "Widgets/Button/index";
import DatesRangePicker from "Widgets/DatesRangePicker/index";
import DropdownBox from "Widgets/DropdownBox/index";
import ExpandArrow from "Widgets/ExpandArrow/index";
import MultiSelect from "Widgets/MultiSelect/index";
import PassengersSelectCount from "./PassengersSelectCount/index";
import RoundedButton from "Widgets/RoundedButton/index";
import Text from "Widgets/Text/index";
import { useForm } from "react-hook-form";

import "./style.scss";

const segmentTypes = [
  { segmentValue: "RT", segmentLabel: "Return" },
  { segmentValue: "OW", segmentLabel: "One-way" },
];

const tripTypes = [
  { value: "First", label: "First" },
  { value: "Business", label: "Business" },
  { value: "Premium Economy", label: "Premium Economy" },
  { value: "Economy", label: "Economy" },
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

const SearchBar = () => {
  const [expandAdvanceSearch, setExpandAdvanceSearch] = useState(false);
  const [
    isPassengerCountDropdownOpen,
    setIsPassengerCountDropdownOpen,
  ] = useState(false);
  const { register, handleSubmit, errors, control, setValue, watch } = useForm({
    defaultValues: {
      title: { label: "Mr", value: "mr" },
      firstName: "Azad",
    },
  });

  const handlePassengerCountDropdownClick = () => {
    setIsPassengerCountDropdownOpen(!isPassengerCountDropdownOpen);
  };

  const handleAdvanceSearchClick = () => {
    setExpandAdvanceSearch(!expandAdvanceSearch);
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-panel">
        <div className="SearchBar-panel__basicSearch d-flex">
          <MultiSelect
            labelKey="segmentLabel"
            options={segmentTypes}
            valueKey="segmentValue"
            control={control}
            name="segmentTypes"
          />
          <MultiSelect
            options={tripTypes}
            width={164}
            control={control}
            name="tripTypes"
          />
          <DropdownBox
            onClick={handlePassengerCountDropdownClick}
            isContentVisible={isPassengerCountDropdownOpen}
          >
            <PassengersSelectCount
              onOutsideClick={handlePassengerCountDropdownClick}
            />
          </DropdownBox>
        </div>
        <div className="SearchBar-panel__inputs">
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <AutoSuggest
                label="Departure City / Airport"
                icon={
                  <img
                    alt="departure"
                    src={displayImage("departure.svg")}
                    className="SearchBar-panel__inputs-autoSuggestIcon"
                  />
                }
              />
            </Grid>
            {!isPassengerCountDropdownOpen && <RoundedButton />}
            <Grid item xs={12} md={4}>
              <AutoSuggest
                label="Arrival City / Airport"
                icon={
                  <img
                    alt="arrival"
                    src={displayImage("arrival.svg")}
                    className="SearchBar-panel__inputs-autoSuggestIcon"
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatesRangePicker />
            </Grid>
          </Grid>
        </div>
        <div className="SearchBar-panel__advanceSearch d-flex">
          <Grid container spacing={1}>
            <Grid item xs={12} md={10} className="d-flex align-items-center">
              <div className="d-flex">
                <div className="d-flex align-items-center mr-24">
                  <Text
                    className="font-primary-medium-16 mr-16"
                    text="Advance Search"
                    style={{ color: colors.royalBlue }}
                  />
                  <ExpandArrow
                    isHorizontal
                    expand={expandAdvanceSearch}
                    onClick={handleAdvanceSearchClick}
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
                className="SearchBar-panel__advanceSearch-searchFlight"
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
      </div>
    </div>
  );
};

export default SearchBar;
