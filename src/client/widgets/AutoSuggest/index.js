import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FlightOutlinedIcon from '@material-ui/icons/FlightOutlined';

import colors from "Constants/colors";

import { Text } from "Widgets";

import "./style.scss";

const airportsData = [
  {
    code: "LON",
    subTitle: "United Kingdom",
    title: "London (All Airports)",
    level: 0,
  },
  {
    code: "LON",
    subTitle: "United Kingdom",
    title: "London (London City Airport)",
    level: 1,
  },
  {
    code: "ZLS",
    subTitle: "United Kingdom",
    title: "London (Liverpool St Rail Station)",
    level: 1,
  },
  {
    code: "LGW",
    subTitle: "United Kingdom",
    title: "London (Getwick)",
    level: 1,
  },
  {
    code: "DEL",
    subTitle: "India",
    title: "New Delhi (DEL)",
    level: 0,
  },
  {
    code: "DEL",
    subTitle: "India",
    title: "Indira Gandhi International",
    level: 1,
  },
];

const AutoSuggest = props => {
  const { icon, id, label, initialValue, onSelectSuggestion } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const loading = open && inputValue.length >= 3 && options.length === 0;

  useEffect(() => {
    if (!!initialValue) {
      setValue(airportsData.find(airport => airport.code === initialValue));
    }
  }, [initialValue]);
  
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = (event, newValue) => {
    setValue(newValue);
    onSelectSuggestion(id, newValue);
  };

  const handleChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length >= 3) {
      getData();
    } else {
      setOptions([]);
    }
  }

  const getData = async () => {
    // const response = await fetch("https://country.register.gov.uk/records.json?page-size=5000");
    // const countries = await response.json();
    const countries = airportsData;
    // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
    setOptions(countries);
  }

  return (
    <>
      <div className="AutoSuggest">
        {icon}
        <Autocomplete
          inputValue={inputValue}
          loading={loading}
          open={open}
          options={options}
          value={value}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.title}
          onChange={handleSelect}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          onInputChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
          renderOption={(option) => (
            <Fragment>
              <div className={`listItem d-flex justify-content-between align-items-center ${option.level === 1 ? "nested" : ""}`}>
                <div className="listItem__left d-flex align-items-center">
                  {option.level === 1
                    ? <FlightOutlinedIcon className="listItem__left-icon" style={{ color: colors.silverChalice1, transform: "rotate(45deg)" }} />
                    : <LocationOnOutlinedIcon className="listItem__left-icon" style={{ color: colors.silverChalice1 }} />
                  }
                  <div>
                    <Text className="top-text font-primary-medium-16" text={option.title} />
                    <Text className="bottom-text font-primary-medium-14" text={option.subTitle} />
                  </div>
                </div>
                <div className="listItem__right">
                  <Text className="font-primary-medium-14" text={option.code} />
                </div>
              </div>
            </Fragment>
          )}
        />
      </div>
    </>
  );
};

export default AutoSuggest;