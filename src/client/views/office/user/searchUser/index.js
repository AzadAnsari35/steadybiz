import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { dropDownParam } from 'Constants/commonConstant';
import routes from 'Constants/routes';
import { utils } from 'Helpers/index';
import { regex } from 'Helpers/validator';
import useDropDown from 'Hooks/useDropDown';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { securityOptionConstant } from 'Constants';
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
import './style.scss';

const headerData = [
  'FIRST NAME',
  'LAST NAME',
  'LOGIN ID | EMAIL',
  'MOBILE',
  'SECURITY GROUP',
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

  const handleViewUser = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.viewUser
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    history.push(routes.office.viewOfficeUser);
    utils.setItemToStorage(endpoint.office.searchUser.actionType, rowNumber);
    utils.setItemToStorage('selectedUser', rowNumber);
  };

  const handleModifyUser = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.updateUser
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    utils.setItemToStorage(endpoint.office.searchUser.actionType, rowNumber);
    history.push(routes.office.updateOfficeUser);
    utils.setItemToStorage('selectedUser', rowNumber);
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
            onClick={() => handleViewUser()}
          >
            View User
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={() => handleModifyUser()}
          >
            Modify User
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const defaultValues = {
  firstName: '',
  lastName: '',
  emailId: '',
  objectStatus: '',
  mobile: '',
  mobileDialCode: '',
};

const SearchUser = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [requestJson, setReqeustJson] = useState(null);
  const [officeId, setOfficeId] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officeLevel, setOfficeLevel] = useState('');
  const [ofId, setOfId] = useState('');
  const firstPageUpdate = useRef(true);

  let history = useHistory();
  let dispatch = useDispatch();

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

  const searchUser = useSelector((state) => state.searchUser?.items);
  console.log('searchUser', searchUser);
  const searchResult =
    useSelector((state) => state.searchOffice?.items?.data) || [];

    const searchAgency =
    useSelector((state) => state.searchAgency?.items?.data) || [];
    
  console.log('searchResult', searchResult);
  const selectedOffice = utils.getItemFromStorage('selectedOffice') || '';
  const selectedAgency = utils.getItemFromStorage('selectedAgency') ?? "";
   console.log("selectedAgency", Number.isInteger(parseInt(selectedAgency)))
  // console.log('selectedOffice', selectedOffice);

  const getOfficeDetail = () => {
    if (Number.isInteger(parseInt(selectedOffice)) && searchResult.data) {
      let selectedItem = searchResult.data[selectedOffice] || {};
      // console.log('searchResult', searchResult);

      console.log('selectedItem', selectedItem);

      setOfficeId(selectedItem.officeId);
      setOfficeName(selectedItem.officeName);
      setOfficeLevel(1);
      setOfId(selectedItem.ofId);
    }
    else if (Number.isInteger(parseInt(selectedAgency)) && searchAgency.data) {
      let selectedItem = searchAgency.data[selectedAgency] || {};
      // console.log('searchResult', searchResult);

      console.log('selectedItem', selectedItem);

      setOfficeId(selectedItem.officeId);
      setOfficeName(selectedItem.officeName);
      setOfficeLevel(1);
      setOfId(selectedItem.ofId);
    }
    
    else {
      console.log('else....................');
      const {
        userDto: {
          officeDto: { officeName, officeLevel, ofId, officeId },
        },
      } = JSON.parse(utils.getItemFromStorage('userData'));

      setOfficeId(officeId);
      setOfficeName(officeName);
      setOfficeLevel(officeLevel);
      setOfId(ofId);
    }
  };

  const { register, handleSubmit, errors, control, getValues, reset } = useForm(
    {
      defaultValues,
    }
  );

  useEffect(() => {
    getOfficeDetail();
  }, [searchResult]);

  useEffect(() => {
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    callSearch(page);
  }, [page]);

  useEffect(() => {
    if (searchUser != null) {
      const errMsg = utils.checkError(searchUser);
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
  }, [searchUser]);

  useEffect(() => {
    if (requestJson !== null) callSearch(page);
  }, [requestJson]);

  const callSearch = (page) => {
    try {
      setErrorMsg('');
      dispatch(
        commonAction(endpoint.office.searchUser, {
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

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const handleClick = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.createUser
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    history.push(routes.office.createOfficeUser);
    utils.setItemToStorage('selectedUser', '');
  };

  const onSubmit = (data, e) => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.searchUser
    );

    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    setReqeustJson(data);
    setPage(1);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="SearchUser">
      <div className="SearchUser-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">MANAGE USERS</div>
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
            text="SEARCH USER"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextInput
                name="firstName"
                register={register}
                errors={errors}
                label="First Name:"
                validation={{
                  pattern: {
                    value: regex.name,
                    message: 'Please enter the alphabets only.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="lastName"
                register={register}
                errors={errors}
                label="Last Name:"
                validation={{
                  minLength: {
                    value: 2,
                    message: 'Please enter minimum two alphabets',
                  },
                  pattern: {
                    value: regex.name,
                    message: 'Please enter the alphabets only.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="emailId"
                register={register}
                errors={errors}
                label="Login ID | Email :"
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
                label="Mobile Number"
                placeholder="Mobile Number"
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
                // selectValidation={
                //   getValues('mobile') && {
                //     validate: (value) =>
                //       !value && 'Please enter the mobile dial code .',
                //   }
                // }
              />
            </Grid>

            {/* <Grid item xs={3}>
              <MultiSelect
                label="Office Type:"
                name="officeType"
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Branch', value: 'Branch' },
                  { label: 'Own', value: 'Own' },
                ]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
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
            </Grid> */}
            <Grid item xs={3}>
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
            <Grid item xs={9}>
              <div className="d-flex justify-content-end pt-32">
                <Button
                  text="Create"
                  secondary
                  className=" px-48 mr-10"
                  onClick={handleClick}
                />

                <Button type="submit" text="Search" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {searchUser?.status && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerData={headerData}
          bodyData={searchUser.data}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={searchUser.data.count}
          size={size}
          page={page}
          handlePage={handlePage}
          columnAlignments={[
            'left',
            'left',
            'left',
            'center',
            'left',
            'left',
            'center',
          ]}
          statusIndex={5}
          imageIndex={1}
          hideKeys={['userId', 'officeId', 'title']}
        />
      )}
    </div>
  );
};

export default SearchUser;
