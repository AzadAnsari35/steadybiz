import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  SelectWithTextInput,
  MultiSelect,
  TextInput,
  Button,
  Text,
  TextWithTextInput,
  Toast,
  CustomCheckbox,
  CheckboxGroup,
} from 'Widgets';
import { useForm } from 'react-hook-form';
import { regex } from 'Helpers/validator';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { routes, commonConstant } from 'Constants';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam, titles } from 'Constants/commonConstant';
import { countriesDialCodeFormatter } from 'Helpers/global';
import { useDispatch, useSelector } from 'react-redux';
import { commonActionWithoutApi, commonAction } from 'Actions';
import endpoint from 'Config/endpoint';

import endpointWithoutApi from 'Config/endpointWithoutApi';
import { utils } from 'Helpers';

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
  countryCode: '',
  cityCode: '',
  zipCode: '',
  noOfUserRequested: '',
  paymentOptions: [],
};

const OfficeProfileForm = (props) => {
  const { mode } = props;

  const isCreateOffice =
    mode.toUpperCase() === routes.office.createOffice.toUpperCase();
  const isViewOffice =
    mode.toUpperCase() === routes.office.viewOffice.toUpperCase();
  const isUpdateOffice =
    mode.toUpperCase() === routes.office.updateOffice.toUpperCase();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    reset,
    getValues,
  } = useForm({
    defaultValues,
  });

  let rowNumber = utils.getItemFromStorage('selectedOffice');
  const searchResult =
    useSelector((state) => state.searchOffice?.items?.data?.data) || [];
  let selectedItem = searchResult[rowNumber] || {};

  console.log('selectedItem', selectedItem);

  let officeId = utils.getItemFromStorage('officeId');
  let userId = utils.getItemFromStorage('userId');

  const [createRes, postCreateRequest] = createEndpoint();

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  console.log('citiesList', citiesList);

  const countriesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countries,
    'masterCountries'
  );

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    'masterCountries'
  );

  const allCities = useDropDown(
    endpoint.master.allCities,
    dropDownParam.countriesDialCode,
    'masterCountries'
  );

  const setDefaultValue = () => {
    if (
      countriesList.dropDownItems !== null &&
      countriesDialCodeList.dropDownItems !== null &&
      !!citiesList &&
      !isCreateOffice
    ) {
      const {
        address1,
        address2,
        cityCode,
        officeEmail,
        noOfUserRequested,
        paymentOptions,
        officeName,
        officeId,
        phone,
        officeType,
        zipCode,
        countryCode,
        status,
      } = selectedItem;
      console.log('selectedItem', selectedItem);
      reset({
        address1,
        address2,
        emailId: officeEmail,
        paymentOptions,
        officeId,
        officeName,
        phone: phone.split('-')[1],
        phoneDialCode: countriesDialCodeList.dropDownItems.findItem(
          phone.split('-')[0]
        ),
        officeType: commonConstant.officeType.findItem(officeType, 'label'),
        zipCode,
        countryCode: countriesList.dropDownItems.findItem(countryCode),
        cityCode: citiesList.findItem(cityCode),

        noOfUserRequested: commonConstant.numberOfUsers.findItem(
          noOfUserRequested
        ),
        status: objectStatusesList.dropDownItems.findItem(
          status.toUpperCase(),
          'label'
        ),
      });
    }
  };

  const setCreateOfficeDefaultValue = () => {
    if (isCreateOffice) {
      reset({
        status: objectStatusesList.dropDownItems[3],
        officeType: commonConstant.officeType[0],
      });
    }
  };

  // const setDropDownDefaultValue = () => {
  //   if (countriesList.dropDownItems !== null) {
  //     const { countryCode } = selectedItem;
  //     reset({ countryCode: countriesList.dropDownItems.findItem(countryCode) });
  //   }
  // };

  useEffect(() => {
    if (createRes !== null) {
      const errMsg = utils.checkError(createRes);

      if (errMsg)
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
      else {
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: true,
            toastMessage: `Office  ${
              isUpdateOffice ? 'updated' : 'created'
            } successfully`,
            isToastVisible: true,
          })
        );
        isCreateOffice && reset(defaultValues);
      }
    }
  }, [createRes]);

  useEffect(() => setDefaultValue(), [
    countriesList.dropDownItems,
    countriesDialCodeList.dropDownItems,
    !!citiesList,
  ]);

  useEffect(() => setCreateOfficeDefaultValue(), [
    objectStatusesList.dropDownItems,
  ]);

  useEffect(() => {
    const selectedCountry = isCreateOffice
      ? getValues('countryCode')?.value
      : selectedItem?.countryCode;
    if (selectedCountry) {
      dispatch(
        commonAction(endpoint.master.cities, {
          countryCode: selectedCountry,
        })
      );
    }
  }, [isCreateOffice ? getValues('countryCode') : selectedItem?.countryCode]);

  // useEffect(() => setDropDownDefaultValue(), [countriesList.dropDownItems]);

  const onSubmit = (data, e) => {
    console.log('data', data);

    if (isUpdateOffice) {
      postCreateRequest({
        ...data,
        action: 'U',
        userId,
        officeId,
        ofId: selectedItem.ofId,
      });
    }

    if (isCreateOffice) {
      postCreateRequest({
        ...data,
        action: 'I',
        userId,
        officeId,
      });
    }
  };

  return (
    <>
      <div className="OfficeProfileForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={6} className="OfficeProfileForm-left">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder
                    text="Office Details"
                    className="font-primary-semibold-18"
                  />
                </Grid>

                <Grid item xs={6}>
                  <MultiSelect
                    label="Office Type:"
                    name="officeType"
                    options={commonConstant.officeType}
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    showLabel
                    width="auto"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <MultiSelect
                    label="Status:"
                    name="status"
                    options={objectStatusesList.dropDownItems}
                    placeholder="Select Status"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    validation={{ required: 'Please enter the status' }}
                    width="auto"
                    disabled={!isUpdateOffice}
                  />
                </Grid>
                <Grid item xs={12}>
                  {isCreateOffice ? (
                    <TextInput
                      name="officeName"
                      register={register}
                      errors={errors}
                      label="Office Name"
                      placeholder="Office Name"
                      validation={{
                        required: 'Please enter the office name.',
                        pattern: {
                          value: regex.alphanumeric,
                          message: 'Please enter valid office name.',
                        },
                      }}
                      disabled={!isCreateOffice}
                    />
                  ) : (
                    <TextWithTextInput
                      names={{ input1: 'officeId', input2: 'officeName' }}
                      label="Office ID | Name:"
                      errors={errors}
                      register={register}
                      disabled
                    />
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="address1"
                    register={register}
                    errors={errors}
                    placeholder="Address Line 1"
                    label="Address Line 1"
                    validation={{
                      required: 'Please enter the address line 1.',
                    }}
                    disabled={isViewOffice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="address2"
                    register={register}
                    errors={errors}
                    placeholder="Address Line 2"
                    label="Address Line 2"
                    disabled={isViewOffice}
                  />
                </Grid>

                <Grid item xs={6}>
                  <MultiSelect
                    label="Country"
                    name="countryCode"
                    options={countriesList.dropDownItems}
                    placeholder="Select Country"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    validation={{ required: 'Please enter the country' }}
                    width="auto"
                    showLabel
                    disabled={isViewOffice}
                  />
                </Grid>

                <Grid item xs={6}>
                  <MultiSelect
                    label="City"
                    name="cityCode"
                    options={citiesList || []}
                    placeholder="Select City"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    validation={{ required: 'Please enter the city' }}
                    width="auto"
                    disabled={isViewOffice}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    name="zipCode"
                    register={register}
                    errors={errors}
                    placeholder="Zip Code"
                    label="Zip Code"
                    validation={{
                      required: 'Please enter the zip code.',
                    }}
                    disabled={isViewOffice}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} className="OfficeProfileForm-right">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder
                    text="Contact Details"
                    className="font-primary-semibold-18"
                  />
                </Grid>

                <Grid item xs={12}>
                  <SelectWithTextInput
                    name="phone"
                    selectInputName="phoneDialCode"
                    data={countriesDialCodeList.dropDownItems}
                    label="Contact Number: "
                    placeholder="Phone Number"
                    selectPlaceholder="Code"
                    errors={errors}
                    register={register}
                    validation={{ required: 'Please enter the phone number.' }}
                    selectValidation={{
                      required: 'Please enter the country code.',
                    }}
                    control={control}
                    showValue
                    disabled={isViewOffice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="emailId"
                    register={register}
                    errors={errors}
                    label="Email"
                    placeholder="Email Address"
                    validation={{
                      required: 'Please enter the email address.',
                      pattern: {
                        value: regex.email,
                        message: 'Please enter valid email address.',
                      },
                    }}
                    disabled={!isCreateOffice}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Text
                    showLeftBorder
                    text="User Details"
                    className="font-primary-semibold-18"
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    label="Number of Users"
                    name="noOfUserRequested"
                    options={commonConstant.numberOfUsers}
                    placeholder="Select"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    validation={{ required: 'Please enter the no of users' }}
                    width="auto"
                    disabled={isViewOffice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder
                    text="Payment Details"
                    className="font-primary-semibold-18"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxGroup
                    label="Payment Option:"
                    name="paymentOptions[0]"
                    register={register}
                    disabled={isViewOffice}
                    checkboxes={[
                      {
                        primaryLabel: 'Advance Deposit',
                        value: 'advanceDeposit',
                      },
                      {
                        value: 'creditCard',
                        primaryLabel: 'Credit Card',
                      },
                      {
                        value: 'bankGuarantee',
                        primaryLabel: 'Bank Guarantee',
                      },
                    ]}
                  ></CheckboxGroup>
                </Grid>

                {!isViewOffice && (
                  <Grid item xs={12} className="d-flex justify-content-end">
                    <Button
                      text={`${
                        isCreateOffice ? 'Create Office' : 'Modify Office'
                      }`}
                      type="submit"
                      className="mb-30"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default OfficeProfileForm;
