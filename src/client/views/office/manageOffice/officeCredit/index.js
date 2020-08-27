import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import { commonAction, commonActionWithoutApi } from 'Actions';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { routes } from 'Constants';
import colors from 'Constants/colors';
import { dropDownParam } from 'Constants/commonConstant';
import { utils } from 'Helpers';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
import ResetPassword from 'Components/Users/Agent/ResetPassword/index';

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
  'DEPOSIT TYPE',
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

  return (
    <div className="link-text">
      <Link
        className="link-text text-decoration-none font-primary-semibold-14 "
        to=""
      >
        Deposit
      </Link>
    </div>
  );
};

const updateEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.creditLimit.update,
    data,
  }));
};

const OfficeCredit = () => {
  const { register, handleSubmit, errors, control, reset } = useForm({});

  const history = useHistory();
  const dispatch = useDispatch();

  const [updateRes, postData] = updateEndpoint();

  let userId = utils.getItemFromStorage('userId');

  let rowNumber = utils.getItemFromStorage('selectedOffice');

  const settlementPlans = useSelector(
    (state) => state.masterSettlementPlans?.items?.data
  );

  console.log('settlementPlans', settlementPlans);

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
            toastMessage: `Office credit limit updated successfully`,
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

  const searchResult =
    useSelector((state) => state.searchOffice?.items?.data?.data) || [];
  let selectedItem = searchResult[rowNumber] || {};
  console.log('selectedItem', selectedItem);

  useEffect(() => {
    dispatch(commonAction(endpoint.master.settlementPlans));
    reset({ minimumCreditLimit: minimumBalance });
  }, []);

  const onSubmit = (data) => {
    const { dateFrom, dateTo, ...rest } = data;
    console.log('data', {
      ...rest,
      ofId: selectedItem.ofId,
      currencyCode: selectedItem.currCode,
      updatedByUserId: userId,
    });

    postData({
      ...rest,
      ofId: selectedItem.ofId,
      currencyCode: selectedItem.currCode,
      updatedByUserId: userId,
    });
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

  return (
    <>
      <div className="ManageCreditLimit">
        <div className="ManageCreditLimit-head">
          <div className="d-flex justify-content-between align-items-center pb-8">
            <div className="font-primary-semibold-24">MANAGE OFFICE CREDIT</div>

            <div className="d-flex">
              <IconWithBackground
                showCursor
                bgColor={colors.red1}
                onClick={() => history.push(routes.office.searchOffice)}
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
                text="OFFICE DETAILS"
                className="font-primary-medium-18 mt-24"
              />
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">Office Name: &nbsp;</div>
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
              <div className="font-primary-medium-16">
                Settlement Plan:&nbsp;
              </div>
              <div className="font-primary-bold-16 ">
                {paymentOptions &&
                  settlementPlans &&
                  settlementPlans.findItem(paymentOptions[0]).primaryLabel}
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
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextInput
                    name="amountUpdated"
                    register={register}
                    errors={errors}
                    label="Deposit Amount:"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextInput
                    name="paymentDetailDesc"
                    register={register}
                    errors={errors}
                    label="Deposit Description:"
                  />
                </Grid>
              </Grid>
              <div className="d-flex justify-content-end mt-20">
                <Button type="submit" text="Save" />
              </div>
            </form>
          </SecondaryAccordion>
        </div>
        <PrimaryTable
          header={<DateRangeTableHeader control={control} />}
          headerData={headerData}
          bodyData={response}
          count={20}
          size={5}
          columnAlignments={[
            'center',
            'center',
            'right',
            'left',
            'right',
            'right',
            'right',
            'center',
          ]}
          statusIndex={6}
          AddElement={{ last: <LinkAction /> }}
        />
      </div>
    </>
  );
};

export default OfficeCredit;
