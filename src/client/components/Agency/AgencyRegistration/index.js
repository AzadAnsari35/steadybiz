import React, { useEffect, useState } from 'react';
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

import { utils } from 'Helpers';

// import useAPi from 'Hooks/useApi';
// import endpoint from 'Config/endpoint';
import endpoint from 'Config/endpoint';
import { commonAction } from 'Actions/';
import { commonConstant } from 'Constants/';

import './style.scss';
import { TITLES } from 'Constants/commonConstant';

const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};
const defaultValues = {
  officeName: '',
  title: '',
  firstName: '',
  lastName: '',
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
const AgencyRegistrationForm = (props) => {
  const { countriesList, countriesDialCodeList } = props;
  const [showSubmit, setShowSubmit] = useState(true);
  const [createInvite, setCreateInvite] = createEndpoint();
  const createInviteData = createInvite?.data?.data;
  //console.log(createInviteData?.firstName);

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm();
  let search = window.location.search;

  let params = new URLSearchParams(search);
  const inviteId = params.get('inviteId');
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const defaultData = {
    userDto: { officeId: '', userId: '', officeDto: { officeLevel: '' } },
  };
  let {
    userDto: {
      officeId,
      userId,
      officeDto: { officeLevel },
    },
  } = userData || defaultData;
  // console.log('user info', officeId, userId, officeLevel);
  //console.log('hh', officeLevel);

  const dispatch = useDispatch();

  const [createRes, postCreateRequest] = createEndpoint();

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );
  const settlementPlans = useSelector(
    (state) => state.masterSettlementPlans?.items?.data
  );

  useEffect(() => {
    //console.log(createInviteData);
    if (createInvite)
      if (createInvite.status) {
        setShowSubmit(true);
        // setValue('lastName', createInviteData.lastName);
        // setValue('firstName', createInviteData.firstName);
        // setValue('emailId', createInviteData.inviteeEmail);
        // setInviteValue();
      } else {
        setShowSubmit(false);
        dispatch(utils.showErrorBox(createInvite.error.message));
      }
  }, [createInvite]);
  useEffect(() => {
    if (inviteId != null)
      //  alert(inviteId);
      setCreateInvite(endpoint.agency.invite, {
        data: null,
        inviteId: inviteId,
      });
  }, []);
  const setInviteValue = () => {
    if (createInviteData)
      reset({
        firstName: createInviteData.firstName,
        lastName: createInviteData.lastName,

        emailId: createInviteData.inviteeEmail,
        mobileDialCode: countriesDialCodeList.dropDownItems.findItem(
          decodeURIComponent(createInviteData.phone.split('-')[0])
        ),
        mobile: createInviteData.phone.split('-')[1],
        title: commonConstant.titles.findItem(createInviteData.title),
        paymentOptions: settlementPlans ? settlementPlans[0].value : '',
      });
  };
  const setDefaultValue = () => {
    //console.log('settlementPlans', settlementPlans[0].value);
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
    if (
      settlementPlans &&
      countriesDialCodeList &&
      (inviteId == null || createInviteData)
    ) {
      setDefaultValue();
      setInviteValue();
    }
  }, [settlementPlans, createInviteData, countriesDialCodeList]);

  useEffect(() => {
    dispatch(commonAction(endpoint.master.settlementPlans));
  }, []);

  const handleReset = () => {
    setDefaultValue();
  };

  const onSubmit = (data, e) => {
    console.log('data', data);

    postCreateRequest(endpoint.office.createOffice, {
      ...data,
      paymentOptions: [data.paymentOptions],
      action: 'I',
      userId: createInviteData ? createInviteData.requesterUserId : userId,

      officeLevel: createInviteData ? 0 : officeLevel,
      officeId: createInviteData ? createInviteData.requesterOfId : officeId,
      officeChannel: 'SA',
      status: {
        value: 'c1142fd8-6933-4c5c-8667-3fb55a872e2b',
        label: 'register',
      }, //objectStatusesList.dropDownItems[0],
      officeType: commonConstant.officeType[1],
      inviteId: inviteId,
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
          {showSubmit && <Button type="submit" text="Submit" />}
        </div>
      </form>
    </div>
  );
};

export default AgencyRegistrationForm;
