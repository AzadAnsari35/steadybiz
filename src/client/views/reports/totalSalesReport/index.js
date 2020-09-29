import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useToggle from 'Hooks/useToggle';

import bookingReportData from './bookingReport.json';
import {
  BOOKING_CATEGORY,
  officeType,
  PNR_STATUS,
  SEARCH_DATE_TYPE,
  OFFICE_CHANNEL,
  dropDownParam,
} from 'Constants/commonConstant';
import { commonAction, commonActionUpdate } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import useDropDown from 'Hooks/useDropDown';
import useCheckboxData from 'Hooks/useCheckboxData';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import ChangeOffice from 'Components/Offices/ChangeOffice';

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
  AutoSuggest,
  TextInput,
  CustomDrawer,
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
  { id: 'date', value: 'DATE', alignment: 'center' },
  { id: 'ordersBooked', value: 'ORDERS BOOK', alignment: 'right' },
  { id: 'ordersCancelled', value: 'ORDERS CANCEL', alignment: 'right' },
  { id: 'ordersRebooked', value: 'ORDERS REBOOK', alignment: 'right' },
  { id: 'netOrders', value: 'NET ORDERS', alignment: 'right' },
  { id: 'baseCurrency', value: 'BASE CUR.', alignment: 'center' },
  { id: 'totalTxnAmount', value: 'TOTAL TXN. AMT', alignment: 'right' },
  { id: 'refundAmount', value: 'REFUND AMT', alignment: 'right' },
  { id: 'rebookedAmount', value: 'REBOOKED AMT', alignment: 'right' },
  { id: 'totalCommission', value: 'TOTAL COMN.', alignment: 'right' },
  { id: 'netAmountPaid', value: 'NET AMT PAID', alignment: 'right' },
];

const hideKeys = [];

const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const TotalSalesReport = () => {
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

  const handleChangeOffice = () => {
    dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
    setShowChangeOffice();
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

              {console.log('formData::: ', formData)}
              <Grid item xs={3}>
                <TextInput
                  label="Office ID:"
                  id="officeId"
                  name="officeId"
                  value={formData.officeId}
                  useReactHookForm={false}
                  onChange={handleInputChange}
                  disabled={true}
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
                  label="Country:"
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
                  label="City:"
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

              {/* </div>
          </Grid> */}
              <Grid item xs={12}>
                <div className="d-flex justify-content-end pt-32">
                  <Button
                    text="CHANGE OFFICE"
                    secondary
                    className=" px-48 mr-10"
                    onClick={() => handleChangeOffice()}
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
      <CustomDrawer
        title="CHANGE OFFICE"
        showDrawer={showChangeOffice}
        onCloseClick={setShowChangeOffice}
        width={1150}
        className="TotalSalesReport-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </>
  );
};

export default TotalSalesReport;
