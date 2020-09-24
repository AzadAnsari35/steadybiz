import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChangeOffice from 'Components/Offices/ChangeOffice';

import officeSalesReportData from './officeSalesReport.json';
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
import colors from 'Constants/colors';

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
  CustomTable,
} from 'Widgets';
import useToggle from 'Hooks/useToggle';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';

import { customAddDays, displayImage } from 'Helpers/utils';
import BookingReportsTableHeader from 'Components/Common/BookingReportsTableHeader/index';
import useDropDownApi from 'Hooks/useDropDownApi';
import './style.scss';

const BOOKING_REPORT_FILED_SELECTION_OPTIONS = [
  { value: 'date', label: 'DATE' },
  { value: 'baseCurrency', label: 'BASE CURRENCY' },
  {
    value: 'ownNetBooked',
    label: 'OWN NET BOOKED',
    subHeaderList: [
      { value: 'ownNetBookedOrders', label: 'ORDERS' },
      { value: 'ownNetBookedAmount', label: 'AMOUNT' },
    ],
  },
  {
    value: 'branchesNetBooked',
    label: 'BRANCHES NET BOOKED',
    subHeaderList: [
      { value: 'branchesNetBookedOrders', label: 'ORDERS' },
      { value: 'branchesNetBookedAmount', label: 'AMOUNT' },
    ],
  },
  {
    value: 'agencyNetBooked',
    label: 'AGENCY NET BOOKED',
    subHeaderList: [
      { value: 'agencyNetBookedOrders', label: 'ORDERS' },
      { value: 'agencyNetBookedAmount', label: 'AMOUNT' },
    ],
  },
  {
    value: 'totalNetBooked',
    label: 'TOTAL NET BOOKED',
    subHeaderList: [
      { value: 'totalNetBookedOrders', label: 'ORDERS' },
      { value: 'totalNetBookedAmount', label: 'AMOUNT' },
    ],
  },
];

const headerData = [
  { id: 'date', value: 'DATE', alignment: 'center' },
  { id: 'baseCurrency', value: 'BASE CURRENCY', alignment: 'center' },
  {
    id: 'ownNetBooked',
    value: 'OWN NET BOOKED',
    alignment: 'right',
    colSpan: 2,
    subHeaderList: [
      { id: 'ownNetBookedOrders', value: 'ORDERS', alignment: 'right' },
      { id: 'ownNetBookedAmount', value: 'AMOUNT', alignment: 'right' },
    ],
  },

  {
    id: 'branchesNetBooked',
    value: 'BRANCHES NET BOOKED',
    alignment: 'center',
    colSpan: 2,
    subHeaderList: [
      { id: 'branchesNetBookedOrders', value: 'ORDERS', alignment: 'right' },
      { id: 'branchesNetBookedAmount', value: 'AMOUNT', alignment: 'right' },
    ],
  },

  {
    id: 'agencyNetBooked',
    value: 'AGENCY NET BOOKED',
    alignment: 'center',
    colSpan: 2,
    subHeaderList: [
      { id: 'agencyNetBookedOrders', value: 'ORDERS', alignment: 'right' },
      { id: 'agencyNetBookedAmount', value: 'AMOUNT', alignment: 'right' },
    ],
  },

  {
    id: 'totalNetBooked',
    value: 'TOTAL NET BOOKED',
    alignment: 'center',
    colSpan: 2,
    subHeaderList: [
      { id: 'totalNetBookedOrders', value: 'ORDERS', alignment: 'right' },
      { id: 'totalNetBookedAmount', value: 'AMOUNT', alignment: 'right' },
    ],
  },
];

const hideKeys = [];

const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const OfficeSalesReport = () => {
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
      console.log('handleSelectOption', value, id);
      // const updatedHiddenKeys = BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
      //   ((set) => (a) => !set.has(a.value))(new Set(value.map((b) => b.value)))
      // ).map((item) => item.value);

      const hiddenKeysArray = BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
        (item1) =>
          !value.some(
            (item2) =>
              item2.value === item1.value && item2.value === item1.value
          )
      );
      const updatedHiddenKeys = getUpdatedkeys(hiddenKeysArray);

      console.log('updatedHiddenKeys', updatedHiddenKeys);

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

  const getUpdatedkeys = (arr) => {
    const updatedHiddenKeys = [];

    for (const item of arr) {
      if (item.hasOwnProperty('subHeaderList')) {
        updatedHiddenKeys.push(...getUpdatedkeys(item.subHeaderList));
      }
      updatedHiddenKeys.push(item.value);
    }

    return updatedHiddenKeys;
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
      <div className="OfficeSalesReport">
        <div className="OfficeSalesReport-head">
          <div className="d-flex justify-content-between align-items-end pb-4">
            <div className="font-primary-semibold-24 ">OFFICE SALES REPORT</div>
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
              text="SEARCH OFFICE SALES"
              className="font-primary-medium-18 my-24"
            />
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
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

              {/* </div>
              </Grid> */}
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
        </div>
        {officeSalesReportData && (
          <CustomTable
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
            headerData={headerData}
            // subHeaderData={{
            //   parent: 'Title',
            //   ...bookingReportData.data.data.subHeaderData,
            // }}
            tableBodyStyling={[
              {},
              {},
              { width: '5.5%' },
              { borderRight: `1px solid ${colors.silverChalice1}` },
              { width: '6%' },
              { borderRight: `1px solid ${colors.silverChalice1}` },
              { width: '6%' },
              { borderRight: `1px solid ${colors.silverChalice1}` },
              { width: '6%' },
            ]}
            bodyData={officeSalesReportData.data.data}
            page={page}
            count={officeSalesReportData.data.count}
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
        className="OfficeSalesReport-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </>
  );
};

export default OfficeSalesReport;
