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
import routes from 'Constants/routes';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam, titles } from 'Constants/commonConstant';
import { countriesDialCodeFormatter } from 'Helpers/global';
import { useDispatch, useSelector } from 'react-redux';

import endpoint from 'Config/endpoint';
import { utils } from 'Helpers';

import './style.scss';

const createEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.createUser,
    data,
  }));
};

const updateEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.updateUser,
    data,
  }));
};

const defaultValues = {
  officeId: 'SB00235',
  officeName: 'Axis Tours and Travels',
  title: '',
  mobileDialCode: '',
  securityGroup: '',
  status: '',
  officeType: { label: 'Branch', value: 'Branch' },
};
const OfficeProfileForm = (props) => {
  const { mode } = props;

  const isCreateOffice =
    mode.toUpperCase() === routes.office.createOffice.toUpperCase();
  const isViewOffice =
    mode.toUpperCase() === routes.office.viewOffice.toUpperCase();
  const isUpdateOffice =
    mode.toUpperCase() === routes.office.updateOffice.toUpperCase();

  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    defaultValues,
  });

  const searchResult = useSelector((state) => state.overrideSearchResult);
  const rowNumber = useSelector((state) => state.selectedOption);

  const [toast, setToast] = useState({
    message: '',
    status: false,
  });

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
    'masterCountries',
    countriesDialCodeFormatter
  );

  const [createRes, postCreateRequest] = createEndpoint();
  const [updateRes, postUpdateRequest] = updateEndpoint();

  const onSubmit = (data, e) => {
    console.log('data', data);

    if (isViewOffice) {
    }

    if (isUpdateOffice) {
      postUpdateRequest(data);
      const errMsg = utils.checkError(createRes);

      if (errMsg) setToast({ status: false, message: errMsg });
      else {
        setToast({ status: true, message: 'Office user updated successfully' });
        reset(defaultValues);
      }
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
                    options={[
                      { label: 'All', value: 'All' },
                      { label: 'Branch', value: 'Branch' },
                      { label: 'Own', value: 'Own' },
                    ]}
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    showValue
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
                    // validation={{ required: 'Please enter the status' }}
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
                      // validation={{
                      //   required: 'Please enter the office name.',
                      //   pattern: {
                      //     value: regex.alphanumeric,
                      //     message: 'Please enter valid office name.',
                      //   },
                      // }}
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
                    // validation={{
                    //   required: 'Please enter the address line 1.',
                    // }}
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
                    // validation={{
                    //   required: 'Please enter the address line 2.',
                    // }}
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
                    // validation={{ required: 'Please enter the country' }}
                    showValue
                    width="auto"
                    disabled={isViewOffice}
                  />
                </Grid>

                <Grid item xs={6}>
                  <MultiSelect
                    label="City"
                    name="cityCode"
                    options={[
                      { label: 'New Delhi', value: 'DEL' },
                      { label: 'Mumbai', value: 'BOM' },
                    ]}
                    placeholder="Select City"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    // validation={{ required: 'Please enter the city' }}
                    width="auto"
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
                    selectInputName="mobileDialCode"
                    data={countriesDialCodeList.dropDownItems}
                    label="Contact Number: "
                    placeholder="Phone Number"
                    selectPlaceholder="Code"
                    errors={errors}
                    register={register}
                    // validation={{ required: 'Please enter the phone number.' }}
                    // selectValidation={{
                    //   required: 'Please enter the country code.',
                    // }}
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
                    // validation={{
                    //   required: 'Please enter the email address.',
                    //   pattern: {
                    //     value: regex.email,
                    //     message: 'Please enter valid email address.',
                    //   },
                    // }}
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
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                    ]}
                    placeholder="Select"
                    showBorder={true}
                    changeStyle={true}
                    control={control}
                    errors={errors}
                    // validation={{ required: 'Please enter the no of users' }}
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
                    name="paymentDetails[0]"
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
      {toast.message && (
        <Toast isSuccess={toast.status} message={toast.message} />
      )}
    </>
  );
};

export default OfficeProfileForm;
