import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useToggle from 'Hooks/useToggle';

import depositReceivedReportData from './DepositReceivedReport.json';
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
  DatePicker,
} from 'Widgets';

import './style.scss';
import { customAddDays, displayImage } from 'Helpers/utils';
import BookingReportsTableHeader from 'Components/Common/BookingReportsTableHeader/index';
import useDropDownApi from 'Hooks/useDropDownApi';

const DEPOSIT_RECEIVED_REPORT_FILED_SELECTION_OPTIONS = [
  { value: 'dateAndTime', label: 'DATE & TIME' },
  { value: 'agencyName', label: 'AGENCY NAME' },
  { value: 'depositUser', label: 'DEPOSIT USER' },
  { value: 'openingBal', label: 'OPENING BAL' },
  { value: 'depositType', label: 'DEPOSIT TYPE' },
  { value: 'paymentMode', label: 'PAYMENT MODE' },
  { value: 'currency', label: 'CURRENCY' },
  { value: 'depositAmt', label: 'DEPOSIT AMT' },
  { value: 'closingBal', label: 'CLOSING BAL' },
  { value: 'equiCurrency', label: 'EQUI. CURR.' },
  { value: 'equiAmt', label: 'EQUI. AMT' },
  { value: 'equiClosingBal', label: 'EQUI. CLOSING BAL.' },
  { value: 'depositDescription', label: 'DEPOSIT DESCRIPTION' },
];

const headerData = [
  { id: 'dateAndTime', value: 'DATE & TIME', alignment: 'center' },
  { id: 'agencyName', value: 'AGENCY NAME', alignment: 'left' },
  { id: 'depositUser', value: 'DEPOSIT USER', alignment: 'left' },
  { id: 'openingBal', value: 'OPENING BAL', alignment: 'right' },
  { id: 'depositType', value: 'DEPOSIT TYPE', alignment: 'center' },
  { id: 'paymentMode', value: 'PAYMENT MODE', alignment: 'left' },
  { id: 'currency', value: 'CURRENCY', alignment: 'center' },
  { id: 'depositAmt', value: 'DEPOSIT AMT', alignment: 'right' },
  { id: 'closingBal', value: 'CLOSING BAL', alignment: 'right' },
  { id: 'equiCurrency', value: 'EQUI. CURR.', alignment: 'center' },
  { id: 'equiAmt', value: 'EQUI. AMT', alignment: 'right' },
  { id: 'equiClosingBal', value: 'EQUI. CLOSING BAL.', alignment: 'right' },
  { id: 'depositDescription', value: 'DEPOSIT DESCRIPTION', alignment: 'left' },
];

const hideKeys = ['depositType', 'depositDescription'];

const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const DepositReceivedReport = () => {
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
  const defaultTableFieldsSelection = DEPOSIT_RECEIVED_REPORT_FILED_SELECTION_OPTIONS.filter(
    (item) => !hiddenKeys.includes(item.value)
  );
  const [fieldSelection, setFieldSelection] = useState(
    defaultTableFieldsSelection
  );

  const [defaultFieldSelection, setDefaultFieldSelection] = useState(
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
      console.log('value', value);
      const updatedHiddenKeys = DEPOSIT_RECEIVED_REPORT_FILED_SELECTION_OPTIONS.filter(
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

  const handleFieldReset = () => {
    setFieldSelection(defaultFieldSelection);
    const updatedHiddenKeys = DEPOSIT_RECEIVED_REPORT_FILED_SELECTION_OPTIONS.filter(
      ((set) => (a) => !set.has(a.value))(
        new Set(defaultFieldSelection.map((b) => b.value))
      )
    ).map((item) => item.value);
    setHiddenKeys(updatedHiddenKeys);
  };

  return (
    <>
      <div className="DepositReceivedReport">
        <div className="DepositReceivedReport-head">
          <div className="d-flex justify-content-between align-items-end pb-4">
            <div className="font-primary-semibold-24 ">
              DEPOSIT RECEIVED REPORT
            </div>
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
              text="SEARCH DEPOSIT RECEIVED"
              className="font-primary-medium-18 my-24"
            />
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <DatePicker
                  name="dateFrom"
                  label="Date From:"
                  useReactHookForm={false}
                  onChange={() => console.log('h')}
                />
              </Grid>

              <Grid item xs={3}>
                <DatePicker
                  name="dateto"
                  label="Date To:"
                  useReactHookForm={false}
                  onChange={() => console.log('h')}
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
                  value={formData.officeId}
                  useReactHookForm={false}
                  onChange={handleInputChange}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Deposit User Name:"
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
        {depositReceivedReportData && (
          <PrimaryTable
            header={
              <BookingReportsTableHeader
                officeName={officeName}
                officeId={officeId}
                officeLevel={officeLevel}
                defaultFieldOptions={fieldSelection}
                fieldsOptions={DEPOSIT_RECEIVED_REPORT_FILED_SELECTION_OPTIONS}
                onSelectChange={handleSelectOption}
                handleFieldReset={handleFieldReset}
              />
            }
            headerInArrOfObjFormat
            headerData={headerData}
            subHeaderData={{
              ...depositReceivedReportData.data.data.subHeaderData,
            }}
            bodyData={depositReceivedReportData.data.data}
            page={page}
            count={depositReceivedReportData.data.count}
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
        className="DepositReceivedReport-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </>
  );
};

export default DepositReceivedReport;
