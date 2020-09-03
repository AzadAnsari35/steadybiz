import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { commonAction } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import bookingReportData from './bookingReport.json';
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
} from 'Widgets';

import './style.scss';

const headerData = [
  { id: 'bookingDate', value: 'BOOKING DATE'},
  { id: 'officeChannel', value: 'OFFICE CHANNEL'},
  { id: 'officeType', value: 'OFFICE TYPE'},
  { id: 'officeId', value: 'ORDER ID'},
  { id: 'officeLevel', value: 'ORDER LEVEL'},
  { id: 'userName', value: 'USER NAME'},
  { id: 'parentOfficeId', value: 'PARENT OFFICE ID'},
  { id: 'parentOfficeLevel', value: 'PARENT OFFICE LEVEL'},
  { id: 'countryPos', value: 'COUNTRY POS'},
  { id: 'cityPos', value: 'CITY POS'},
  { id: 'orderNo', value: 'ORDER NO.'},
  { id: 'orderStatus', value: 'ORDER STATUS'},
  { id: 'bookingType', value: 'BOOKING TYPE'},
  { id: 'source', value: 'SOURCE'},
  { id: 'sourcePnr', value: 'SOURCE PNR'},
  { id: 'airlinePnr', value: 'AIRLINE PNR'},
  { id: 'ticketTimeLimit', value: 'TICKET TIME LIMIT'},
  { id: 'direction', value: 'DIRECTION'},
  { id: 'cabinClass', value: 'CABIN CLASS'},
  { id: 'departureDate', value: 'DEPARTURE DATE'},
  { id: 'arrivalDate', value: 'ARRIVAL DATE'},
  { id: 'origin', value: 'ORIGIN'},
  { id: 'destination', value: 'DESTINATION'},
  { id: 'airline', value: 'AIRLINE'},
  { id: 'flightNo', value: 'FLIGHT NO.'},
  { id: 'paxCount', value: 'NO. OF PAX'},
  { id: 'bookingClass', value: 'BOOKING CLASS'},
  { id: 'paxName', value: 'PAX NAME'},
  { id: 'ticketNo', value: 'TICKET NO.'},
  { id: 'mobileNo', value: 'MOBILE NO.'},
  { id: 'currency', value: 'CURRENCY'},
  { id: 'baseFare', value: 'BASE FARE', alignment: 'right'},
  { id: 'yq', value: 'YQ'},
  { id: 'yr', value: 'YR'},
  { id: 'airlineMiscTax', value: 'AIRLINE MISC TAX', alignment: 'right'},
  { id: 'totalAmount', value: 'TOTAL AMOUNT', alignment: 'right'},
  { id: 'dealAmount', value: 'DEAL AMOUNT', alignment: 'right'},
  { id: 'segmentDiscount', value: 'SEGMENT DISCOUNT', alignment: 'right'},
  { id: 'commission', value: 'COMMISSION', alignment: 'right'},
  { id: 'incentive', value: 'INCENTIVE', alignment: 'right'},
  { id: 'gdsDiscount', value: 'GDS DISCOUNT', alignment: 'right'},
  { id: 'markup', value: 'MARKUP', alignment: 'right'},
  { id: 'discount', value: 'DISCOUNT', alignment: 'right'},
  { id: 'totalCommission', value: 'TOTAL COMMISSION', alignment: 'right'},
  { id: 'paymentCharges', value: 'PAYMENT CHARGES', alignment: 'right'},
  { id: 'vatGst', value: 'VAT/GST', alignment: 'right'},
  { id: 'paymentMode', value: 'PAYMENT MODE'},
  { id: 'netAmountPaid', value: 'NET AMOUNT PAID', alignment: 'right'},
  { id: 'baseCurrency', value: 'BASE CURRENCY'},
  { id: 'netBaseAmount', value: 'NET BASE AMOUNT', alignment: 'right'},
  // 'BOOKING DATE',
  // 'OFFICE CHANNEL',
  // 'OFFICE TYPE',
  // 'ORDER ID',
  // 'ORDER LEVEL',
  // 'USER NAME',
  // 'PARENT OFFICE ID',
  // 'PARENT OFFICE LEVEL',
  // 'COUNTRY POS',
  // 'CITY POS',
  // 'ORDER NO.',
  // 'ORDER STATUS',
  // 'BOOKING TYPE',
  // 'SOURCE',
  // 'SOURCE PNR',
  // 'AIRLINE PNR',
  // 'TICKET TIME LIMIT',
  // 'DIRECTION',
  // 'CABIN CLASS',
  // 'DEPARTURE DATE',
  // 'ARRIVAL DATE',
  // 'ORIGIN',
  // 'DESTINATION',
  // 'AIRLINE',
  // 'FLIGHT NO.',
  // 'NO. OF PAX',
  // 'BOOKING CLASS',
  // 'PAX NAME',
  // 'TICKET NO.',
  // 'MOBILE NO.',
  // 'CURRENCY',
  // 'BASE FARE',
  // 'YQ',
  // 'YR',
  // 'AIRLINE MISC TAX',
  // 'TOTAL AMOUNT',
  // 'DEAL AMOUNT',
  // 'SEGMENT DISCOUNT',
  // 'COMMISSION',
  // 'INCENTIVE',
  // 'GDS DISCOUNT',
  // 'MARKUP',
  // 'DISCOUNT',
  // 'TOTAL COMMISSION',
  // 'PAYMENT CHARGES',
  // 'VAT/GST',
  // 'PAYMENT MODE',
  // 'NET AMOUNT PAID',
  // 'BASE CURRENCY',
  // 'NET BASE AMOUNT',
];

