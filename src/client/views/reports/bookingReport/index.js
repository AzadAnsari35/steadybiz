import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChangeOffice from 'Components/Offices/ChangeOffice';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import bookingReportData from './bookingReport.json';
import {
  BOOKING_CATEGORY,
  officeType,
  PNR_STATUS,
  SEARCH_DATE_TYPE,
  OFFICE_CHANNEL,
  dropDownParam,
} from 'Constants/commonConstant';
import { commonAction } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import useDropDown from 'Hooks/useDropDown';
import useCheckboxData from 'Hooks/useCheckboxData';

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
  CustomDrawer,
  AutoSuggest,
} from 'Widgets';
import useToggle from 'Hooks/useToggle';

import './style.scss';
import { customAddDays, displayImage } from 'Helpers/utils';
import BookingReportsTableHeader from 'Components/Common/BookingReportsTableHeader/index';
import useDropDownApi from 'Hooks/useDropDownApi';

const BOOKING_REPORT_FILED_SELECTION_OPTIONS = [
  { value: 'bookingDate', label: 'BOOKING DATE' },
  { value: 'officeChannel', label: 'OFFICE CHANNEL' },
  { value: 'officeType', label: 'OFFICE TYPE' },
  { value: 'officeId', label: 'ORDER ID' },
  { value: 'officeLevel', label: 'ORDER LEVEL' },
  { value: 'userName', label: 'USER NAME' },
  { value: 'parentOfficeId', label: 'PARENT OFFICE ID' },
  { value: 'parentOfficeLevel', label: 'PARENT OFFICE LEVEL' },
  { value: 'countryPos', label: 'COUNTRY POS' },
  { value: 'cityPos', label: 'CITY POS' },
  { value: 'orderNo', label: 'ORDER NO.' },
  { value: 'orderStatus', label: 'ORDER STATUS' },
  { value: 'bookingType', label: 'BOOKING TYPE' },
  { value: 'source', label: 'SOURCE' },
  { value: 'sourcePnr', label: 'SOURCE PNR' },
  { value: 'airlinePnr', label: 'AIRLINE PNR' },
  { value: 'ticketTimeLimit', label: 'TICKET TIME LIMIT' },
  { value: 'direction', label: 'DIRECTION' },
  { value: 'cabinClass', label: 'CABIN CLASS' },
  { value: 'departureDate', label: 'DEPARTURE DATE' },
  { value: 'arrivalDate', label: 'ARRIVAL DATE' },
  { value: 'origin', label: 'ORIGIN' },
  { value: 'destination', label: 'DESTINATION' },
  { value: 'airline', label: 'AIRLINE' },
  { value: 'flightNo', label: 'FLIGHT NO.' },
  { value: 'paxCount', label: 'NO. OF PAX' },
  { value: 'bookingClass', label: 'BOOKING CLASS' },
  { value: 'paxName', label: 'PAX NAME' },
  { value: 'ticketNo', label: 'TICKET NO.' },
  { value: 'mobileNo', label: 'MOBILE NO.' },
  { value: 'currency', label: 'CURRENCY' },
  { value: 'baseFare', label: 'BASE FARE' },
  { value: 'yq', label: 'YQ' },
  { value: 'yr', label: 'YR' },
  { value: 'airlineMiscTax', label: 'AIRLINE MISC TAX' },
  { value: 'totalAmount', label: 'TOTAL AMOUNT' },
  { value: 'dealAmount', label: 'DEAL AMOUNT' },
  { value: 'segmentDiscount', label: 'SEGMENT DISCOUNT' },
  { value: 'commission', label: 'COMMISSION' },
  { value: 'incentive', label: 'INCENTIVE' },
  { value: 'gdsDiscount', label: 'GDS DISCOUNT' },
  { value: 'markup', label: 'MARKUP' },
  { value: 'discount', label: 'DISCOUNT' },
  { value: 'totalCommission', label: 'TOTAL COMMISSION' },
  { value: 'paymentCharges', label: 'PAYMENT CHARGES' },
  { value: 'vatGst', label: 'VAT/GST' },
  { value: 'paymentMode', label: 'PAYMENT MODE' },
  { value: 'netAmountPaid', label: 'NET AMOUNT PAID' },
  { value: 'baseCurrency', label: 'BASE CURRENCY' },
  { value: 'netBaseAmount', label: 'NET BASE AMOUNT' },
];

