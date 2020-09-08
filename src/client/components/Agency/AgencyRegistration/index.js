import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  SelectWithTextInput,
  MultiSelect,
  TextInput,
  Button,
  CustomRadio,
  Text,
} from 'Widgets';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { regex } from 'Helpers/validator';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { utils } from 'Helpers';

// import useAPi from 'Hooks/useApi';
// import endpoint from 'Config/endpoint';
import endpoint from 'Config/endpoint';
import { commonAction } from 'Actions/';
import { commonConstant } from 'Constants/';

import './style.scss';

const createEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.createOffice,
    data,
  }));
};

const defaultValues = {
  officeName: '',
  title: '',
  phoneDialCode: '',
  securityGroup: '',
  address1: '',
  emailId: '',
  zipCode: '',
  noOfUserRequested: '',
  mobileDialCode: '',
  cityCode: '',
  countryCode: '',
};

const AgencyRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const {
    userDto: {
      officeId,
      userId,
      officeDto: { officeLevel },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  // console.log('user info', officeId, userId, officeLevel);

  const dispatch = useDispatch();

  const [createRes, postCreateRequest] = createEndpoint();

  const countriesList = useDropDown(
    endpoint.master.countries,
    commonConstant.dropDownParam.countries,
    'masterCountries'
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    commonConstant.dropDownParam.countriesDialCode,
    'masterCountries'
  );

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    commonConstant.dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );
  const settlementPlans = useSelector(
    (state) => state.masterSettlementPlans?.items?.data
  );

  const setDefaultValue = () => {
    console.log('settlementPlans', settlementPlans[0].value);
    reset({ ...defaultValues, paymentOptions: settlementPlans[0].value });
    // setValue('paymentOptions', settlementPlans[0].value);
  };

  const getCitiesList = (countryCode) => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode: countryCode,
      })
    );
  };

  useEffect(() => {
    const selectedCountry = getValues('countryCode');
    if (selectedCountry) {
      getCitiesList(selectedCountry.value);
    }
    return setValue('cityCode', '');
  }, [getValues('countryCode')]);

  useEffect(() => {
    if (createRes != null) {
      const errMsg = utils.checkError(createRes);
      if (errMsg !== '') {
        dispatch(utils.showErrorBox(errMsg));
      } else {
        dispatch(utils.showSuccessBox('Agency successfully registered'));
        handleReset();
      }
    }
  }, [createRes]);
  useEffect(() => {
    if (settlementPlans) {
      setDefaultValue();
    }
  }, [settlementPlans]);

  useEffect(() => {
    dispatch(commonAction(endpoint.master.settlementPlans));
  }, []);

  const handleReset = () => {
    setDefaultValue();
  };

  const onSubmit = (data, e) => {
    console.log('data', data);
    postCreateRequest({
      ...data,
      paymentOptions: [data.paymentOptions],
      action: 'I',
      userId,
      officeLevel,
      officeId,
      officeChannel: 'SA',
      status: objectStatusesList.dropDownItems[0],
      officeType: commonConstant.officeType[1],
    });
  };

  return (
    <div className="AgencyRegistrationForm">
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
              label="First Name:"
              placeholder="First Name"
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
              placeholder="Last Name"
              label="Last Name:"
              value="abc"
              validation={{
                required: 'Please enter the last name.',
                minLength: {
                  value: 2,
                  message: 'Please enter minimum two alphabets',
                },
                pattern: {
                  value: regex.name,
                  message: 'Please enter the alphabets only.',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWithTextInput
              name="mobile"
              selectInputName="mobileDialCode"
              data={countriesDialCodeList.dropDownItems}
              label="Mobile Number:"
              placeholder="Mobile Number"
              selectPlaceholder="Dial Code"
              errors={errors}
              register={register}
              validation={{
                required: 'Please enter the mobile number.',
                pattern: {
                  value: regex.number,
                  message: 'Please enter valid phone number.',
                },
              }}
              selectValidation={{
                required: 'Please enter the country code.',
              }}
              control={control}
              showValue
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="emailId"
              register={register}
              errors={errors}
              label="Email:"
              placeholder="Email"
              validation={{
                required: 'Please enter the email.',
                pattern: {
                  value: regex.email,
                  message: 'Please enter valid email id.',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="password"
              type="password"
              register={register}
              errors={errors}
              label="Create Password:"
              validation={{
                required: 'Please enter the password.',
                minLength: {
                  value: 8,
                  message: 'Please enter minimum eight characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Please enter maximum sixteen characters',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="confirmPassword"
              type="password"
              register={register}
              errors={errors}
              label="Confirm Password:"
              validation={{
                validate: (value) =>
                  value === watch('password') || "Passwords don't match.",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Agency Details"
              className="font-primary-semibold-18"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="officeName"
              register={register}
              errors={errors}
              label="Agency Name:"
              placeholder="Agency Name"
              validation={{
                required: 'Please enter the agency name.',
                pattern: {
                  value: regex.alphanumeric,
                  message: 'Please enter valid agency name.',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="address1"
              register={register}
              errors={errors}
              placeholder="Address Line 1"
              label="Address Line 1:"
              validation={{
                required: 'Please enter the address line 1.',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="address2"
              register={register}
              errors={errors}
              placeholder="Address Line 2"
              label="Address Line 2:"
              validation={{
                required: 'Please enter the address line 2.',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MultiSelect
              label="Country:"
              name="countryCode"
              options={countriesList.dropDownItems}
              placeholder="Country"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: 'Please enter the country' }}
              width="auto"
            />
          </Grid>

          <Grid item xs={6}>
            <MultiSelect
              label="City:"
              name="cityCode"
              options={citiesList || []}
              placeholder="City"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: 'Please enter the city' }}
              width="auto"
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="zipCode"
              register={register}
              errors={errors}
              label="Zip Code:"
              placeholder="Zip Code"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="No of Users:"
              name="noOfUserRequested"
              options={commonConstant.numberOfUsers}
              placeholder="No of Users"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: 'Please enter the no of users' }}
              width="auto"
            />
          </Grid>

          <Grid item xs={6}>
            <SelectWithTextInput
              name="phone"
              selectInputName="phoneDialCode"
              data={countriesDialCodeList.dropDownItems}
              label="Phone Number:"
              placeholder="Phone Number"
              selectPlaceholder="Country Code"
              errors={errors}
              register={register}
              validation={{
                required: 'Please enter the phone number.',
                pattern: {
                  value: regex.number,
                  message: 'Please enter valid phone number.',
                },
              }}
              selectValidation={{
                required: 'Please enter the country code.',
              }}
              control={control}
              showValue
            />
          </Grid>

          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Payment Settlement Options"
              className="font-primary-semibold-18 mt-32"
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="Gstnumber"
              register={register}
              errors={errors}
              placeholder="Type GST / VAT No."
              label="GST / VAT No.:"
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="Gstnumber"
              register={register}
              errors={errors}
              placeholder="Type GST / VAT (%)"
              label="GST / VAT (%):"
            />
          </Grid>
          {settlementPlans && (
            <>
              <Grid item xs={4}>
                <CustomRadio
                  id="advanceDeposit"
                  name="paymentOptions"
                  register={register}
                  errors={errors}
                  value={settlementPlans[0].value}
                  label={settlementPlans[0].primaryLabel}
                  subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
                />
              </Grid>

              <Grid item xs={4}>
                <CustomRadio
                  id="creditCard"
                  name="paymentOptions"
                  register={register}
                  errors={errors}
                  value={settlementPlans[1].value}
                  label={settlementPlans[1].primaryLabel}
                  subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
                />
              </Grid>

              <Grid item xs={4}>
                <CustomRadio
                  id="bankGuarantee"
                  name="paymentOptions"
                  register={register}
                  errors={errors}
                  value={settlementPlans[2].value}
                  label={settlementPlans[2].primaryLabel}
                  subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
                />
              </Grid>
            </>
          )}
        </Grid>
        <div className="d-flex justify-content-end pt-36">
          <Button
            secondary
            text="Reset"
            className="mr-16"
            onClick={handleReset}
          />
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AgencyRegistrationForm;
