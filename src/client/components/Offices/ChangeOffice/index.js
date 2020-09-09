import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  commonAction,
  commonActionUpdate,
  commonActionWithoutApi,
} from 'Actions/';
import endpoint from 'Config/endpoint.js';
import { securityOptionConstant } from 'Constants';
import colors from 'Constants/colors';
import { dropDownParam } from 'Constants/commonConstant';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import { regex } from 'Helpers/validator';
import useDropDown from 'Hooks/useDropDown';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  IconWithBackground,
  MultiSelect,
  PrimaryTable,
  PrimaryTableHeader,
  SelectWithTextInput,
  SimplePopover,
  Text,
  TextInput,
} from 'Widgets';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { commonConstant } from 'Constants';
import './style.scss';

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
  city: '',
  country: '',
  officeType: '',
  officeChannel: '',
  officeName: '',
};

const headerData = ['OFFICE NAME', 'OFFICE ID', 'COUNTRY', 'CITY', 'ACTION'];

const SearchOffice = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  const searchOffice = useSelector((state) => state.searchOffice?.items);

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
          officeType: commonConstant.officeType[0],
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
    <div className="SearchOffice">
      <div className="SearchOffice-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">{`CHANGE OFFICE`}</div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => handleClose()}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="ofid" value={ofId} ref={register}></input>
          <input type="hidden" name="size" value={size} ref={register}></input>

          <Text
            showLeftBorder={true}
            text={`SEARCH OFFICE`}
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
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

            <Grid item xs={3}>
              <MultiSelect
                label="Office Channel:"
                name="officeChannel"
                options={commonConstant.officeChannel}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                getValues={getValues}
                showLabel
                width="auto"
              />
            </Grid>

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
              />
            </Grid>

            <Grid item xs={3}>
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
      {searchOffice.status && (
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
          columnAlignments={['left', 'center', 'center', 'left', 'center']}
          statusIndex={8}
          handlePage={handlePage}
          hideKeys={[]}
        />
      )}
    </div>
  );
};

export default SearchOffice;
