import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";

import { DatePickerMui, ErrorMessage, SelectWithTextInputMui, TextInputMui } from "Widgets";

const PassengerPrimaryInformation = (props) => {
  const { errorData, firstName, id, index, lastName, maxDob, minDob, title, titleData, onFocus, onChange } = props;

  const handleFocus = key => {
    onFocus(id, key);
  }

  const handleChange = (key, value) => {
    onChange(id, key, value);
  }

  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <SelectWithTextInputMui
          id={`firstName-${index}`}
          selectInputId="title"
          type="text"
          label="First Name"
          placeholder="First Name"
          selectPlaceholder="Title"
          value={firstName}
          initialSelectedValue={title}
          data={titleData}
          hasError={!!errorData.title || !!errorData.firstName}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {!!errorData.title && <ErrorMessage errorMessage={errorData.title} />}
        {!!errorData.firstName && <ErrorMessage errorMessage={errorData.firstName} />}
      </Grid>
      <Grid item xs={12} md={4}>
        <TextInputMui
          id={`lastName-${index}`}
          type="text"
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          hasError={!!errorData.lastName}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {!!errorData.lastName && <ErrorMessage errorMessage={errorData.lastName} />}
      </Grid>
      <Grid item xs={12} md={2}>
        <DatePickerMui
          id={`dob-${index}`}
          label="Date of Birth"
          minDate={minDob}
          maxDate={maxDob}
          hasError={!!errorData.dob}
          onChange={handleChange}
        />
        {!!errorData.dob && <ErrorMessage errorMessage={errorData.dob} />}
      </Grid>
    </Fragment>
  )
}

export default PassengerPrimaryInformation;