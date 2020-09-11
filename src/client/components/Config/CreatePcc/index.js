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
import { countriesDialCodeFormatter } from 'Helpers/global';
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

const CreatePccForm = (props) => {
  const { path } = props;

  const isCreatePcc = utils.stringComparison(
    path,
    routes.master.createMultiPcc
  );
  const isViewPcc = utils.stringComparison(path, routes.master.viewMultiPcc);

  const isUpdatePcc = utils.stringComparison(
    path,
    routes.master.modifyMultiPcc
  );
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

  let rowNumber = utils.getItemFromStorage('selectedOffice');
  const searchResult =
    useSelector((state) => state.searchOffice?.items?.data?.data) || [];
  let selectedItem = searchResult[rowNumber] || {};

  // console.log('searchResult', searchResult);

  // console.log('selectedItem', selectedItem);

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
  };

  useEffect(() => {
    const selectedCountry = getValues('countryCode');

    if (selectedCountry && selectedCountry.value !== rootCountryCode) {
      // reset({cityCode:""})
      //  console.log("condition")
    }
    if (selectedCountry) {
      getCitiesList(selectedCountry.value);
    }
    return setValue('cityCode', '');
  }, [getValues('countryCode')]);

  const getSettlementPlans = () => {
    console.log('getSettlementPlans');
    dispatch(commonAction(endpoint.master.settlementPlans));
    // isCreatePcc && getCitiesList(rootCountryCode);
  };

  useEffect(() => getSettlementPlans(), []);

  const setDefaultValue = () => {
    console.log('setDefaultValue');
    if (
      countriesList.dropDownItems !== null &&
      countriesDialCodeList.dropDownItems !== null &&
      !!citiesList &&
      !!settlementPlans &&
      !isCreatePcc
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
        officeType,
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
        officeType: commonConstant.officeType.findItem(officeType),
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
    console.log('setCreateOfficeDefaultValue', citiesList);
    if (isCreatePcc && objectStatusesList.dropDownItems !== null) {
      reset({
        status: objectStatusesList.dropDownItems[3],
        // countryCode: countriesList.dropDownItems.findItem(rootCountryCode),
        // cityCode: citiesList.findItem(rootCityCode),
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
              isUpdatePcc ? 'updated' : 'created'
            } successfully`,
            isToastVisible: true,
          })
        );
        if (isCreatePcc) {
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
    // countriesList.dropDownItems,
    // !!citiesList,
  ]);

  // useEffect(() => dispatch(commonActionUpdate(endpoint.master.cities, null)), []);

  const onSubmit = (data, e) => {
    console.log('data', data);

    if (isUpdatePcc) {
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
        officeChannel: officeLevel === 0 ? 'AG' : 'SA',
      });
    }

    if (isCreatePcc) {
      postCreateRequest({
        ...data,
        action: 'I',
        userId,
        officeLevel,
        paymentOptions,
        officeId,
        officeChannel: officeLevel === 0 ? 'AG' : 'SA',
      });
    }
  };

  return (
    <div className="CreatePccForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={6} className="CreatePccForm-left">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="Agency Details"
                  className="font-primary-semibold-18"
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label="IATA Agency:"
                  name="iataAgency"
                  register={register}
                  placeholder="Type Agency"
                  errors={errors}
                  disabled={isViewPcc}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label="IATA Code:"
                  name="iataCode"
                  register={register}
                  placeholder="Type IATA Code"
                  errors={errors}
                  disabled={isViewPcc}
                />
              </Grid>
              <Grid item xs={6}>
                <MultiSelect
                  label="Country"
                  name="countryCode"
                  options={countriesList.dropDownItems}
                  placeholder="Country"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  width="auto"
                  isSearchable
                  disabled={isViewPcc}
                />
              </Grid>
              <Grid item xs={6}>
                <MultiSelect
                  label="City"
                  name="cityCode"
                  options={
                    (citiesList && utils.sortObjectArray(citiesList)) || []
                  }
                  placeholder="City"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  width="auto"
                  isSearchable
                  disabled={isViewPcc}
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
                  width="auto"
                  disabled={!isUpdatePcc}
                  isSearchable
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="CreatePccForm-right">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="PCC Details"
                  className="font-primary-semibold-18"
                />
              </Grid>
              <Grid item xs={6}>
                <MultiSelect
                  label="GDS:"
                  name="gds"
                  options={[]}
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  width="auto"
                  disabled={isViewPcc}
                />
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  name="agentID"
                  register={register}
                  errors={errors}
                  placeholder="Type Agent ID"
                  label="Agent ID:"
                  disabled={isViewPcc}
                />
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  label="PCC Code:"
                  name="pccCode"
                  register={register}
                  placeholder="Type PCC Code"
                  errors={errors}
                  disabled={isViewPcc}
                />
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  label="LNIATA:"
                  name="lniata"
                  register={register}
                  placeholder="Type LNIATA"
                  errors={errors}
                  disabled={isViewPcc}
                />
              </Grid>

              {isCreatePcc && (
                <>
                  <Grid item xs={6}>
                    <TextInput
                      name="gdsPassword"
                      type="password"
                      register={register}
                      errors={errors}
                      label="GDS Password:"
                      // validation={{
                      //   required: 'Please enter the password.',
                      //   minLength: {
                      //     value: 8,
                      //     message: 'Please enter minimum eight characters',
                      //   },
                      //   maxLength: {
                      //     value: 16,
                      //     message: 'Please enter maximum sixteen characters',
                      //   },
                      // }}
                      placeholder="Type Password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                      name="confirmGdsPassword"
                      type="password"
                      register={register}
                      errors={errors}
                      label="Confirm GDS Password:"
                      validation={{
                        validate: (value) =>
                          value === watch('gdsPassword') ||
                          "Passwords don't match.",
                      }}
                      placeholder="Type Password"
                    />
                  </Grid>
                </>
              )}
              {!isViewPcc && (
                <Grid item xs={12} className="d-flex justify-content-end">
                  <Button
                    text={`${isCreatePcc ? 'Create PCC' : 'Modify PCC'}`}
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

export default CreatePccForm;
