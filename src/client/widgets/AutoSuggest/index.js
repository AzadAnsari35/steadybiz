import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FlightOutlinedIcon from '@material-ui/icons/FlightOutlined';

import colors from "Constants/colors";
import airportData from "Constants/airportData";

import { Text } from "Widgets";

import "./style.scss";

const AutoSuggest = props => {
  const { icon, id, label, initialValue, onSelectSuggestion } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const loading = open && inputValue.length >= 3 && options.length === 0;

  useEffect(() => {
    if (!!initialValue) {
      setValue(initialValue);
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
    setInputValue(newInputValue.toUpperCase());

    if (newInputValue.length >= 3) {
      getData();
    } else {
      setOptions([]);
    }
  }

  const getData = async () => {
    // const response = await fetch("https://country.register.gov.uk/records.json?page-size=5000");
    // const countries = await response.json();
    const countries = airportData;
    // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
    setOptions(countries);
  }

  return (
    <>
      <div className="AutoSuggest">
        {icon}
        <Autocomplete
          inputValue={inputValue}
          // loading={loading}
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
                    {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
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
                    {/* <Text className="bottom-text font-primary-medium-14" text={option.subTitle} /> */}
                  </div>
                </div>
                {/* <div className="listItem__right">
                  <Text className="font-primary-medium-14" text={option.code} />
                </div> */}
              </div>
            </Fragment>
          )}
        />
      </div>
    </>
  );
};

export default AutoSuggest;