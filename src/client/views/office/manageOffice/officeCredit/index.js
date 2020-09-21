import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import {
  commonAction,
  commonActionUpdate,
  commonActionWithoutApi,
} from 'Actions';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { routes } from 'Constants';
import colors from 'Constants/colors';
import { dropDownParam } from 'Constants/commonConstant';
import { utils } from 'Helpers';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  DateRangeTableHeader,
  IconWithBackground,
  MultiSelect,
  PrimaryTable,
  SecondaryAccordion,
  Text,
  TextInput,
} from 'Widgets';
import './style.scss';

const initialState = {
  ofId: '',
  currencyCode: '',
  amountUpdated: '',
  paymentType: '',
  paymentDetailDesc: '',
  updatedByUserId: '',
};

const headerData = [
  'DATE',
  'CURRENCY',
  'OPENING BAL',
  'DEPOSIT AMT',
  'TXN. AMT',
  'CLOSING BAL',
  'ACTION',
];

const response = {
  status: 'OK',
  count: 9,
  data: [
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
      date: '28-Mar-2020',
      currCode: 'INR',
      openingBal: '71108.21',
      depositType: 'Manual',
      depositAmt: '6855.50',
      txnAmt: '7620',
      closingBal: '9900.9',
    },
  ],
};

const LinkAction = (props) => {
  const { rowNumber } = props;

  const location = useLocation();
  const dispatch = useDispatch();

  const path = location.pathname;

  const isSearchAgency = utils.stringComparison(
    path,
    routes.agency.manageCreditLimit
  );

  const handleClick = () => {
    utils.setItemToStorage('selectedCreditHistory', rowNumber);
    dispatch(commonActionUpdate(endpoint.office.creditLimitBreakup, null));
  };

  return (
    <Link
      className="link-text text-decoration-none font-primary-semibold-14 "
      to={
        isSearchAgency
          ? routes.agency.creditLimitBreakup
          : routes.office.creditLimitBreakup
      }
      onClick={() => handleClick()}
    >
      Details
    </Link>
  );
};

const updateEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.creditLimit.update,
    data,
  }));
};

