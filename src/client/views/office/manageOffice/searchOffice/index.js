import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { regex } from 'Helpers/validator';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  MultiSelect,
  IconWithBackground,
  Text,
  TextInput,
  SimplePopover,
  PrimaryTable,
  PrimaryTableHeader,
  SelectWithTextInput,
} from 'Widgets';
import routes from 'Constants/routes';
import { useHistory, useLocation } from 'react-router-dom';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import {
  commonAction,
  commonActionWithoutApi,
  commonActionUpdate,
} from 'Actions/';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import { utils } from 'Helpers';
import { commonConstant, securityOptionConstant } from 'Constants';
import CachedIcon from '@material-ui/icons/Cached';

import './style.scss';

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();
  const location = useLocation();

  const isSearchAgency = utils.stringComparison(
    location.pathname,
    routes.agency.searchAgency
  );

  const dispatch = useDispatch();

  const { rowNumber } = props;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };

  const handleClick = (e) => {
    const selectedOption = e.currentTarget.getAttribute('name');

    switch (selectedOption) {
      case 'view': {
        const securityMessage = utils.checkSecurityGroup(
          isSearchAgency
            ? securityOptionConstant.agency.viewAgency
            : securityOptionConstant.office.viewOffice
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        history.push(
          isSearchAgency ? routes.agency.viewAgency : routes.office.viewOffice
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedAgency' : 'selectedOffice',
          rowNumber
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedOffice' : 'selectedAgency',
          ''
        );

        break;
      }
      case 'modify': {
        const securityMessage = utils.checkSecurityGroup(
          isSearchAgency
            ? securityOptionConstant.agency.updateAgency
            : securityOptionConstant.office.updateOffice
        );

        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        history.push(
          isSearchAgency
            ? routes.agency.updateAgency
            : routes.office.updateOffice
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedAgency' : 'selectedOffice',
          rowNumber
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedOffice' : 'selectedAgency',
          ''
        );

        break;
      }

      case 'search': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.office.searchUser
        );

        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        history.push(routes.office.searchOfficeUser);
        utils.setItemToStorage(
          isSearchAgency ? 'selectedAgency' : 'selectedOffice',
          rowNumber
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedOffice' : 'selectedAgency',
          ''
        );

        dispatch(commonActionUpdate(endpoint.office.searchUser, null));
        break;
      }

      case 'deposit': {
        history.push(
          isSearchAgency
            ? routes.agency.manageCreditLimit
            : routes.office.manageCreditLimit
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedAgency' : 'selectedOffice',
          rowNumber
        );
        utils.setItemToStorage(
          isSearchAgency ? 'selectedOffice' : 'selectedAgency',
          ''
        );
        dispatch(commonActionUpdate(endpoint.office.creditLimitHistory, null));
        break;
      }

      default: {
        return;
      }
    }
  };

  return (
    <>
      <MoreVertIcon className="cursor-pointer" onClick={handlePopoverOpen} />
      <SimplePopover
        open={showPopover}
        handleClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="SearchUser-tableAction d-flex flex-direction-column">
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="view"
          >
            {isSearchAgency ? 'View Agency' : 'View Office'}
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="modify"
          >
            {isSearchAgency ? 'Modify Agency' : 'Modify Office'}
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="search"
          >
            Search User
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="deposit"
          >
            Deposit
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const defaultValues = {
  status: '',
  city: '',
  country: '',
  // officeType: '',
  officeName: '',
  officeId: '',
  emailId: '',
  mobileDialCode: '',
  mobile: '',
};

const SearchOffice = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  const location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();

  const path = location.pathname;

  const isSearchOffice = utils.stringComparison(
    path,
    routes.office.searchOffice
  );

  const isSearchAgency = utils.stringComparison(
    path,
    routes.agency.searchAgency
  );

  const headerData = [
    isSearchAgency ? 'AGENCY NAME' : 'OFFICE NAME',
    'OFFICE ID',
    // 'OFFICE TYPE',
    'COUNTRY',
    'CITY',
    'MASTER USER',
    'MOBILE',
    'CURRENCY',
    'CREDIT LIMIT BAL.',
    'STATUS',
    'ACTION',
  ];

  console.log('isSearchAgency', isSearchAgency);

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const countriesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countries,
    'masterCountries'
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
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
  } = useForm({ defaultValues });

  const ofId = utils.getItemFromStorage('officeId');
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, countryCode, cityCode },
    },
  } = userData;

  const searchOffice = useSelector((state) => state.searchOffice?.items);
  const searchAgency = useSelector((state) => state.searchAgency?.items);

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
    if (selectedCountry && selectedCountry.value !== countryCode) {
      // reset({cityCode:""})
      //  console.log("condition")
      setValue('city', '');
    }
    // return dispatch(commonActionUpdate(endpoint.master.cities, null));
  }, [getValues('country')]);

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
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
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
    if (countriesList.dropDownItems !== null && !!citiesList) {
      console.log('countriesList.dropDownItems', countryCode);
      console.log('cityCode', cityCode);

      reset({
        country: countriesList.dropDownItems.findItem(countryCode),
        city: citiesList.findItem(cityCode),
      });
    }
  }, [countriesList.dropDownItems, !!citiesList]);

  // useEffect(() => {
  //     reset({
  //       cityCode:""
  //     })
  //   }
  // , [citiesList]);

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
        commonAction(
          isSearchAgency
            ? endpoint.agency.searchAgency
            : endpoint.office.searchOffice,
          {
            ...requestJson,
            page: page - 1,
            size,
            ofid: ofId,
            ...(isSearchAgency && { officeChannel: 'SA' }),
            officeType: isSearchAgency
              ? commonConstant.officeType[1]
              : commonConstant.officeType[0],
          }
        )
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  const onSubmit = (data, e) => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.searchOffice
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    console.log('data', data);
    setReqeustJson(data);
    setPage(1);
  };

  const handleClick = () => {
    if (isSearchAgency) {
      const securityMessage = utils.checkSecurityGroup(
        securityOptionConstant.office.createOffice
      );

      if (securityMessage !== '') {
        dispatch(utils.showErrorBox(securityMessage));
        return;
      }
      history.push(routes.agency.createAgency);
      utils.setItemToStorage('selectedAgency', '');
    } else {
      const securityMessage = utils.checkSecurityGroup(
        securityOptionConstant.office.createOffice
      );

      if (securityMessage !== '') {
        dispatch(utils.showErrorBox(securityMessage));
        return;
      }
      history.push(routes.office.createOffice);
      utils.setItemToStorage('selectedOffice', '');
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const resultStatus = isSearchAgency
    ? searchAgency?.status
    : searchOffice?.status;
  console.log('resultStatus', resultStatus);

  // console.log("screen status", isSearchAgency ? typeof searchAgency?.status : `Office ${searchOffice?.status}`)

  return (
    <div className="SearchOffice">
      <div className="SearchOffice-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">{`MANAGE ${
            isSearchAgency ? 'AGENCY' : 'OFFICE'
          }`}</div>
          <IconWithBackground
            bgColor="#74D3DC33"
            showCursor
            onClick={handleReset}
          >
            <CachedIcon style={{ color: '#74D3DC' }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="ofid" value={ofId} ref={register}></input>
          <input type="hidden" name="size" value={size} ref={register}></input>

          <Text
            showLeftBorder={true}
            text={`SEARCH  ${isSearchAgency ? 'AGENCY' : 'OFFICE'}`}
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextInput
                name={isSearchAgency ? ' agencyName' : 'officeName'}
                register={register}
                errors={errors}
                label={isSearchAgency ? 'Agency Name:' : 'Office Name:'}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="officeId"
                register={register}
                errors={errors}
                label="Office ID:"
              />
            </Grid>
            <Grid item xs={3}>
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

            <Grid item xs={3}>
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
            {/* <Grid item xs={3}>
              <MultiSelect
                label="Office Type:"
                name="officeType"
                options={commonConstant.officeType}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                getValues={getValues}
                showLabel
                width="auto"
                isSearchable
              />
            </Grid> */}
            <Grid item xs={3}>
              <TextInput
                name="emailId"
                register={register}
                errors={errors}
                label="Email ID:"
                validation={{
                  pattern: {
                    value: regex.email,
                    message: 'Please enter valid email id.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="mobile"
                selectInputName="mobileDialCode"
                data={countriesDialCodeList.dropDownItems}
                label="Mobile "
                placeholder="Mobile No."
                selectPlaceholder="Code"
                errors={errors}
                register={register}
                control={control}
                showValue
                validation={{
                  pattern: {
                    value: regex.number,
                    message: 'Please enter numbers only.',
                  },
                }}
                fullWidthDropdown
                maxLength={15}
                isSearchable={false}
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Status:"
                name="status"
                options={objectStatusesList.dropDownItems}
                valueKey="label"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid
              item
              xs={3}
              className="d-flex justify-content-end align-items-end"
            >
              <Button
                text="Create"
                secondary
                className=" px-48 mr-10"
                onClick={() => handleClick()}
              />

              <Button type="submit" text="Search" className=" px-48" />
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {resultStatus && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerData={headerData}
          bodyData={isSearchAgency ? searchAgency.data : searchOffice.data}
          page={page}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={
            isSearchAgency ? searchAgency.data.count : searchOffice.data.count
          }
          size={size}
          columnAlignments={[
            'left',
            'center',
            'left',
            'center',
            'left',
            'center',
            'center',
            'right',
            'left',
            'center',
          ]}
          statusIndex={8}
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
          ]}
        />
      )}
    </div>
  );
};

export default SearchOffice;
