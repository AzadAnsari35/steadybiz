import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import React, { useEffect, useState } from 'react';
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

import './style.scss';

const headerData = ['Security Group Name', 'Last Updated', 'Status', 'Action'];

const response = {
  status: true,
  data: {
    status: 'OK',
    count: 3,
    data: [
      {
        securityGroup: 'Admin',
        Status: 'Active',
      },
      {
        securityGroup: 'MIS Finance',
        Status: 'Inactive',
      },
      {
        securityGroup: 'Account',
        Status: 'Freeze',
      },
    ],
  },
};

const PopoverAction = ({ rowNumber }) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        utils.setItemToStorage('selectedSecurityGroup', rowNumber);
        break;
      }
      case 'modify': {
        utils.setItemToStorage('selectedSecurityGroup', rowNumber);
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
        <div className="SearchSecurityGroup-tableAction d-flex flex-direction-column">
          <Link
            to={routes.office.viewSecurityGroup}
            className="font-primary-regular-14"
            onClick={handleClick}
            name="view"
          >
            View Security Group
          </Link>
          <Link
            to={routes.office.updateSecurityGroup}
            className="font-primary-regular-14"
            onClick={handleClick}
            name="modify"
          >
            Modify Security Group
          </Link>
        </div>
      </SimplePopover>
    </>
  );
};

const defaultValues = {
  objectStatus: '',
  securityGroupName: '',
};

const SearchSecurityGroup = () => {
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

  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = userData;

  const securityGroupList = useSelector(
    (state) => state.searchSecurityGroup?.items
  );

  const securityGroupNameList = useSelector(
    (state) => state.securityGroupNameList?.items?.data
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

  const callSearch = (page) => {
    try {
      dispatch(
        commonAction(endpoint.office.searchSecurityGroup, {
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

  const onSubmit = (data, e) => {
    console.log('data', data);
    setReqeustJson(data);
  };

  const handleReset = () => {
    reset(defaultValues);
  };
  return (
    <div className="SearchSecurityGroup">
      <div className="SearchSecurityGroup-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">SECURITY GROUP</div>
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
            text="Search Security Group"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <MultiSelect
                label="Security Group Name:"
                name="securityGroupName"
                options={securityGroupNameList?.data || []}
                valueKey="label"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
              />
            </Grid>

            <Grid item xs={6}>
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
              />
            </Grid>
            <Grid item xs={12} className="d-flex justify-content-end pt-32">
              <Button
                text="Create"
                secondary
                className=" px-48 mr-10"
                onClick={() => history.push(routes.office.createSecurityGroup)}
              />

              <Button type="submit" text="Search" className=" px-48" />
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {securityGroupList?.status && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerData={headerData}
          bodyData={securityGroupList?.data}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={securityGroupList.data.count}
          size={size}
          columnAlignments={['left', 'center', 'left', 'center']}
          statusIndex={2}
          tableStyling={[{ paddingLeft: 72 }]}
          hideKeys={['userGroupId', 'functionGroups']}
        />
      )}
    </div>
  );
};

export default SearchSecurityGroup;