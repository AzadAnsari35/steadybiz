import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
} from 'Widgets';

import './style.scss';
import { customAddDays, displayImage } from 'Helpers/utils';
import BookingReportsTableHeader from 'Components/Common/BookingReportsTableHeader/index';
import useDropDownApi from 'Hooks/useDropDownApi';

const BOOKING_REPORT_FILED_SELECTION_OPTIONS = [
  { value: 'ordersBooked', label: 'ORDERS BOOKED' },
  { value: 'ordersCancelled', label: 'ORDERS CANCELLED' },
  { value: 'ordersRebooked', label: 'ORDERS REBOOKED' },
  { value: 'netOrders', label: 'NET ORDERS' },
  { value: 'baseCurrency', label: 'BASE CURRENCY' },
  { value: 'totalTxnAmount', label: 'TOTAL TXN. AMT' },
  { value: 'refundAmount', label: 'REFUND AMT' },
  { value: 'rebookedAmount', label: 'REBOOKED AMT' },
  { value: 'totalCommission', label: 'TOTAL COMMISSION' },
  { value: 'netAmountPaid', label: 'NET AMT PAID' },
];

const headerData = [
  { id: 'date', value: 'DATE', alignment: 'center'},
  { id: 'ordersBooked', value: 'ORDERS BOOKED', alignment: 'right'},
  { id: 'ordersCancelled', value: 'ORDERS CANCELLED', alignment: 'right'},
  { id: 'ordersRebooked', value: 'ORDERS REBOOKED', alignment: 'right'},
  { id: 'netOrders', value: 'NET ORDERS', alignment: 'right'},
  { id: 'baseCurrency', value: 'BASE CURRENCY', alignment: 'center'},
  { id: 'totalTxnAmount', value: 'TOTAL TXN. AMT', alignment: 'right'},
  { id: 'refundAmount', value: 'REFUND AMT', alignment: 'right'},
  { id: 'rebookedAmount', value: 'REBOOKED AMT', alignment: 'right'},
  { id: 'totalCommission', value: 'TOTAL COMMISSION', alignment: 'right'},
  { id: 'netAmountPaid', value: 'NET AMT PAID', alignment: 'right'},
];

const hideKeys = [];

const TotalSalesReport = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const firstPageUpdate = useRef(true);
  let history = useHistory();
  let dispatch = useDispatch();
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, countryCode, cityCode },
    },
  } = userData;

  const defaultValues = {
    bookingCategory: '',
    officeId,
  };
  const [defaultFormData, setDefaultFormData] = useState({
    countryPos: null,
    cityPos: null,
  });
  const [formData, setFormData] = useState({
    reportType: {},
    startDate: "",
    endDate: "",
    origin: "",
    destination: "",
    orderNumber: "",
    pnrType: {},
    pnrNumber: "",
    bookingCategory: {},
    officeChannel: {},
    officeType: {},
    officeId: "",
    userName: {},
    countryPos: {},
    cityPos: {},
    transactionStatus: {},
  });

  const { register, handleSubmit, reset } = useForm();

  const ofId = utils.getItemFromStorage('officeId');

  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const viewPNR = useSelector(
    (state) => state[endpoint.orders.viewOrder.reducerName]?.items
  );

  const countriesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countries,
    'masterCountries'
  );

  const citiesList = useSelector(
    (state) => state.masterCities?.items?.data?.data
  );

  const [cityList, setCityList] = useState(citiesList);

  const userNameList = useDropDownApi(endpoint.office.searchUserDropDown, {
    ofid: ofId,
  });
  const [hiddenKeys, setHiddenKeys] = useState(hideKeys);

  const defaultTableFieldsSelection =
    BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(item => !hiddenKeys.includes(item.value));
  const [fieldSelection, setFieldSelection] = useState(defaultTableFieldsSelection);

  useEffect(() => {
    getCitiesList(countryCode);
  }, []);

  useEffect(() => {
    if (countriesList.dropDownItems !== null && !!citiesList) {
      setDefaultFormData({
        ...defaultFormData,
        countryPos: countriesList.dropDownItems.findItem(countryCode),
        cityPos: citiesList.findItem(cityCode),
      });
      setCityList(citiesList);
    }
  }, [countriesList.dropDownItems, !!citiesList]);

  useEffect(() => {
    setCityList(citiesList);
  }, [citiesList]);

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

  const getCitiesList = countryCode => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode,
      })
    );
  }

  const handlePage = (newPage) => {
    // console.log(newPage);
    setPage(newPage);
  };

  const handleSelectOption = (value, id) => {
    if (id !== "fieldSelection") {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      const updatedHiddenKeys =
        BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
          (set => a => !set.has(a.value))(new Set(value.map(b => b.value)))
        ).map(item => item.value);
      setFieldSelection(value);
      setHiddenKeys(updatedHiddenKeys);
    }
    if (id === "countryPos") {
      const { countryPos } = formData;
      if (countryPos.value !== value.value) {
        setDefaultFormData({
          ...defaultFormData,
          cityPos: null,
        });
        getCitiesList(value.value);
      }
    }
  };

  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const callSearch = (page) => {
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
    setPage(1);
    setReqeustJson(data);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="TotalSalesReport">
      <div className="TotalSalesReport-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">SALES REPORT</div>
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
            text="SEARCH SALES REPORT"
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
                  datePicker2: formData.reportType.value === "T"
                    ? customAddDays(new Date(), 31) : new Date(),
                }}
                disableFutureDatesDatePicker1={formData.reportType.value === "B"}
                disableFutureDatesDatePicker2={formData.reportType.value === "B"}
                disablePastDatesDatePicker1={formData.reportType.value === "T"}
                disablePastDatesDatePicker2={formData.reportType.value === "T"}
                isSearchable
                useReactHookForm={false}
                onSelectChange={handleSelectOption}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Origin:"
                id="origin"
                name="origin"
                useReactHookForm={false}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                label="Destination:"
                id="destination"
                name="destination"
                useReactHookForm={false}
                onChange={handleInputChange}
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
                label="Office ID:"
                id="officeId"
                name="officeId"
                useReactHookForm={false}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                label="User Name:"
                id="userName"
                name="userName"
                options={userNameList.dropDownItems}
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
                label="Country:"
                id="countryPos"
                name="countryPos"
                options={countriesList.dropDownItems}
                defaultValue={
                  !!defaultFormData.countryPos
                  ? defaultFormData.countryPos
                  : null
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
                label="City:"
                id="cityPos"
                name="cityPos"
                options={
                  (cityList && utils.sortObjectArray(cityList)) || []
                }
                defaultValue={
                  !!defaultFormData.cityPos
                  ? defaultFormData.cityPos
                  : null
                }
                showBorder
                changeStyle
                width="auto"
                isSearchable
                useReactHookForm={false}
                onSelectChange={handleSelectOption}
              />
            </Grid>
            <Grid item xs={6}>
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
            ...bookingReportData.data.data.subHeaderData,
          }}
          bodyData={bookingReportData.data.data}
          page={page}
          count={bookingReportData.data.count}
          size={size}
          handlePage={handlePage}
          hideKeys={hiddenKeys}
        />
      )}
    </div>
  );
};

export default TotalSalesReport;
