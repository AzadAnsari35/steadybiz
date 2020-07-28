import React from 'react';

import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';
import colors from 'Constants/colors';
import {
  IconWithBackground,
  Text,
  SecondaryAccordion,
  TextInput,
  MultiSelect,
  PrimaryTable,
  DateRangeTableHeader,
} from 'Widgets';
import './style.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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

const OfficeCredit = () => {
  const { register, handleSubmit, errors, control, getValues } = useForm({});

  return (
    <>
      <div className="ManageCreditLimit">
        <div className="ManageCreditLimit-head">
          <div className="d-flex justify-content-between align-items-center pb-8">
            <div className="font-primary-semibold-24">MANAGE OFFICE CREDIT</div>

            <div className="d-flex">
              <IconWithBackground
                showCursor
                bgColor={colors.japaneseLaurel}
                className="mr-12"
              >
                <SaveIcon style={{ color: colors.sushi }} />
              </IconWithBackground>
              <IconWithBackground showCursor bgColor={colors.red1}>
                <ClearIcon
                  style={{ color: colors.red }}
                  onClick={() => history.goBack()}
                />
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
              <div className="font-primary-bold-16">Axis Tours & Travels </div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">Office ID:&nbsp; </div>
              <div className="font-primary-bold-16 ">
                Office ID: OKT000000055 | Level - 0
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">City:&nbsp; </div>
              <div className="font-primary-bold-16 ">Westchester </div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">Country:&nbsp; </div>
              <div className="font-primary-bold-16 ">United Kingdom </div>
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
              <div className="font-primary-bold-16 ">AED</div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">Credit Limit:&nbsp;</div>
              <div className="font-primary-bold-16 ">Axis Tours & Travels</div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">
                Settlement Plan:&nbsp;
              </div>
              <div className="font-primary-bold-16 ">Axis Tours & Travels</div>
            </Grid>
          </Grid>

          <SecondaryAccordion
            text="Upload Deposit"
            defaultOpen={true}
            className="ManageCreditLimit-accordian"
          >
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
                  name="paymentMode"
                  options={[
                    { label: 'All', value: 'All' },
                    { label: 'Branch', value: 'Branch' },
                    { label: 'Own', value: 'Own' },
                  ]}
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  showValue
                  width="auto"
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  name="depositAmount"
                  register={register}
                  errors={errors}
                  label="Deposit Amount:"
                />
              </Grid>
              <Grid item xs={3}>
                <TextInput
                  name="depositDescription"
                  register={register}
                  errors={errors}
                  label="Deposit Description:"
                />
              </Grid>
            </Grid>
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
