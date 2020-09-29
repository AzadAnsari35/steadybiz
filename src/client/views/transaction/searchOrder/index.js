import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { regex } from 'Helpers/validator';
import ChangeOffice from 'Components/Offices/ChangeOffice';
import useDropDown from 'Hooks/useDropDown';
import moment from 'moment';
import { dropDownParam } from 'Constants/commonConstant';
import useToggle from 'Hooks/useToggle';
import {
  PNR_STATUS,
  PNR_TYPE,
  //BOOKING_CATEGORY,
  SEARCH_DATE_TYPE,
} from 'Constants/commonConstant';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import {
  Button,
  IconWithBackground,
  MultiSelect,
  PrimaryTable,
  PrimaryTableHeader,
  SelectWithDatePickers,
  SelectWithTextInput,
  SimplePopover,
  Text,
  TextInput,
  AutoSuggest,
  CustomDrawer,
} from 'Widgets';
import securityOptionConstant from 'Constants/securityOptionConstant';
import './style.scss';

const headerData = [
  'BOOKING DATE',
  'ORDER#',
  'SOURCE',
  'SOURCE PNR',
  'AIRLINE PNR',
  'TRAVEL DATE',
  'PAX NAME',
  'SECTOR',
  'MOBILE',
  'STATUS',
  'TIME LIMIT',
  'ACTION',
];

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items?.data
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
  const viewOrder = (orderNumber, type, routeUrl) => {
    dispatch(utils.HideAlertBox());
    utils.setItemToStorage('searchOrderRedirectRouteURL', routeUrl);
    dispatch(
      commonAction(endpoint.orders.viewOrder, {
        orderNumber: orderNumber,
        type: type,
      })
    );
  };

  const actualStatus = searchResult?.data[rowNumber]?.actualStatus;

  //console.log('rowNumber', status);
  //const retieveOrder = (orderNo) => {};
  const handleClick = (e) => {
    const selectedOption = e.currentTarget.getAttribute('name');

    let selectedItem = searchResult.data[rowNumber];
    //alert(selectedItem.orderNo);
    let orderNo = selectedItem.orderNo;
    // orderNo = 'OKT0000000155';
    //console.log(orderNo);
    switch (selectedOption) {
      case 'view': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.transaction.viewOrder
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        const actualStatus = e.currentTarget.getAttribute('actualStatus');
        if (actualStatus === 'PNR_CANCELLED')
          viewOrder(orderNo, 'view', routes.transaction.viewPNR);
        else viewOrder(orderNo, 'retieve', routes.transaction.viewPNR);

        break;
      }
      case 'cancel': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.transaction.viewOrder
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }

        viewOrder(orderNo, 'retieve', routes.transaction.cancelPNR);

        break;
      }
      case 'issue': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.flights.issueTicket
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        viewOrder(orderNo, 'retieve', routes.transaction.issueTicket);

        break;
      }

      case 'viewBooking': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.transaction.viewBooking
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        viewOrder(orderNo, 'view', routes.transaction.viewBooking);

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
          {(actualStatus === 'HOLD_PNR' ||
            actualStatus === 'PNR_CANCELLED' ||
            actualStatus === 'SEGMENT_UNCONFIRMED') && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="view"
              actualStatus={actualStatus}
            >
              View PNR{' '}
            </div>
          )}
          {actualStatus === 'HOLD_PNR' && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="issue"
            >
              Issue Ticket{' '}
            </div>
          )}
          {actualStatus === 'BOOKED' && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="viewBooking"
            >
              View Booking{' '}
            </div>
          )}
          {actualStatus === 'HOLD_PNR' && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="cancel"
              actualStatus={actualStatus}
            >
              Cancel PNR{' '}
            </div>
          )}
        </div>
      </SimplePopover>
    </>
  );
};
const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};
const SearchOrder = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [stateKey, setStateKey] = useState(true);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [showChangeOffice, setShowChangeOffice] = useToggle(false);
  const firstPageUpdate = useRef(true);
  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    'masterCountries'
  );
  let history = useHistory();
  let dispatch = useDispatch();
  const [userNameList, setUserNameList] = createEndpoint();
  const userNameListData = userNameList
    ? userNameList.status
      ? userNameList?.data
      : []
    : [];
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  // const ofId = utils.getItemFromStorage('officeId');
  const {
    userDto: {
      officeDto: { ofId, officeId, officeName, officeLevel },
    },
  } = userData;
  //console.log('ffff', ofId);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
  });
  const defaultValues = {
    orderNo: '',
    pnrType: '',
    pnr: '',

    paxSearchValue: '',
    paxInfoType: '',
    bookingCategory: '',
    ticketNumber: '',
    bookingStatus: '',
    mobileDialCode: '',
    mobile: '',
    userId: '',
    officeID: officeId,
    ofID: ofId,

    DateType: '',
    dateFrom: moment(new Date()),
    dateTo: moment(new Date()),
  };

  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    getUserNameList(ofId);
  }, []);
  const getUserNameList = (officeId) => {
    setUserNameList(endpoint.office.searchUserDropDown, {
      ofid: officeId,
    });
  };
  // useEffect(() => {
  //   // console.log('formData.officeId::: ', formData.officeId);
  //   //getUserNameList(formData.ofId);
  // }, [getValues('officeId')]);
  const handleChangeOfficeClick = (officeDetail) => {
    console.log('officeId::: ', officeDetail);
    setShowChangeOffice();
    setValue('officeID', officeDetail.officeId);
    setValue('ofID', officeDetail.ofId);
    getUserNameList(officeDetail.ofId);
  };

  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const viewPNR = useSelector(
    (state) => state[endpoint.orders.viewOrder.reducerName]?.items
  );

  useEffect(() => {
    //console.log(viewPNR);
    const routeUrl = utils.getItemFromStorage('searchOrderRedirectRouteURL');
    // console.log(actionType);
    // alert(actionType);
    if (viewPNR != null && routeUrl != '') {
      const error = utils.checkError(viewPNR);
      if (error == '') {
        utils.setItemToStorage('searchOrderRedirectRouteURL', '');
        history.push(routeUrl);
      } else dispatch(utils.showErrorBox(error));
    }
  }, [viewPNR]);
  useEffect(() => {
    if (requestJson !== null) {
      dispatch(utils.HideAlertBox());
      callSearch(page);
    }
  }, [requestJson]);

  useEffect(() => {
    if (searchResult != null) {
      const errMsg = utils.checkError(searchResult);
      if (errMsg !== '') {
        dispatch(utils.showErrorBox(errMsg));
      }
    }
  }, [searchResult]);

  useEffect(() => {
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    callSearch(page);
  }, [page]);

  const handlePage = (newPage) => {
    // console.log(newPage);
    setPage(newPage);
  };

  const callSearch = (page) => {
    console.log('hi', requestJson);
    try {
      const securityMessage = utils.checkSecurityGroup(
        securityOptionConstant.transaction.searchOrder
      );
      if (securityMessage !== '') {
        dispatch(utils.showErrorBox(securityMessage));
        return;
      }
      dispatch(
        commonAction(endpoint.orders.searchOrders, {
          ...requestJson,
          page: page - 1,
          size,
        })
      );
    } catch (err) {
      dispatch(utils.showErrorBox(err.message));
    }
  };
  const handelPaxInfoType = (e) => {
    alert(e);
  };

  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onSubmit = (data) => {
    // console.log('data', data);
    setPage(1);
    //alert(formData.origin);
    const originCode = formData.origin?.code ? formData.origin.code : '';
    const destinationCode = formData.destination?.code
      ? formData.destination.code
      : '';

    if (originCode != '' || destinationCode != '') {
      if (originCode == destinationCode) {
        dispatch(utils.showErrorBox('origin and destination can not be same'));
        return;
      }
      if (originCode == '' || destinationCode == '') {
        dispatch(utils.showErrorBox('please enter origin and destination'));
        return;
      }
    }
    setReqeustJson({
      ...data,
      origin: originCode,
      destination: destinationCode,
    });
    //setPage(1);
  };

  const handleReset = () => {
    reset(defaultValues);
    setStateKey(!stateKey);
    //this.refs[`autocomplete`].setState({ searchText: '' });
    setFormData({ origin: '', destination: '' });
  };

  return (
    <div className="SearchOrder">
      <div className="SearchOrder-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">SEARCH ORDER</div>
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
          <input type="hidden" name="size" value={size} ref={register}></input>

          <Text
            showLeftBorder={true}
            text="SEARCH PNR | BOOKING"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextInput
                label="Order Number:"
                placeholder="Order Number"
                name="orderNo"
                register={register}
                errors={errors}
                maxLength={13}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="pnr"
                selectInputName="pnrType"
                data={PNR_TYPE}
                label="PNR: "
                placeholder="PNR Number"
                selectPlaceholder="Sabre"
                errors={errors}
                register={register}
                control={control}
                selectWidth="50%"
                isSearchable
                maxLength={6}
              />
            </Grid>

            <Grid item xs={3}>
              <AutoSuggest
                id="origin"
                name="origin"
                label="Origin:"
                isSearchBar={false}
                onSelectSuggestion={handleInputChange}
                stateKey={stateKey}
                // initialValue={initialDepartureAirport}
              />
              {/* <TextInput
                label="Origin:"
                name="origin"
                register={register}
                //ref={register({ maxLength: 3 })}
                maxLength={3}
                errors={errors}
              /> */}
            </Grid>

            <Grid item xs={3}>
              <AutoSuggest
                id="destination"
                label="Destination:"
                isSearchBar={false}
                // initialValue={initialDepartureAirport}
                onSelectSuggestion={handleInputChange}
                stateKey={stateKey}
              />
              {/* <TextInput
                label="Destination:"
                name="destination"
                register={register}
                errors={errors}
                maxLength={3}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <SelectWithDatePickers
                name={{
                  select: 'DateType',
                  datePicker1: 'dateFrom',
                  datePicker2: 'dateTo',
                }}
                data={SEARCH_DATE_TYPE}
                defaultValues={{
                  //select: SEARCH_DATE_TYPE[1],
                  datePicker1: new Date(),
                  datePicker2: new Date(),
                }}
                control={control}
                register={register}
                selectPlaceholder="Booking"
                label="Date:"
                isSearchable
                defaultValues={{
                  datePicker1: '',
                  datePicker2: '',
                }}
                disableFutureDatesDatePicker1={
                  getValues('DateType') === '' || getValues('DateType') === 'B'
                }
                disableFutureDatesDatePicker2={
                  getValues('DateType') === '' || getValues('DateType') === 'B'
                }
              />
            </Grid>

            <Grid item xs={3}>
              {/* <MultiSelect
                  label="Booking Category:"
                  name="bookingCategory"
                  options={BOOKING_CATEGORY}
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  width="auto"
                  placeholder="All"
                  isSearchable
                /> */}

              <TextInput
                label="Ticket No:"
                name="ticketNumber"
                register={register}
                errors={errors}
                maxLength={15}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="mobile"
                selectInputName="mobileDialCode"
                data={countriesDialCodeList.dropDownItems}
                label="Pax Mobile"
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
              <TextInput
                type="hidden"
                name="ofID"
                register={register}
                control={control}
                errors={errors}
              />
              <TextInput
                label="Office ID:"
                name="officeID"
                register={register}
                control={control}
                errors={errors}
                disabled={true}
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="User Name:"
                name="userId"
                options={userNameListData}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                placeholder="All"
                isSearchable
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="paxSearchValue"
                selectInputName="paxInfoType"
                data={[
                  { value: 'L', label: 'Last Name' },
                  { value: 'E', label: 'Email ID' },
                ]}
                label="PAX Info:"
                placeholder=""
                selectPlaceholder="Last Name"
                errors={errors}
                register={register}
                control={control}
                onSelectChange={handelPaxInfoType}
                selectWidth="50%"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Transaction Status:"
                name="bookingStatus"
                options={PNR_STATUS}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                placeholder="All"
                isMulti
                isSearchable
              />
            </Grid>
            <Grid item xs={9}>
              {' '}
            </Grid>
            <Grid item xs={3}>
              <div className="d-flex justify-content-end pt-32">
                <Button
                  text="CHANGE OFFICE"
                  secondary
                  className=" px-48 mr-10"
                  onClick={() => setShowChangeOffice()}
                />

                <Button type="submit" text="Search" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {searchResult?.status && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerData={headerData}
          bodyData={searchResult.data}
          page={page}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={searchResult.data.count}
          size={size}
          columnAlignments={[
            'center',
            'center',
            'left',
            'center',
            'center',
            'center',
            'left',
            'center',
            'center',
            'center',
          ]}
          statusIndex={8}
          handlePage={handlePage}
          hideKeys={['actualStatus', 'officeId']}
        />
      )}
      <CustomDrawer
        title="CHANGE OFFICE"
        showDrawer={showChangeOffice}
        onCloseClick={setShowChangeOffice}
        width={1150}
        className="BookingReport-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </div>
  );
};

export default SearchOrder;