const OfficeCredit = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    setValue,
  } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname;

  const isSearchAgency = utils.stringComparison(
    path,
    routes.agency.manageCreditLimit
  );

  const [updateRes, postData] = updateEndpoint();

  const [dates, setDates] = useState({
    dateFrom: moment().subtract(1, 'months'),
    dateTo: moment().subtract(1, 'days'),
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const firstPageUpdate = useRef(true);

  let userId = utils.getItemFromStorage('userId');

  const selectedOffice = utils.getItemFromStorage('selectedOffice');
  const selectedAgency = utils.getItemFromStorage('selectedAgency');

  let rowNumber = isSearchAgency ? selectedAgency : selectedOffice;

  const searchOffice =
    useSelector((state) => state.searchOffice?.items?.data?.data) || [];
  const searchAgency =
    useSelector((state) => state.searchAgency?.items?.data?.data) || [];

  const searchResult = isSearchAgency ? searchAgency : searchOffice;

  let selectedItem = searchResult[rowNumber] || {};
  console.log('selectedItem', selectedItem);

  const settlementPlans = useSelector(
    (state) => state.masterSettlementPlans?.items?.data
  );

  const creditLimitHistory = useSelector(
    (state) => state.creditLimitHistory?.items
  );

  // console.log('settlementPlans', settlementPlans);

  useEffect(() => {
    if (updateRes !== null) {
      const errMsg = utils.checkError(updateRes);

      if (errMsg)
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
      else {
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: true,
            toastMessage: `${
              isSearchAgency ? 'Agency' : 'Office'
            } credit limit updated successfully`,
            isToastVisible: true,
          })
        );
      }
    }
  }, [updateRes]);

  const paymentModes = useDropDown(
    endpoint.master.paymentModes,
    dropDownParam.paymentModes,
    'masterPaymentModes'
  );

  useEffect(() => {
    dispatch(commonAction(endpoint.master.settlementPlans));
    reset({
      minimumCreditLimit: minimumBalance,
    });
  }, []);

  const handleClose = () => {
    if (isSearchAgency) {
      history.push(routes.agency.searchAgency);
      dispatch(commonActionUpdate(endpoint.agency.searchAgency, null));
    } else {
      history.push(routes.office.searchOffice);
      dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
    }
  };

  useEffect(() => {
    callSearch(page);
  }, [page]);

  const callSearch = (page) => {
    try {
      dispatch(
        commonAction(endpoint.office.creditLimitHistory, {
          ...dates,
          page: page - 1,
          size,
          ofId: selectedItem.ofId,
        })
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleDateChange = (name, value) => {
    console.log('name', name, value);
    setDates({ ...dates, [name]: value });
  };

  const onSubmit = (data) => {
    let { dateFrom, dateTo, amountUpdated, ...rest } = data;

    // amountUpdated = parseInt(amountUpdated.toFixed(2));

    postData({
      ...rest,
      amountUpdated: parseFloat(amountUpdated),
      ofId: selectedItem.ofId,
      currencyCode: selectedItem.currCode,
      updatedByUserId: userId,
    });
  };

  const handleSearch = () => {
    const { dateFrom, dateTo } = dates;
    setPage(1);
    callSearch(page);

    console.log('dates', dateFrom, dateTo);
  };

  const {
    officeName,
    officeId,
    cityName,
    countryCode,
    currCode,
    creditLimitBal,
    paymentOptions,
    minimumBalance,
  } = selectedItem;

  console.log('paymentOptions', paymentOptions);

  return (
    <div className="ManageCreditLimit">
      <div className="ManageCreditLimit-head">
        <div className="d-flex justify-content-between align-items-center pb-8">
          <div className="font-primary-semibold-24">
            {isSearchAgency ? 'AGENCY CREDIT LIMIT' : 'OFFICE CREDIT LIMIT'}
          </div>

          <div className="d-flex">
            <IconWithBackground
              showCursor
              bgColor={colors.red1}
              onClick={() => handleClose()}
            >
              <ClearIcon style={{ color: colors.red }} />
            </IconWithBackground>
          </div>
        </div>
        <div className="horizontal-grey-divider mb-24"></div>

        <Grid container spacing={3} className="ManageCreditLimit-container">
          <Grid item xs={12}>
            <Text
              showLeftBorder={true}
              text={isSearchAgency ? 'AGENCY DETAILS' : 'OFFICE DETAILS'}
              className="font-primary-medium-18 mt-24"
            />
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">
              {isSearchAgency ? 'Agency Name:' : 'Office Name:'}&nbsp;
            </div>
            <div className="font-primary-bold-16">{officeName} </div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Office ID:&nbsp; </div>
            <div className="font-primary-bold-16 ">{officeId}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">City:&nbsp; </div>
            <div className="font-primary-bold-16 ">{cityName} </div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Country:&nbsp; </div>
            <div className="font-primary-bold-16 ">{countryCode} </div>
          </Grid>

          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="CREDIT LIMIT"
              className="font-primary-medium-18"
            />
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Date:&nbsp; </div>
            <div className="font-primary-bold-16 ">
              {moment().format('DD-MMM-YYYY')}
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Currency:&nbsp;</div>
            <div className="font-primary-bold-16 ">{currCode}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Credit Limit:&nbsp;</div>
            <div className="font-primary-bold-16 ">{creditLimitBal}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="font-primary-medium-16">Settlement Plan:&nbsp;</div>
            <div className="font-primary-bold-16 ">
              {paymentOptions &&
                settlementPlans &&
                paymentOptions.map(
                  (c, i, arr) =>
                    `${settlementPlans.findItem(c).primaryLabel}${
                      arr[i + 1] ? ' | ' : ''
                    }`
                )}
            </div>
          </Grid>
        </Grid>

        <SecondaryAccordion
          text="Upload Deposit"
          defaultOpen={true}
          className="ManageCreditLimit-accordian"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextInput
                  name="minimumCreditLimit"
                  register={register}
                  errors={errors}
                  label="Minimum Credit Limit:"
                />
              </Grid>
              <Grid item xs={3}>
                <MultiSelect
                  label="Payment Mode:"
                  name="paymentType"
                  options={paymentModes.dropDownItems || []}
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  width="auto"
                  isSearchable
                  validation={{
                    required: 'Please enter the payment mode.',
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  name="amountUpdated"
                  register={register}
                  errors={errors}
                  label="Deposit Amount:"
                  validation={{
                    required: 'Please enter the deposit amount.',
                  }}
                  type="number"
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  name="paymentDetailDesc"
                  register={register}
                  errors={errors}
                  label="Deposit Description:"
                  validation={{
                    required: 'Please enter the deposit description.',
                  }}
                />
              </Grid>
            </Grid>
            <div className="d-flex justify-content-end mt-20">
              <Button type="submit" text="Save" />
            </div>
          </form>
        </SecondaryAccordion>
      </div>
      {creditLimitHistory?.status && (
        <PrimaryTable
          header={
            <DateRangeTableHeader
              control={control}
              handleSearch={handleSearch}
              dates={dates}
              handleDateChange={handleDateChange}
            />
          }
          headerData={headerData}
          bodyData={creditLimitHistory.data}
          count={creditLimitHistory.data.count}
          size={5}
          columnAlignments={[
            'center',
            'center',
            'right',
            'right',
            'right',
            'right',
            'center',
          ]}
          statusIndex={6}
          AddElement={{ last: <LinkAction /> }}
        />
      )}
    </div>
  );
};

export default OfficeCredit;
