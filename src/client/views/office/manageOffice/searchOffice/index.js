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
} from 'Widgets';
import routes from 'Constants/routes';
import { useHistory } from 'react-router-dom';
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

const headerData = [
  'OFFICE NAME',
  'OFFICE ID',
  'OFFICE TYPE',
  'COUNTRY',
  'CITY',
  'CONTACT NO.',
  'CURRENCY',
  'CREDIT LIMIT BAL.',
  'STATUS',
  'ACTION',
];

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();
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
          securityOptionConstant.office.viewOffice
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        history.push(routes.office.viewOffice);
        utils.setItemToStorage('selectedOffice', rowNumber);
        break;
      }
      case 'modify': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.office.updateOffice
        );

        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        history.push(routes.office.updateOffice);
        utils.setItemToStorage('selectedOffice', rowNumber);
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
        utils.setItemToStorage('selectedOffice', rowNumber);
        dispatch(commonActionUpdate(endpoint.office.searchUser, null));

        break;
      }

      case 'deposit': {
        history.push(routes.office.manageCreditLimit);
        utils.setItemToStorage('selectedOffice', rowNumber);
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
            View Office
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="modify"
          >
            Modify Office
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
  officeType: '',
  officeName: '',
  officeId: '',
};

const SearchOffice = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  let history = useHistory();
  let dispatch = useDispatch();

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

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const ofId = utils.getItemFromStorage('officeId');
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, countryCode, cityCode },
    },
  } = userData;

  const searchOffice = useSelector((state) => state.searchOffice?.items);

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  useEffect(() => {
    const selectedCountry =
      getValues('country') === '' ? countryCode : getValues('country')?.value;
    if (selectedCountry) {
      dispatch(
        commonAction(endpoint.master.cities, {
          countryCode: selectedCountry,
        })
      );
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
      console.log('countriesList.dropDownItems', countriesList.dropDownItems);
      reset({
        country: countriesList.dropDownItems.findItem(countryCode),
        city: citiesList.findItem(cityCode),
      });
    }
  }, [countriesList.dropDownItems, !!citiesList]);

  // useEffect(() => {
  //   if (citiesList && citiesList.data !== null) {
  //     reset({
  //     });
  //   }
  // }, [citiesList]);

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
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.createOffice
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    history.push(routes.office.createOffice);
    utils.setItemToStorage('selectedOffice', '');
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="SearchOffice">
      <div className="SearchOffice-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">MANAGE OFFICE</div>
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
            text="SEARCH OFFICE"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="officeName"
                register={register}
                errors={errors}
                label="Office Name:"
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
            <Grid item xs={6}>
              <div className="d-flex justify-content-end pt-32">
                <Button
                  text="Create"
                  secondary
                  className=" px-48 mr-10"
                  onClick={() => handleClick()}
                />

                <Button type="submit" text="Search" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
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
            last: <PopoverAction />,
          }}
          count={searchOffice.data.count}
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
          ]}
        />
      )}
    </div>
  );
};

export default SearchOffice;
