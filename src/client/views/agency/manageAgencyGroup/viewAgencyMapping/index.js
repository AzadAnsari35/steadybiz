import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
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
  TextInput
} from 'Widgets';
import PrimaryTable from 'Widgets/PrimaryTable';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import CachedIcon from '@material-ui/icons/Cached';
import { securityOptionConstant } from 'Constants';
import FlightIcon from '@material-ui/icons/Flight';
import { colors, routes, commonConstant } from 'Constants';
import CloseIcon from '@material-ui/icons/Close';


import './style.scss';

const headerData = [
  'AGENCY NAME',
  'SERVICES',
  'COUNTRY',
  "CITY",
  "START DATE",
  "END DATE",
  'STATUS',
];

const response = {
  status: true,
  data: {
    status: 'OK',
    count: 3,
    data: [
      {
        agenyName: 'Axis tour and travels',
        services: 'Flight',
        country: 'IN',
        city: 'New Delhi',
        startDate:"20-OCT-2020",
        endDate:"28-OCT-2020",
        status:"Active"
      },
      {
        agenyName: 'Axis tour and travels',
        services: 'Flight',
        country: 'IN',
        city: 'New Delhi',
        startDate:"20-OCT-2020",
        endDate:"28-OCT-2020",
        status:"Active"
      },
      {
        agenyName: 'Axis tour and travels',
        services: 'Flight',
        country: 'IN',
        city: 'New Delhi',
        startDate:"20-OCT-2020",
        endDate:"28-OCT-2020",
        status:"Active"
      },
    ],
  },
};


const defaultValues = {
  objectStatus: '',
  userGroupId: '',
};

const ViewAgencyMapping = () => {
  const { register, handleSubmit, errors, control, getValues, reset } = useForm(
    {
      defaultValues,
    }
  );

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

  const securityGroupList = useSelector(
    (state) => state.AgencyMappingHistory?.items
  );

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

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
    dispatch(
      commonAction(endpoint.office.securityGroupNameList, {
        ofId,
        page: 0,
        size: 100,
      })
    );
  }, []);

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
        commonAction(endpoint.office.AgencyMappingHistory, {
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
    // const securityMessage = utils.checkSecurityGroup(
    //   securityOptionConstant.office.ViewAgencyMapping
    // );

    // if (securityMessage !== '') {
    //   dispatch(utils.showErrorBox(securityMessage));
    //   return;
    // }
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
    history.push(routes.agency.createAgencyGroup);
    utils.setItemToStorage('selectedRegion', null);
  };

  return (
    <div className="ViewAgencyMapping">
    <div className="ViewAgencyMapping-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">AGENCY GROUP</div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.agency.searchAgencyGroup)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <Text
          showLeftBorder={true}
          text="VIEW AGENCY MAPPING"
          className="font-primary-medium-18 my-24"
        />
        <Grid container direction="row" alignItems="flex-end" spacing={3}>
          <Grid item xs={3}>
            <MultiSelect
              label="Service:"
              name="service"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
              disabled={true}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Name:"
              name="groupName"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={true}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Description:"
              name="groupDescription"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={true}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Status:"
              name="status"
              options={[]}
              showBorder={true}
              changeStyle={true}
              width="auto"
              useReactHookForm={false}
              disabled={true}
              value={status}
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="country"
              label="Country:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Country"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="city"
              label="City:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[[]]}
              width="auto"
              placeholder="Select City"
            />
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={3} className="d-flex justify-content-end">
            <Button
              type="submit"
              text="SEARCH"
              className="px-48"
            />
          </Grid>

          
        </Grid>
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
         
          count={response.data.count}
          size={size}
          page={page}
          columnAlignments={['left', 'left', 'center', 'left', 'center', "center"]}
          statusIndex={6}
          tableStyling={[{ paddingLeft: 72 }]}
        />
      )}
    </div>
  );
};

export default ViewAgencyMapping;
