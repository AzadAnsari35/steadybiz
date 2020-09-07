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
import { routes, commonConstant, securityOptionConstant } from 'Constants';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam, titles } from 'Constants/commonConstant';
import useCheckboxData from 'Hooks/useCheckboxData';

import { useDispatch, useSelector } from 'react-redux';
import {
  commonActionWithoutApi,
  commonAction,
  commonActionUpdate,
} from 'Actions';
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
  zipCode: '',
  noOfUserRequested: '',
  paymentOptions: '',
  mobileDialCode: '',
};

const AgencyProfileForm = (props) => {
  const { mode } = props;

  const isCreateAgency =
  utils.stringComparison(mode, routes.agency.createAgency)

  const isViewAgency =
  utils.stringComparison(mode, routes.agency.viewAgency)
  const isUpdateAgency =
   utils.stringComparison(mode, routes.agency.updateAgency)

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });

  const [paymentOptions, setPaymentOptions] = useCheckboxData([]);

  let rowNumber = utils.getItemFromStorage('selectedAgency');
  const searchResult =
    useSelector((state) => state.searchAgency?.items?.data?.data) || [];
  let selectedItem = searchResult[rowNumber] || {};

  // console.log('searchResult', searchResult);

  console.log('selectedItem', selectedItem);

  let officeId = utils.getItemFromStorage('officeId');
  let userId = utils.getItemFromStorage('userId');

  const [createRes, postCreateRequest] = createEndpoint();

  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: {
        countryCode: rootCountryCode,
        cityCode: rootCityCode,
        officeLevel,
      },
    },
  } = userData;

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  const settlementPlans = useSelector(
    (state) => state.masterSettlementPlans?.items?.data
  );

  // console.log('settlementPlans', settlementPlans);

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

  const getCitiesList = (countryCode) => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode: countryCode,
      })
    );
  }

  useEffect(() => {
    const selectedCountry = getValues('countryCode');
    console.log('selectedCountry', selectedCountry);
        console.log('rootCountryCode', rootCountryCode);

    if(selectedCountry && selectedCountry.value !== rootCountryCode){
      // reset({cityCode:""})
        //  console.log("condition")
    }
    if (selectedCountry) {
      getCitiesList(selectedCountry.value)
    }
    // return dispatch(commonActionUpdate(endpoint.master.cities, null));
  }, [getValues('countryCode')]);

  
  const getSettlementPlans = () => {
    console.log("getSettlementPlans")
    dispatch(commonAction(endpoint.master.settlementPlans));
    isCreateAgency && getCitiesList(rootCountryCode)
  };

  useEffect(() => getSettlementPlans(), []);

  const setDefaultValue = () => {
    console.log("setDefaultValue")
    if (
      countriesList.dropDownItems !== null &&
      countriesDialCodeList.dropDownItems !== null &&
      !!citiesList &&
      !!settlementPlans &&
      !isCreateAgency
    ) {
      // console.log('settlementPlans', settlementPlans);
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
        officeChannel,
        zipCode,
        countryCode,
        status,
        mobile,
        users: [{ firstName, lastName, title, emailId }],
      } = selectedItem;
      // console.log('selectedItem', selectedItem);
      reset({
        address1,
        address2,
        emailId: officeEmail,
        // paymentOptions: paymentOptions,
        officeId,
        officeName,
        firstName,
        lastName,
        title: titles.findItem(title),
        phone: phone.split('-')[1],
        phoneDialCode: countriesDialCodeList.dropDownItems.findItem(
          phone.split('-')[0]
        ),
        mobile: mobile.split('-')[1],
        mobileDialCode: countriesDialCodeList.dropDownItems.findItem(
          mobile.split('-')[0]
        ),
        officeChannel: commonConstant.officeChannel.findItem(officeChannel),
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
      setPaymentOptions(paymentOptions);
    }
  };

  const setCreateOfficeDefaultValue = () => {
    console.log("setCreateOfficeDefaultValue", citiesList );
    if (
      isCreateAgency &&
      objectStatusesList.dropDownItems !== null &&
      countriesList.dropDownItems !== null &&
      !!citiesList
    ) {
      reset({
        status: objectStatusesList.dropDownItems[3],
        officeChannel: commonConstant.officeChannel[0],
        countryCode: countriesList.dropDownItems.findItem(rootCountryCode),
        cityCode: citiesList.findItem(rootCityCode),
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
            toastMessage: `Agency  ${
              isUpdateAgency ? 'updated' : 'created'
            } successfully`,
            isToastVisible: true,
          })
        );
        if (isCreateAgency) {
          reset(defaultValues);
          setPaymentOptions([]);
        }
      }
    }
  }, [createRes]);

  useEffect(() => setDefaultValue(), [
    countriesList.dropDownItems,
    countriesDialCodeList.dropDownItems,
    !!citiesList,
    settlementPlans,
  ]);

  useEffect(() => setCreateOfficeDefaultValue(), [
    objectStatusesList.dropDownItems,
    countriesList.dropDownItems,
    !!citiesList,
  ]);


  // useEffect(() => dispatch(commonActionUpdate(endpoint.master.cities, null)), []);

  const onSubmit = (data, e) => {
    console.log('data', data);

    if (isUpdateAgency) {
      const {
        users: [{ userId }],
      } = selectedItem;
      postCreateRequest({
        ...data,
        action: 'U',
        userId,
        officeId,
        paymentOptions,
        ofId: selectedItem.ofId,
        officeChannel: 'SA',
        officeType:commonConstant.officeType[1]


      });
    }

    if (isCreateAgency) {
      postCreateRequest({
        ...data,
        action: 'I',
        userId,
        officeLevel,
        paymentOptions,
        officeId,
        officeChannel: 'SA',
        officeType:commonConstant.officeType[1]

      });
    }
  };

  return (
    <div className="AgencyProfileForm">
      <div className="AgencyProfileForm-imageContainer d-flex align-items-center">
        <div className="AgencyProfileForm-imageContainer__image d-flex justify-content-center align-items-center mr-20">
          <PersonIcon style={{ fontSize: 75, color: colors.gray }} />
        </div>
        {!isViewAgency && (
          <div>
            <div className="d-flex">
              <Button text="Upoad New Photo" className="mb-16 mr-10" />
              {isUpdateAgency && (
                <Button text="Remove" secondary className="mb-16" />
              )}
            </div>

            <div className="AgencyProfileForm-imageContainer__text font-primary-semibold-14">
              Image should be at least 300 X 300 px in .jpg/.png or .gif format
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={6} className="AgencyProfileForm-left">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="Agency Details"
                  className="font-primary-semibold-18"
                />
              </Grid>

              <Grid item xs={6}>
                <MultiSelect
                  label="Office Channel:"
                  name="officeChannel"
                  options={commonConstant.officeChannel}
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  showLabel
                  width="auto"
                  disabled
                  isSearchable
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
                  disabled={isViewAgency}
                  isSearchable
                />
              </Grid>
              {isCreateAgency ? (
                <Grid item xs={12}>
                  <TextInput
                    name="officeName"
                    register={register}
                    errors={errors}
                    label="Agency Name"
                    placeholder="Office Name"
                    validation={{
                      required: 'Please enter the office name.',
                      pattern: {
                        value: regex.alphanumeric,
                        message: 'Please enter valid office name.',
                      },
                    }}
                    disabled={!isCreateAgency}
                  />
                </Grid>
              ) : (
                <>
                  <Grid item xs={6}>
                    <TextInput
                      name="officeName"
                      register={register}
                      errors={errors}
                      label="Office Name"
                      validation={{
                        required: 'Please enter the office name.',
                        pattern: {
                          value: regex.alphanumeric,
                          message: 'Please enter valid office name.',
                        },
                      }}
                      disabled={isViewAgency}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextInput
                      name="officeId"
                      register={register}
                      errors={errors}
                      label="Office Id"
                      disabled={!isCreateAgency}
                    />
                  </Grid>
                </>
              )}

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
                  disabled={isViewAgency}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="address2"
                  register={register}
                  errors={errors}
                  placeholder="Address Line 2"
                  label="Address Line 2"
                  disabled={isViewAgency}
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
                  disabled={!isCreateAgency}
                  isSearchable
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
                  disabled={!isCreateAgency}
                  isSearchable
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  name="zipCode"
                  register={register}
                  errors={errors}
                  placeholder="Zip Code"
                  label="Zip Code"
                  disabled={isViewAgency}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectWithTextInput
                  name="phone"
                  selectInputName="phoneDialCode"
                  data={countriesDialCodeList.dropDownItems}
                  label="Phone: "
                  placeholder="Phone"
                  selectPlaceholder="Code"
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
                  disabled={isViewAgency}
                  maxLength={15}
                  isSearchable={false}
                  selectWidth="50%"
                />
              </Grid>
              

              <Grid item xs={12}>
                <MultiSelect
                  label="Number of Users:"
                  name="noOfUserRequested"
                  options={commonConstant.numberOfUsers}
                  placeholder="Select Number of Users"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  validation={{ required: 'Please enter the no of users' }}
                  width="auto"
                  disabled={isViewAgency}
                  isSearchable
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="AgencyProfileForm-right">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="Master User Details"
                  className="font-primary-semibold-18"
                />
              </Grid>
              <Grid item xs={12}>
                <SelectWithTextInput
                  name="firstName"
                  selectInputName="title"
                  data={titles}
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
                  disabled={isViewAgency}
                />
              </Grid>

              <Grid item xs={12}>
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
                  disabled={isViewAgency}
                />
              </Grid>

              <Grid item xs={6}>
                <SelectWithTextInput
                  name="mobile"
                  selectInputName="mobileDialCode"
                  data={countriesDialCodeList.dropDownItems}
                  label="Mobile: "
                  placeholder="Mobile"
                  selectPlaceholder="Code"
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
                  showValue
                  disabled={isViewAgency}
                  maxLength={15}
                  isSearchable={false}
                  selectWidth="50%"
                />
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  name="emailId"
                  register={register}
                  errors={errors}
                  label="Email:"
                  placeholder="Email Address"
                  validation={{
                    required: 'Please enter the email address.',
                    pattern: {
                      value: regex.email,
                      message: 'Please enter valid email address.',
                    },
                  }}
                  disabled={!isCreateAgency}
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
                  name="paymentOptions"
                  // control={control}
                  // getValues={getValues}
                  disabled={isViewAgency}
                  checkboxes={settlementPlans || []}
                  useReactHookForm={false}
                  onChange={setPaymentOptions}
                  checkedValues={paymentOptions}
                />

                {/* <CustomCheckbox
                  value="a0a3d1d7-cbcf-4807-9960-c6b007b1281f"
                  primaryLabel="Bank Guarantee"
                  name="paymentOptions"
                  control={control}
                  getValues={getValues}
                />

                <CustomCheckbox
                  value="dec4ff45-0b68-4cd0-89cf-bfb5deafb8b5"
                  primaryLabel="Credit Card"
                  name="paymentOptions"
                  control={control}
                  getValues={getValues}
                /> */}
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  name="gstNumber"
                  register={register}
                  errors={errors}
                  placeholder="Type GST / VAT No."
                  label="GST / VAT No.:"
                  disabled={isViewAgency}
                />
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  name="gstNumber"
                  register={register}
                  errors={errors}
                  placeholder="Type GST / VAT (%)"
                  label="GST / VAT (%):"
                  disabled={isViewAgency}
                />
              </Grid>

              {!isViewAgency && (
                <Grid item xs={12} className="d-flex justify-content-end">
                  <Button
                    text={`${
                      isCreateAgency ? 'Create Agency' : 'Modify Agency'
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
  );
};

export default AgencyProfileForm
;
