import Grid from '@material-ui/core/Grid';
import { commonAction } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import { commonConstant } from 'Constants';
import { dropDownParam } from 'Constants/commonConstant';
import { utils } from 'Helpers';
import useDropDown from 'Hooks/useDropDown';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  MultiSelect,
  PrimaryTable,
  PrimaryTableHeader,
  Text,
  TextInput,
} from 'Widgets';
import './style.scss';

const LinkAction = (props) => {
  const { id, rowNumber, onOfficeClick } = props;
  const searchOffice = useSelector((state) => state.searchOffice?.items);
  console.log('id', searchOffice?.data?.data[rowNumber].officeId);
  return (
    <div
      className="link-text text-decoration-none font-primary-semibold-14"
      onClick={() => onOfficeClick(searchOffice?.data?.data[rowNumber])}
    >
      Select
    </div>
  );
};

const defaultValues = {
  city: '',
  country: '',
  officeType: '',
  officeChannel: '',
  officeName: '',
};

const headerData = ['OFFICE NAME', 'OFFICE ID', 'COUNTRY', 'CITY', 'ACTION'];

const ChangeOffice = (props) => {
  const { onOfficeClick } = props;
  const [requestJson, setReqeustJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  const searchOffice = useSelector((state) => state.searchOffice?.items);

  let history = useHistory();
  let dispatch = useDispatch();

  const countriesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countries,
    'masterCountries'
  );

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    reset,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const ofId = utils.getItemFromStorage('officeId');
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, countryCode, cityCode },
    },
  } = userData;

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  const getCitiesList = (countryCode) => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode: countryCode,
      })
    );
  };

  useEffect(() => {
    const selectedCountry = getValues('country');
    if (selectedCountry) {
      getCitiesList(selectedCountry.value);
    }
    // return dispatch(commonActionUpdate(endpoint.master.cities, null));
  }, [getValues('country')]);

  useEffect(() => {
    const selectedChannel = getValues('officeChannel');

    if (selectedChannel) {
      if (selectedChannel.value === commonConstant.officeChannel[0].value) {
        setValue('officeType', null);
      } else if (
        selectedChannel.value === commonConstant.officeChannel[1].value
      ) {
        setValue('officeType', commonConstant.officeType[0]);
      }
    }
    // return dispatch(commonActionUpdate(endpoint.master.cities, null));
  }, [getValues('officeChannel')]);

  useEffect(() => {
    if (requestJson !== null) {
      callSearch(page);
    }

    // return dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
  }, [requestJson]);

  useEffect(() => {
    if (searchOffice != null) {
      const errMsg = utils.checkError(searchOffice);
      if (errMsg !== '') {
        dispatch(utils.showErrorBox(errMsg));
      }
    }
  }, [searchOffice]);

  useEffect(() => {
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    callSearch(page);
  }, [page]);

  useEffect(() => {
    getCitiesList(countryCode);
  }, []);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const callSearch = (page) => {
    console.log('callsearch');
    try {
      setErrorMsg('');
      dispatch(
        commonAction(endpoint.office.searchOffice, {
          ...requestJson,
          page: page - 1,
          size,
          ofid: ofId,
        })
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  const onSubmit = (data, e) => {
    // const securityMessage = utils.checkSecurityGroup(
    //   securityOptionConstant.office.searchOffice
    // );

    // if (securityMessage !== '') {
    //   dispatch(utils.showErrorBox(securityMessage));
    //   return;
    // }
    console.log('data', data);
    setReqeustJson(data);
    setPage(1);
  };

  const handleClose = () => {};

  const handleClick = () => {};

  return (
    <div className="ChangeOffice">
      <div className="ChangeOffice-head">
        {/* <div className="horizontal-grey-divider"></div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="ofid" value={ofId} ref={register}></input>
          <input type="hidden" name="size" value={size} ref={register}></input>

          <Text
            showLeftBorder={true}
            text={`SEARCH OFFICE`}
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <MultiSelect
                label="Country"
                name="country"
                options={countriesList.dropDownItems}
                placeholder="Country"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={6}>
              <MultiSelect
                label="City"
                name="city"
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
                validation={{ required: 'Please enter the office channel' }}
                errors={errors}
                getValues={getValues}
                showLabel
                width="auto"
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
                validation={
                  getValues('officeChannel') !== 'SA'
                    ? { required: 'Please enter the office type' }
                    : {}
                }
                errors={errors}
                getValues={getValues}
                showLabel
                width="auto"
                disabled={watch('officeChannel')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextInput
                name="officeName"
                register={register}
                errors={errors}
                label="Office Name:"
                placeholder="Type Office Name"
              />
            </Grid>

            <Grid
              item
              xs={6}
              className="d-flex justify-content-end align-items-end"
            >
              <Button type="submit" text="Search" className=" px-48" />
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="ChangeOffice-table">
        {searchOffice?.status && (
          <PrimaryTable
            header={
              <PrimaryTableHeader
                officeName={officeName}
                officeId={officeId}
                officeLevel={officeLevel}
              />
            }
            headerData={headerData}
            bodyData={searchOffice.data}
            page={page}
            AddElement={{
              last: <LinkAction id={officeId} onOfficeClick={onOfficeClick} />,
            }}
            count={searchOffice.data.count}
            size={size}
            columnAlignments={['left', 'center', 'center', 'left', 'center']}
            handlePage={handlePage}
            hideKeys={[
              'ofId',
              'address1',
              'address2',
              'cityCode',
              'officeEmail',
              'noOfUserRequested',
              'paymentOptions',
              'zipCode',
              'minimumBalance',
              'users',
              'phone',
              'officeType',
              'officeChannel',
              'masterUser',
              'mobile',
              'currCode',
              'creditLimitBal',
              'status',
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ChangeOffice;