const headerData = [
  { id: 'title', value: 'PARENT', alignment: 'center' },
  { id: 'bookingDate', value: 'BOOKING DATE', alignment: 'center' },
  { id: 'officeChannel', value: 'OFFICE CHANNEL', alignment: 'center' },
  { id: 'officeType', value: 'OFFICE TYPE', alignment: 'center' },
  { id: 'officeId', value: 'ORDER ID', alignment: 'center' },
  { id: 'officeLevel', value: 'ORDER LEVEL', alignment: 'center' },
  { id: 'userName', value: 'USER NAME', alignment: 'center' },
  { id: 'parentOfficeId', value: 'PARENT OFFICE ID', alignment: 'center' },
  {
    id: 'parentOfficeLevel',
    value: 'PARENT OFFICE LEVEL',
    alignment: 'center',
  },
  { id: 'countryPos', value: 'COUNTRY POS', alignment: 'center' },
  { id: 'cityPos', value: 'CITY POS', alignment: 'center' },
  { id: 'orderNo', value: 'ORDER NO.', alignment: 'center' },
  { id: 'orderStatus', value: 'ORDER STATUS', alignment: 'center' },
  { id: 'bookingType', value: 'BOOKING TYPE', alignment: 'center' },
  { id: 'source', value: 'SOURCE', alignment: 'center' },
  { id: 'sourcePnr', value: 'SOURCE PNR', alignment: 'center' },
  { id: 'airlinePnr', value: 'AIRLINE PNR', alignment: 'center' },
  { id: 'ticketTimeLimit', value: 'TICKET TIME LIMIT', alignment: 'center' },
  { id: 'direction', value: 'DIRECTION', alignment: 'center' },
  { id: 'cabinClass', value: 'CABIN CLASS', alignment: 'center' },
  { id: 'departureDate', value: 'DEPARTURE DATE', alignment: 'center' },
  { id: 'arrivalDate', value: 'ARRIVAL DATE', alignment: 'center' },
  { id: 'origin', value: 'ORIGIN', alignment: 'center' },
  { id: 'destination', value: 'DESTINATION', alignment: 'center' },
  { id: 'airline', value: 'AIRLINE', alignment: 'center' },
  { id: 'flightNo', value: 'FLIGHT NO.', alignment: 'center' },
  { id: 'paxCount', value: 'NO. OF PAX', alignment: 'center' },
  { id: 'bookingClass', value: 'BOOKING CLASS', alignment: 'center' },
  { id: 'paxName', value: 'PAX NAME', alignment: 'center' },
  { id: 'ticketNo', value: 'TICKET NO.', alignment: 'center' },
  { id: 'mobileNo', value: 'MOBILE NO.', alignment: 'center' },
  { id: 'currency', value: 'CURRENCY', alignment: 'center' },
  { id: 'baseFare', value: 'BASE FARE', alignment: 'right' },
  { id: 'yq', value: 'YQ', alignment: 'center' },
  { id: 'yr', value: 'YR', alignment: 'center' },
  { id: 'airlineMiscTax', value: 'AIRLINE MISC TAX', alignment: 'right' },
  { id: 'totalAmount', value: 'TOTAL AMOUNT', alignment: 'right' },
  { id: 'dealAmount', value: 'DEAL AMOUNT', alignment: 'right' },
  { id: 'segmentDiscount', value: 'SEGMENT DISCOUNT', alignment: 'right' },
  { id: 'commission', value: 'COMMISSION', alignment: 'right' },
  { id: 'incentive', value: 'INCENTIVE', alignment: 'right' },
  { id: 'gdsDiscount', value: 'GDS DISCOUNT', alignment: 'right' },
  { id: 'markup', value: 'MARKUP', alignment: 'right' },
  { id: 'discount', value: 'DISCOUNT', alignment: 'right' },
  { id: 'totalCommission', value: 'TOTAL COMMISSION', alignment: 'right' },
  { id: 'paymentCharges', value: 'PAYMENT CHARGES', alignment: 'right' },
  { id: 'vatGst', value: 'VAT/GST', alignment: 'right' },
  { id: 'paymentMode', value: 'PAYMENT MODE', alignment: 'center' },
  { id: 'netAmountPaid', value: 'NET AMOUNT PAID', alignment: 'right' },
  { id: 'baseCurrency', value: 'BASE CURRENCY', alignment: 'center' },
  { id: 'netBaseAmount', value: 'NET BASE AMOUNT', alignment: 'right' },
];

