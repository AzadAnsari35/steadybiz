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
      { id: 'branchesNetBooked', value: 'ORDERS' },
      { id: 'branchesNetBooked', value: 'AMOUNT' },
    ],
  },

  {
    id: 'agencyNetBooked',
    value: 'AGENCY NET BOOKED',
    alignment: 'center',
    colSpan: 2,
    subHeaderList: [
      { id: 'agencyNetBooked', value: 'ORDERS' },
      { id: 'agencyNetBooked', value: 'AMOUNT' },
    ],
  },

  {
    id: 'totalNetBooked',
    value: 'TOTAL NET BOOKED',
    alignment: 'center',
    colSpan: 2,
    subHeaderList: [
      { id: 'totalNetBooked', value: 'ORDERS' },
      { id: 'totalNetBooked', value: 'AMOUNT' },
    ],
  },
];

const hideKeys = [
  'officeChannel',
  'officeType',
  'officeLevel',
  'userName',
  'parentOfficeId',
];

const OfficeSalesReport = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const firstPageUpdate = useRef(true);
  const [showChangeOffice, setShowChangeOffice] = useToggle(false);

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
    officeId: '',
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

  const userNames = useDropDownApi(endpoint.office.searchUserDropDown, {
    ofid: officeId,
  });
  const [userNameList, setUserNameList] = useState(userNames);
  const [hiddenKeys, setHiddenKeys] = useState(hideKeys);

  const defaultTableFieldsSelection = BOOKING_REPORT_FILED_SELECTION_OPTIONS.filter(
    (item) => !hiddenKeys.includes(item.value)
  );
  const [fieldSelection, setFieldSelection] = useState(
    defaultTableFieldsSelection
  );

  useEffect(() => {
    getCitiesList(countryCode);
    // getUserNameList(officeId);
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

  useEffect(() => {
    console.log('formData.officeId::: ', formData.officeId);
    // getUserNameList(formData.officeId);
  }, [formData.officeId]);

  const getCitiesList = (countryCode) => {
    dispatch(
      commonAction(endpoint.master.cities, {
        countryCode,
      })
    );
  };

  const getUserNameList = (officeId) => {
    const userNames = useDropDownApi(endpoint.office.searchUserDropDown, {
      ofid: officeId,
    });
    setUserNameList(userNames);
  };

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
    if (id === 'countryPos') {
      const { countryPos } = formData;
      if (countryPos.value !== value.value) {
        setDefaultFormData({
          ...defaultFormData,
          cityPos: null,
        });
        getCitiesList(value.value);
      }
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

  const handleChangeOfficeClick = (officeId) => {
    console.log('officeId::: ', officeId);
    setShowChangeOffice();
    setFormData({
      ...formData,
      officeId,
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

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <>
      <div>
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
        className="BookingReport-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </>
  );
};

export default OfficeSalesReport;
