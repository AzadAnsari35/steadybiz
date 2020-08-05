import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { regex } from 'Helpers/validator';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  MultiSelect,
  SelectWithTextInput,
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
import { commonAction, commonActionWithoutApi } from 'Actions/';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import { utils } from 'Helpers';

import './style.scss';

const response = {
  status: 'OK',
  count: 9,
  data: [
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
      officeName: 'Steady Biz level 1',
      officeId: 'DELSTB0001',
      officeType: 'OWN',
      countryCode: 'IN',
      cityName: 'Bangalore',
      mobile: '9900567489',
      currCode: 'INR',
      creaditLimitBalance: '300',
      objectStatusId: 'eb2c823c-790a-44c7-a1fb-777cb9b7caa8',
    },
  ],
};
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
        history.push(routes.office.viewOffice);
        utils.setItemToStorage('selectedOffice', rowNumber);
        break;
      }
      case 'modify': {
        history.push(routes.office.updateOffice);
        dispatch(commonActionWithoutApi(endpoint.office.updateUser, rowNumber));
        utils.setItemToStorage('selectedOffice', rowNumber);
        break;
      }

      case 'search': {
        history.push(routes.office.searchOfficeUser);
        dispatch(commonActionWithoutApi(endpoint.office.updateUser, rowNumber));
        break;
      }

      case 'deposit': {
        history.push(routes.office.searchOfficeUser);
        dispatch(commonActionWithoutApi(endpoint.office.updateUser, rowNumber));
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

const SearchOffice = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

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

  const { register, handleSubmit, errors, control, getValues } = useForm({
    defaultValues: {
      status: '',
      cityCode: '',
      countryCode: '',
      officeType: 'Branch',
    },
  });

  const ofId = utils.getItemFromStorage('officeId');
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel },
    },
  } = userData;

  const searchOffice = useSelector((state) => state.searchOffice?.items);

  useEffect(() => {
    if (requestJson !== null) {
      callSearch(page);
    }
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
    page > 1 && callSearch(page - 1);
  }, [page]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const callSearch = (page) => {
    try {
      setErrorMsg('');
      dispatch(
        commonAction(endpoint.office.searchOffice, {
          ...requestJson,
          page: page - 1,
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

  const handleClick = () => {
    history.push(routes.office.createOffice);
    utils.setItemToStorage('selectedOffice', null);
  };

  return (
    <div className="SearchOffice">
      <div className="SearchOffice-head">
        <div className="font-primary-semibold-24 pb-4">MANAGE OFFICE</div>
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
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Branch', value: 'Branch' },
                  { label: 'Own', value: 'Own' },
                ]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                getValues={getValues}
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
                showValue
                width="auto"
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="City"
                name="cityCode"
                options={[
                  { label: 'New Delhi', value: 'DEL' },
                  { label: 'Mumbai', value: 'BOM' },
                ]}
                placeholder="City"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
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
          bodyData={searchOffice}
          page={page}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={searchOffice.count || 15}
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
          ]}
        />
      )}
    </div>
  );
};

export default SearchOffice;
