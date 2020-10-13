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
  'SECURITY GROUP NAME',
  'SERVICES',
  'LAST UPDATED',
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
        regionName: 'MIS Finance',
        Description: 'Flight',
        lastUpdated: '07-OCT-2020 | 16:00',
        Status: 'Active',
      },
      {
        regionName: 'MIS Finance',
        Description: 'Flight',
        lastUpdated: '07-OCT-2020 | 16:00',
        Status: 'Active',
      },
      {
        regionName: 'MIS Finance',
        Description: 'Flight',
        lastUpdated: '07-OCT-2020 | 16:00',
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
        utils.setItemToStorage('selectedAgencyGroup', rowNumber);
        history.push(routes.agency.viewAgencyGroup);
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
        utils.setItemToStorage('selectedAgencyGroup', rowNumber);
        history.push(routes.agency.modifyAgencyGroup);
        break;
      }

      case 'history': {
        // const securityMessage = utils.checkSecurityGroup(
        //   securityOptionConstant.office.updateSecurityGroup
        // );

        // if (securityMessage !== '') {
        //   dispatch(utils.showErrorBox(securityMessage));
        //   return;
        // }
        utils.setItemToStorage('selectedAgencyGroup', rowNumber);
        history.push(routes.agency.agencyGroupHistory);
        break;
      }

      case 'createMapping': {
        history.push(routes.agency.createAgencyMapping);
        break;
      }

      case 'viewMapping': {
        history.push(routes.agency.viewAgencyMapping);
        break;
      }

      case 'modifyMapping': {
        history.push(routes.agency.modifyAgencyMapping);
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
          className="SearchAgencyGroup-tableAction d-flex flex-direction-column"
          onClick={handleClick}
        >
          <div className="font-primary-regular-14" name="view">
            View Agency Group
          </div>
          <div className="font-primary-regular-14" name="modify">
            Modify Agency Group
          </div>
          <div className="font-primary-regular-14" name="history">
            Agency Group History
          </div>
          <div className="font-primary-regular-14" name="createMapping">
            Create Agency Mapping
          </div>
          <div className="font-primary-regular-14" name="viewMapping">
            View Agency Mapping
          </div>
          <div className="font-primary-regular-14" name="modifyMapping">
            Modify Agency Mapping
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const defaultValues = {
  objectStatus: '',
  userGroupId: '',
};

const SearchAgencyGroup = () => {
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
    (state) => state.SearchAgencyGroup?.items
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
        commonAction(endpoint.office.SearchAgencyGroup, {
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
    //   securityOptionConstant.office.SearchAgencyGroup
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
    <div className="SearchAgencyGroup">
      <div className="SearchAgencyGroup-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">AGENCY GROUP</div>
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
            text="SEARCH AGENCY GROUP"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <MultiSelect
                label="Service:"
                name="service"
                options={[]}
                valueKey="label"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>

            <Grid item xs={4}>
              <MultiSelect
                label="Group Name:"
                name="groupName"
                options={[]}
                valueKey="label"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
              />
            </Grid>

            <Grid item xs={4}>
              <MultiSelect
                label="Status:"
                name="objectStatus"
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
            <Grid item xs={12} className="d-flex justify-content-end pt-32">
              <Button
                text="Mapping History"
                secondary
                className=" px-48 mr-10"
                onClick={() => history.push(routes.agency.agencyMappingHistory)}
              />

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
          columnAlignments={['left', 'left', 'center', 'left', 'center']}
          statusIndex={3}
          tableStyling={[{ paddingLeft: 72 }]}
        />
      )}
    </div>
  );
};

export default SearchAgencyGroup;
