import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionUpdate } from 'Actions/';
import BookingReportsTableHeader from 'Components/Common/BookingReportsTableHeader/index';
import ChangeOffice from 'Components/Offices/ChangeOffice';
import endpoint from 'Config/endpoint.js';
import colors from 'Constants/colors';
import { dropDownParam } from 'Constants/commonConstant';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import useToggle from 'Hooks/useToggle';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  CustomDrawer,
  CustomTable,
  DatePicker,
  IconWithBackground,
  MultiSelect,
  SimplePopover,
  Text,
  TextInput,
} from 'Widgets';
import searchInvoiceData from './searchInvoice.json';
import './style.scss';

const SEARCH_INVOICE_FILED_SELECTION_OPTIONS = [
  { value: 'agencyName', label: 'AGENCY NAME' },
  { value: 'officeId', label: 'OFFICE ID' },
  { value: 'country', label: 'COUNTRY' },
  { value: 'city', label: 'CITY' },
  {
    value: 'nativeInvoiceAmount',
    label: 'NATIVE INVOICE AMOUNT',
    subHeaderList: [
      { value: 'nativeCurrency', label: 'CURRENCY' },
      { value: 'nativeTotalAmount', label: 'TOTAL AMT.' },
      { value: 'nativeCommission', label: 'COMM.' },
      { value: 'nativeNetAmount', label: 'TOTAL AMT.' },
    ],
  },

  {
    value: 'equivalentInvoiceAmount',
    label: 'EQUIVALENT INVOICE AMOUNT',
    subHeaderList: [
      { value: 'equiCurrency', label: 'CURRENCY' },
      { value: 'equiTotalAmount', label: 'TOTAL AMT.' },
      { value: 'equiCommission', label: 'COMM.' },
      { value: 'equiNetAmount', label: 'TOTAL AMT.' },
    ],
  },
];

const headerData = [
  { id: 'agencyName', value: 'AGENCY NAME', alignment: 'left' },
  { id: 'officeId', value: 'OFFICE ID', alignment: 'center' },
  { id: 'country', value: 'COUNTRY', alignment: 'center' },
  { id: 'city', value: 'CITY', alignment: 'left' },
  {
    id: 'nativeInvoiceAmount',
    value: 'NATIVE INVOICE AMOUNT',
    colSpan: 4,
    subHeaderList: [
      { id: 'nativeCurrency', value: 'CURRENCY' },
      { id: 'nativeTotalAmount', value: 'TOTAL AMT.', alignment: 'right' },
      { id: 'nativeCommission', value: 'COMM.', alignment: 'right' },
      { id: 'nativeNetAmount', value: 'TOTAL AMT.', alignment: 'right' },
    ],
  },

  {
    id: 'equivalentInvoiceAmount',
    value: 'EQUIVALENT INVOICE AMOUNT',
    colSpan: 4,
    subHeaderList: [
      { id: 'equiCurrency', value: 'CURRENCY' },
      { id: 'equiTotalAmount', value: 'TOTAL AMT.', alignment: 'right' },
      { id: 'equiCommission', value: 'COMM.', alignment: 'right' },
      { id: 'equiNetAmount', value: 'TOTAL AMT.', alignment: 'right' },
    ],
  },
  { id: 'action', value: 'ACTION', alignment: 'center' },
];

const hideKeys = [];

const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const PopoverAction = ({ rowNumber }) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };
  const handleClick = (e) => {
    utils.setItemToStorage('selectedSecurityGroup', rowNumber);
    history.push(routes.agency.viewInvoice);
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
        <div className="SearchSecurityGroup-tableAction d-flex flex-direction-column">
          <div className="font-primary-regular-14" onClick={handleClick}>
            View Invoice
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const SearchInvoice = () => {
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
  const defaultTableFieldsSelection = SEARCH_INVOICE_FILED_SELECTION_OPTIONS.filter(
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
      const updatedHiddenKeys = SEARCH_INVOICE_FILED_SELECTION_OPTIONS.filter(
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
    const updatedHiddenKeys = SEARCH_INVOICE_FILED_SELECTION_OPTIONS.filter(
      ((set) => (a) => !set.has(a.value))(
        new Set(defaultFieldSelection.map((b) => b.value))
      )
    ).map((item) => item.value);
    setHiddenKeys(updatedHiddenKeys);
  };

  return (
    <>
      <div className="SearchInvoice">
        <div className="SearchInvoice-head">
          <div className="d-flex justify-content-between align-items-end pb-4">
            <div className="font-primary-semibold-24 ">MANAGE INVOICE </div>
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
              text="SEARCH INVOICE"
              className="font-primary-medium-18 my-24"
            />
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <DatePicker
                  name="dateFrom"
                  label="Invoice Date From:"
                  useReactHookForm={false}
                  onChange={() => console.log('h')}
                />
              </Grid>

              <Grid item xs={3}>
                <DatePicker
                  name="dateto"
                  label="Invoice Date To:"
                  useReactHookForm={false}
                  onChange={() => console.log('h')}
                />
              </Grid>

              <Grid item xs={3}>
                <TextInput
                  label="Agency Name:"
                  id="agencyName"
                  name="agencyName"
                  useReactHookForm={false}
                  onChange={handleInputChange}
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
        {searchInvoiceData && (
          <CustomTable
            header={
              <BookingReportsTableHeader
                officeName={officeName}
                officeId={officeId}
                officeLevel={officeLevel}
                defaultFieldOptions={fieldSelection}
                fieldsOptions={SEARCH_INVOICE_FILED_SELECTION_OPTIONS}
                onSelectChange={handleSelectOption}
                handleFieldReset={handleFieldReset}
              />
            }
            headerData={headerData}
            subHeaderData={{
              ...searchInvoiceData.data.data.subHeaderData,
            }}
            tableBodyStyling={[
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              { borderRight: `1px solid ${colors.silverChalice1}` },
            ]}
            bodyData={searchInvoiceData.data.data}
            page={page}
            count={searchInvoiceData.data.count}
            size={size}
            handlePage={handlePage}
            hideKeys={hiddenKeys}
            AddElement={{
              last: <PopoverAction />,
            }}
          />
        )}
      </div>
      <CustomDrawer
        title="CHANGE OFFICE"
        showDrawer={showChangeOffice}
        onCloseClick={setShowChangeOffice}
        width={1150}
        className="SearchInvoice-CustomDrawer"
        showBottomBorder={true}
      >
        <ChangeOffice onOfficeClick={handleChangeOfficeClick} />
      </CustomDrawer>
    </>
  );
};

export default SearchInvoice;
