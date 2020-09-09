import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextInput, SelectWithTextInput, Text, Button } from 'Widgets';
import { useForm } from 'react-hook-form';
import { regex } from 'Helpers/validator';
import endpoint from 'Config/endpoint';
import { commonAction } from 'Actions/';
import { commonConstant } from 'Constants/';

import useDropDown from 'Hooks/useDropDown';

import './style.scss';

const AgencyInvitationForm = () => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {},
  });

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    commonConstant.dropDownParam.countriesDialCode,
    'masterCountries'
  );

  const onSubmit = (data) => {
    console.log('data', data);
  };

  return (
    <div className="AgencyInvitationForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Contact Details"
              className="font-primary-semibold-18"
            />
          </Grid>

          <Grid item xs={6}>
            <SelectWithTextInput
              name="firstName"
              selectInputName="title"
              data={commonConstant.titles}
              label="First Name"
              placeholder="First Name:"
              selectPlaceholder="Title"
              errors={errors}
              register={register}
              validation={{
                required: 'Please enter the first name.',
                pattern: {
                  value: regex.name,
                  message: 'Please enter the alphabets only.',
                },
              }}
              selectValidation={{
                required: 'Please enter the title.',
              }}
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="lastName"
              register={register}
              errors={errors}
              label="Last Name:"
              validation={{
                required: 'Please enter the last name.',
                pattern: {
                  value: regex.name,
                  message: 'Please enter the alphabets only.',
                },
                minLength: {
                  value: 2,
                  message: 'Please enter minimum two alphabets',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWithTextInput
              name="mobileNumber"
              selectInputName="mobileCountryCode"
              data={countriesDialCodeList.dropDownParam}
              label="Mobile Number:"
              placeholder="Mobile Number"
              selectPlaceholder="Country Code"
              errors={errors}
              register={register}
              validation={{
                required: 'Please enter the mobile number.',
                pattern: {
                  value: regex.number,
                  message: 'Please enter valid mobile number.',
                },
              }}
              selectValidation={{
                required: 'Please enter the country code.',
              }}
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="emailId"
              register={register}
              errors={errors}
              label="Email:"
              validation={{
                required: 'Please enter the email.',
                pattern: {
                  value: regex.email,
                  message: 'Please enter valid email id.',
                },
              }}
            />
          </Grid>
        </Grid>
        <div className="d-flex justify-content-end pt-36">
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AgencyInvitationForm;