const hideKeys = [
  'officeChannel',
  'officeType',
  // 'officeLevel',
  // 'userName',
  // 'parentOfficeId',
  // 'parentOfficeLevel',
  // 'countryPos',
  // 'cityPos',
  // 'orderStatus',
  // 'bookingType',
  // 'source',
  // 'airlinePnr',
  // 'ticketTimeLimit',
  // 'direction',
  // 'cabinClass',
  // 'departureDate',
  // 'arrivalDate',
  // 'origin',
  // 'destination',
  // 'airline',
  // 'flightNo',
  // 'paxCount',
  // 'bookingClass',
  // 'paxName',
  // 'ticketNo',
  // 'mobileNo',
  // 'baseFare',
  // 'yq',
  // 'yr',
  // 'airlineMiscTax',
  // 'dealAmount',
  // 'segmentDiscount',
  // 'commission',
  // 'incentive',
  // 'gdsDiscount',
  // 'markup',
  // 'discount',
  // 'paymentCharges',
  // 'vatGst',
  // 'paymentMode',
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
  const viewOrder = (orderNumber, type) => {
    dispatch(utils.HideAlertBox());
    utils.setItemToStorage('searchOrderActionType', type);
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

    let selectedItem = searchResult.data.data[rowNumber];

    let orderNo = selectedItem.orderNo;
    // orderNo = 'OKT0000000155';
    //console.log(orderNo);
    switch (selectedOption) {
      case 'view': {
        viewOrder(orderNo, 'view');

        break;
      }
      case 'issue': {
        viewOrder(orderNo, 'retieve');

        break;
      }

      case 'viewBooking': {
        viewOrder(orderNo, 'view');

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
          {actualStatus === 'HOLD_PNR' ||
            actualStatus === 'PNR_CANCELLED' ||
            (actualStatus === 'FAILED_PNR' && (
              <div
                className="font-primary-regular-14 cursor-pointer"
                onClick={handleClick}
                name="view"
              >
                View PNR{' '}
              </div>
            ))}
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
        </div>
      </SimplePopover>
    </>
  );
};

const BookingReport = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const firstPageUpdate = useRef(true);
  let history = useHistory();
  let dispatch = useDispatch();
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel },
    },
  } = userData;
  const defaultValues = {
    orderNo: '',
    pnr: '',
    origin: '',
    destination: '',
    paxSearchValue: '',
    paxInfoType: '',
    bookingCategory: '',
    officeID: officeId,
  };
  const [formData, setFormData] = useState({
    pnrNumber: '',
  });

  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues,
  });

  const ofId = utils.getItemFromStorage('officeId');

  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const viewPNR = useSelector(
    (state) => state[endpoint.orders.viewOrder.reducerName]?.items
  );

  useEffect(() => {
    //console.log(viewPNR);
    const actionType = utils.getItemFromStorage('searchOrderActionType');
    // console.log(actionType);
    // alert(actionType);
    if (viewPNR != null && actionType != '') {
      const error = utils.checkError(viewPNR);
      if (error == '') {
        utils.setItemToStorage('searchOrderActionType', '');
        if (actionType == 'view') history.push(routes.transaction.viewPNR);
        else if (actionType == 'retieve')
          history.push(routes.transaction.issueTicket);
        else history.push(routes.transaction.viewBooking);
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
    //console.log('hi', requestJson);
    try {
      dispatch(
        commonAction(endpoint.orders.searchOrders, {
          ...requestJson,
          page: page - 1,
          size,
          ofid: ofId,
        })
      );
    } catch (err) {
      dispatch(utils.showErrorBox(err.message));
    }
  };
  const handelPaxInfoType = (e) => {
    alert(e);
  };
  const onSubmit = (data) => {
    // console.log('data', data);
    setPage(1);
    setReqeustJson(data);
    //setPage(1);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="BookingReport">
      <div className="BookingReport-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">BOOKING REPORT</div>
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
            text="SEARCH BOOKING REPORT"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {/* <SelectWithDatePickers
                name={{
                  select: 'booking',
                  datePicker1: 'dateFrom',
                  datePicker2: 'dateTo',
                }}
                control={control}
                showValue
                label="Date:"
                isSearchable
              /> */}
              <SelectWithDatePickers
                name={{
                  select: 'booking',
                  datePicker1: 'dateFrom',
                  datePicker2: 'dateTo',
                }}
                data={[
                  {
                    value: 'booking',
                    label: 'Booking',
                  },
                  {
                    value: 'travel',
                    label: 'Travel',
                  }
                ]}
                defaultValues={
                  {
                    select: {
                      value: 'booking',
                      label: 'Booking',
                    }
                  } 
                }
                label="Date:"
                isSearchable
                control={control}
                useReactHookForm={false}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Origin:"
                name="origin"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Destination:"
                name="destination"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Order Number:"
                placeholder="Order Number"
                name="orderNo"
                useReactHookForm={false}
                maxLength={13}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="pnr"
                selectInputName="sabre"
                type="text"
                label="PNR: "
                selectPlaceholder="Sabre"
                placeholder="PNR Number"
                value={formData.pnrNumber}
                data={[
                  { value: 'Sabre', label: 'Sabre (1S)' },
                  { value: 'Airline', label: 'Airline' },
                ]}
                showValue
                useReactHookForm={false}
                selectWidth="50%"
                // onChange={handleChange}
                // onSelectChange={handleSelectOption}
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                label="Booking Category:"
                name="bookingCategory"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
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
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
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
                label="Office Type:"
                name="officeType"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                isSearchable
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Office ID:"
                name="officeID"
                register={register}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                label="User Name:"
                name="userName"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
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
                label="Country POS:"
                name="countryPos"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
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
                label="City POS:"
                name="cityPos"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
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
                label="Transaction Status:"
                name="transactionStatus"
                options={[
                  { value: 'P', label: 'PNR' },
                  { value: 'B', label: 'Booking' },
                ]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                isSearchable
              />
            </Grid>
            <Grid item xs={12}>
              <div className="d-flex justify-content-end pt-32">
                <Button
                  text="CHANGE OFFICE"
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
      {bookingReportData && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerInArrOfObjFormat
          headerData={headerData}
          subHeaderData={bookingReportData.data.data.subHeaderData}
          // bodyData={searchResult.data}
          bodyData={bookingReportData.data.data}
          page={page}
          // AddElement={{
          //   last: <PopoverAction />,
          // }}
          // count={searchResult.data.count}
          count={bookingReportData.data.count}
          size={size}
          columnAlignments={[
            'center',
            'center',
            'center',
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
          // hideKeys={['actualStatus', 'officeId']}
          hideKeys={hideKeys}
        />
      )}
    </div>
  );
};

export default BookingReport;
