import React from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import {
  DatePickerMui,
  ErrorMessage,
  SelectField,
  Text,
  TextInputMui,
} from 'Widgets';

import './style.scss';

const PassportDetails = (props) => {
  const {
    className,
    countryNamesList,
    index,
    issuingCountry,
    nationality,
    passportNumber,
    errorData,
    onFocus,
    onChange,
    flightDate,
  } = props;
  //console.log(flightDate);
  return (
    <div className={`PassportDetails ${className ? className : ''}`}>
      <Text
        showLeftBorder
        className="PassportDetails-title font-primary-medium-18"
        text="Passport Details"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextInputMui
            id={`passportNumber-${index}`}
            type="text"
            label="Passport Number"
            placeholder="Passport Number"
            value={passportNumber}
            hasError={!!errorData.passportNumber}
            onFocus={onFocus}
            onChange={onChange}
          />
          {!!errorData.passportNumber && (
            <ErrorMessage errorMessage={errorData.passportNumber} />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <SelectField
            id={`issuingCountry-${index}`}
            label="Issuing Country"
            placeholder="Issuing Country"
            data={countryNamesList}
            hasError={!!errorData.issuingCountry}
            initialSelectedValue={issuingCountry}
            onChange={onChange}
          />
          {!!errorData.issuingCountry && (
            <ErrorMessage errorMessage={errorData.issuingCountry} />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePickerMui
            id={`passportExpiry-${index}`}
            label="Passport Expiry"
            disablePastDates
            minDate={moment(flightDate).format('YYYY-MM-DD')}
            hasError={!!errorData.passportExpiry}
            onChange={onChange}
          />
          {!!errorData.passportExpiry && (
            <ErrorMessage errorMessage={errorData.passportExpiry} />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <SelectField
            id={`nationality-${index}`}
            label="Nationality"
            placeholder="Nationality"
            data={countryNamesList}
            hasError={!!errorData.nationality}
            initialSelectedValue={nationality}
            onChange={onChange}
          />
          {!!errorData.nationality && (
            <ErrorMessage errorMessage={errorData.nationality} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PassportDetails;