const hideKeys = [
  'officeChannel',
  'officeType',
  'officeLevel',
  'userName',
  'parentOfficeId',
  'parentOfficeLevel',
  'countryPos',
  'cityPos',
  'orderStatus',
  'bookingType',
  'source',
  'airlinePnr',
  'ticketTimeLimit',
  'direction',
  'cabinClass',
  'departureDate',
  'arrivalDate',
  'origin',
  'destination',
  'airline',
  'flightNo',
  'paxCount',
  'bookingClass',
  'paxName',
  'ticketNo',
  'mobileNo',
  'baseFare',
  'yq',
  'yr',
  'airlineMiscTax',
  'dealAmount',
  'segmentDiscount',
  'commission',
  'incentive',
  'gdsDiscount',
  'markup',
  'discount',
  'paymentCharges',
  'vatGst',
  'paymentMode',
];
const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const BookingReport = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const firstPageUpdate = useRef(true);
  const [stateKey, setStateKey] = useState(true);
  const [showChangeOffice, setShowChangeOffice] = useToggle(false);

  let dispatch = useDispatch();
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: {
        ofId,
        officeId,
        officeName,
        officeLevel,
        countryCode,
        cityCode,
      },
    },
  } = userData;

  const defaultValues = {
    bookingCategory: '',
    officeId,
  };
  // const [defaultFormData, setDefaultFormData] = useState({
  //   countryPos: null,
  //   cityPos: null,
  // });
  const [formData, setFormData] = useState({
    reportType: {},
    startDate: '',
    endDate: '',
    origin: '',
    destination: '',
    orderNumber: '',
    pnrType: {},
    pnrNumber: '',
    bookingCategory: {},
    officeChannel: {},
    officeType: {},
    officeId: officeId,
    ofId: ofId,
    userName: {},
    countryPos: null,
    cityPos: null,
    transactionStatus: {},
  });

  const { register, handleSubmit, reset } = useForm();
  //const ofId = utils.getItemFromStorage('officeId');
  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const countriesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countries,
    'masterCountries'
  );
  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  const [userNameList, setUserNameList] = createEndpoint();
  const userNameListData = userNameList
    ? userNameList.status
      ? userNameList?.data
      : []
    : [];
  const [hiddenKeys, setHiddenKeys] = useState(hideKeys);
  const defaultTableFieldsSelection = BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
    (item) => !hiddenKeys.includes(item.value)
  );
  const [fieldSelection, setFieldSelection] = useState(
    defaultTableFieldsSelection
  );
  //console.log('hi', userNameList?.data);
  useEffect(() => {
    defaultCountry();
  }, [countriesList.dropDownItems]);
  useEffect(() => {
    console.log('abc', formData.countryPos);
    if (formData.countryPos) {
      getCitiesList(formData.countryPos.value);
    }
  }, [formData.countryPos]);
  useEffect(() => {
    defaultCity();
  }, [citiesList]);

  const getCitiesList = (countryCode) => {
    if (countryCode != undefined)
      dispatch(
        commonAction(endpoint.master.cities, {
          countryCode,
        })
      );
  };

  useEffect(() => {
    // setUserNameList(endpoint.office.searchUserDropDown, {
    //   ofid: ofId,
    // });
    getCitiesList(countryCode);
    getUserNameList(ofId);
  }, []);
  useEffect(() => {
    // console.log('formData.officeId::: ', formData.officeId);
    getUserNameList(formData.ofId);
  }, [formData.officeId]);

  const getUserNameList = (officeId) => {
    setUserNameList(endpoint.office.searchUserDropDown, {
      ofid: officeId,
    });
  };
  const handleChangeOfficeClick = (officeDetail) => {
    // console.log('officeId::: ', officeDetail);
    setShowChangeOffice();
    setFormData({
      ...formData,
      officeId: officeDetail.officeId,
      ofId: officeDetail.ofId,
    });
  };

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

  const handleSelectOption = (value, id) => {
    if (id !== 'fieldSelection') {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      const updatedHiddenKeys = BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
        ((set) => (a) => !set.has(a.value))(new Set(value.map((b) => b.value)))
      ).map((item) => item.value);
      setFieldSelection(value);
      setHiddenKeys(updatedHiddenKeys);
    }

    // if (value !== "") {
    // 	setErrorData({
    // 		...errorData,
    // 		[id]: "",
    // 	});
    // }
    // setFormData({
    // 	...formData,
    // 	[id]: value.value,
    // });
  };

  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectSuggestion = (id, value) => {
    if (value !== '') {
      setErrorData({
        ...errorData,
        [id]: '',
      });
    }
    setFormData({
      ...formData,
      [id]: value,
    });
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
  const onSubmit = (data) => {
    // console.log('data', data);
    setPage(1);
    setReqeustJson(data);
    //setPage(1);
  };
  const defaultCountry = () => {
    if (countriesList.dropDownItems !== null && countryCode != '') {
      setFormData({
        ...formData,
        countryPos: countriesList.dropDownItems.findItem(countryCode),
        cityPos: citiesList && citiesList.findItem(cityCode),
      });
    }
  };
  const defaultCity = () => {
    if (
      citiesList &&
      formData.countryPos &&
      formData.countryPos.value === countryCode &&
      cityCode != ''
    )
      setFormData({
        ...formData,
        cityPos: citiesList.findItem(cityCode),
      });
    else {
      setFormData({
        ...formData,
        cityPos: null,
      });
    }
  };
  const handleReset = () => {
    reset(defaultValues);
    setStateKey(!stateKey);
    setFormData({
      ...formData,
      officeId: officeId,
      ofId: ofId,
      origin: '',
      destination: '',
    });
    //defaultCity();
    defaultCountry();
  };

  return (
    <>
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
            <input
              type="hidden"
              name="ofid"
              value={ofId}
              ref={register}
            ></input>
            <input
              type="hidden"
              name="size"
              value={size}
              ref={register}
            ></input>

            <Text
              showLeftBorder={true}
              text="SEARCH BOOKING REPORT"
              className="font-primary-medium-18 my-24"
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <SelectWithDatePickers
                  label="Date:"
                  name={{
                    select: 'reportType',
                    datePicker1: 'dateFrom',
                    datePicker2: 'dateTo',
                  }}
                  data={SEARCH_DATE_TYPE}
                  defaultValues={{
                    select: SEARCH_DATE_TYPE[1],
                    datePicker1: new Date(),
                    datePicker2:
                      formData.reportType.value === 'T'
                        ? customAddDays(new Date(), 31)
                        : new Date(),
                  }}
                  disableFutureDatesDatePicker1={
                    formData.reportType.value === 'B'
                  }
                  disableFutureDatesDatePicker2={
                    formData.reportType.value === 'B'
                  }
                  disablePastDatesDatePicker1={
                    formData.reportType.value === 'T'
                  }
                  disablePastDatesDatePicker2={
                    formData.reportType.value === 'T'
                  }
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                {/* <TextInput
                  label="Origin:"
                  id="origin"
                  name="origin"
                  useReactHookForm={false}
                  onChange={handleInputChange}
                /> */}
                <AutoSuggest
                  id="origin"
                  label="Origin:"
                  isSearchBar={false}
                  // initialValue={initialDepartureAirport}
                  stateKey={stateKey}
                  onSelectSuggestion={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                {/* <TextInput
                  label="Destination:"
                  id="destination"
                  name="destination"
                  useReactHookForm={false}
                  onChange={handleInputChange}
                /> */}
                <AutoSuggest
                  id="destination"
                  label="Destination:"
                  isSearchBar={false}
                  // initialValue={initialDepartureAirport}
                  stateKey={stateKey}
                  onSelectSuggestion={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  label="Order Number:"
                  placeholder="Order Number"
                  id="orderNo"
                  name="orderNo"
                  maxLength={13}
                  useReactHookForm={false}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectWithTextInput
                  name="pnrNumber"
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
                  onChange={handleInputChange}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  label="Ticket No.:"
                  id="ticketNo"
                  name="officeId"
                  useReactHookForm={false}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Booking Category:"
                  id="bookingCategory"
                  name="bookingCategory"
                  options={BOOKING_CATEGORY}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Office Channel:"
                  id="officeChannel"
                  name="officeChannel"
                  options={OFFICE_CHANNEL}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Office Type:"
                  id="officeType"
                  name="officeType"
                  options={officeType}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>

              <Grid item xs={3}>
                <TextInput
                  label="Office Name:"
                  id="officeName"
                  name="officeName"
                  useReactHookForm={false}
                  onChange={handleInputChange}
                />
              </Grid>

              {console.log('formData::: ', formData)}
              <Grid item xs={3}>
                <TextInput
                  label="Office ID:"
                  id="officeId"
                  name="officeId"
                  value={formData.officeId}
                  useReactHookForm={false}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="User Name:"
                  id="userName"
                  name="userName"
                  options={userNameListData}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Country POS:"
                  id="countryPos"
                  name="countryPos"
                  options={countriesList.dropDownItems}
                  defaultValue={
                    formData.countryPos ? formData.countryPos : null
                  }
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="City POS:"
                  id="cityPos"
                  name="cityPos"
                  options={
                    (citiesList && utils.sortObjectArray(citiesList)) || []
                  }
                  defaultValue={formData.cityPos ? formData.cityPos : null}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Transaction Status:"
                  id="transactionStatus"
                  name="transactionStatus"
                  options={PNR_STATUS}
                  showBorder
                  changeStyle
                  width="auto"
                  isSearchable
                  useReactHookForm={false}
                  onSelectChange={handleSelectOption}
                />
              </Grid>
              {/* </div>
              </Grid> */}
              <Grid item xs={12}>
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
        </div>
        {bookingReportData && (
          <PrimaryTable
            header={
              <BookingReportsTableHeader
                officeName={officeName}
                officeId={officeId}
                officeLevel={officeLevel}
                defaultFieldOptions={fieldSelection}
                fieldsOptions={BOOKING_REPORT_FILED_SELECTION_OPTIONS}
                onSelectChange={handleSelectOption}
              />
            }
            headerInArrOfObjFormat
            headerData={headerData}
            subHeaderData={{
              parent: 'Title',
              ...bookingReportData.data.data.subHeaderData,
            }}
            bodyData={bookingReportData.data.data}
            page={page}
            // AddElement={{
            //   first: <PopoverAction />,
            // }}
            count={bookingReportData.data.count}
            size={size}
            handlePage={handlePage}
            hideKeys={hiddenKeys}
          />
        )}
      </div>
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
    </>
  );
};

export default BookingReport;
