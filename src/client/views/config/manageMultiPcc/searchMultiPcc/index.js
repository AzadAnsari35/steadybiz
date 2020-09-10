import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  MultiSelect,
  SimplePopover,
  Text,
  IconWithBackground,
} from 'Widgets';
import PrimaryTable from 'Widgets/PrimaryTable';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import CachedIcon from '@material-ui/icons/Cached';
import { securityOptionConstant } from 'Constants';
import FlightIcon from '@material-ui/icons/Flight';

import './style.scss';

const headerData = [
  'IATA AGENCY',
  'IATA CODE',
  'GDS',
  'AGENT ID',
  'PCC CODE',
  'COUNTRY',
  'CITY',
  'TIME ZONE',
  'STATUS',
  'ACTION',
];

const response = {
  status: true,
  data: {
    status: 'OK',
    count: 3,
    data: [
      {
        iataAgency: 'Kilgore Trout',
        iataCode: 'UIDSBR05',
        gds: 'Sabre',
        agendId: 'UIDSBR05',
        pccCode: 'PCC0001',
        country: 'IN',
        city: 'New Delhi',
        timeZone: 'GMT +10:30',
        Status: 'Active',
      },
      {
        iataAgency: 'Kilgore Trout',
        iataCode: 'UIDSBR05',
        gds: 'Sabre',
        agendId: 'UIDSBR05',
        pccCode: 'PCC0001',
        country: 'IN',
        city: 'New Delhi',
        timeZone: 'GMT +10:30',
        Status: 'Active',
      },
      {
        iataAgency: 'Kilgore Trout',
        iataCode: 'UIDSBR05',
        gds: 'Sabre',
        agendId: 'UIDSBR05',
        pccCode: 'PCC0001',
        country: 'IN',
        city: 'New Delhi',
        timeZone: 'GMT +10:30',
        Status: 'Active',
      },
    ],
  },
};

const PopoverAction = ({ rowNumber }) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };
  const handleClick = (e) => {
    const selectedOption = e.target.getAttribute('name');
    switch (selectedOption) {
      case 'view': {
        // const securityMessage = utils.checkSecurityGroup(
        //   securityOptionConstant.office.viewSecurityGroup
        // );
        // if (securityMessage !== '') {
        //   dispatch(utils.showErrorBox(securityMessage));
        //   return;
        // }
        utils.setItemToStorage('selectedPcc', rowNumber);
        history.push(routes.master.viewMultiPcc);
        break;
      }
      case 'modify': {
        // const securityMessage = utils.checkSecurityGroup(
        //   securityOptionConstant.office.updateSecurityGroup
        // );

        // if (securityMessage !== '') {
        //   dispatch(utils.showErrorBox(securityMessage));
        //   return;
        // }
        utils.setItemToStorage('selectedPcc', rowNumber);
        history.push(routes.master.modifyMultiPcc);
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
        <div
          className="SearchMultiPcc-tableAction d-flex flex-direction-column"
          onClick={handleClick}
        >
          <div className="font-primary-regular-14" name="view">
            View PCC
          </div>
          <div className="font-primary-regular-14" name="modify">
            Modify PCC
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const defaultValues = {
  objectStatus: '',
  userGroupId: '',
  cityCode: '',
  countryCode: '',
};

const SearchMultiPcc = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = userData;

  const securityGroupList = useSelector((state) => state.SearchMultiPcc?.items);

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

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

  const getCitiesList = (countryCode) => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode: countryCode,
      })
    );
  };

  useEffect(() => {
    if (securityGroupList != null) {
      const errMsg = utils.checkError(securityGroupList);
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
  }, [securityGroupList]);

  useEffect(() => {
    if (requestJson !== null) {
      callSearch(page);
    }

    // return dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
  }, [requestJson]);

  useEffect(() => {
    const selectedCountry = getValues('countryCode');
    if (selectedCountry) {
      getCitiesList(selectedCountry.value);
    }
    return setValue('cityCode', '');
  }, [getValues('countryCode')]);

  useEffect(() => {
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    callSearch(page);
  }, [page]);

  const callSearch = (page) => {
    try {
      dispatch(
        commonAction(endpoint.office.SearchMultiPcc, {
          ...requestJson,
          page: page - 1,
          size,
          ofId,
        })
      );
    } catch (err) {
      console.log('err', err);
    }
  };
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit = (data, e) => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.SearchMultiPcc
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    console.log('data', data);
    setReqeustJson(data);
    setPage(1);
  };

  const handleCreate = () => {
    // const securityMessage = utils.checkSecurityGroup(
    //   securityOptionConstant.office.createSecurityGroup
    // );

    // if (securityMessage !== '') {
    //   dispatch(utils.showErrorBox(securityMessage));
    //   return;
    // }
    history.push(routes.master.createMultiPcc);
    utils.setItemToStorage('selectedRegion', null);
  };

  return (
    <div className="SearchMultiPcc">
      <div className="SearchMultiPcc-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">MANAGE MULTI PCC</div>
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
          <Text
            showLeftBorder={true}
            text="SEARCH PCC"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={3}>
              <MultiSelect
                label="IATA Agency:"
                name="iataAgency"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                label="IATA Code:"
                name="iataCode"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="GDS:"
                name="gds"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="PCC Code:"
                name="pccCode"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>

            <Grid item xs={3}>
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
              />
            </Grid>

            <Grid item xs={3}>
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
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Status:"
                name="status"
                options={objectStatusesList.dropDownItems}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>
            <Grid item xs={3} className="d-flex justify-content-end pt-32">
              <Button
                text="Create"
                secondary
                className=" px-48 mr-10"
                onClick={() => handleCreate()}
              />

              <Button type="submit" text="Search" className=" px-48" />
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {response?.status && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
              showServiceIcon={{
                icon: (
                  <FlightIcon
                    style={{ transform: 'rotate(90deg)', fontSize: 18 }}
                  />
                ),
                text: 'Flight',
              }}
            />
          }
          handlePage={handlePage}
          headerData={headerData}
          bodyData={response?.data}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={response.data.count}
          size={size}
          page={page}
          columnAlignments={[
            'left',
            'center',
            'left',
            'center',
            'center',
            'center',
            'left',
            'center',
            'left',
            'center',
          ]}
          statusIndex={8}
          tableStyling={[{ paddingLeft: 72 }]}
        />
      )}
    </div>
  );
};

export default SearchMultiPcc;
