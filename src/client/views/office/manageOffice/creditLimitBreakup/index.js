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
  SearchTableHeader,
} from 'Widgets';
import './style.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ParentGroupIcon from 'Widgets/Icons/ParentGroupIcon';

const headerData = [
  'PARENT',
  'TIME',
  'OFFICE NAME',
  'LEVEL',
  'USER NAME',
  'DEPOSIT TYPE',
  ['NATIVE CURRENCY', 'CURRENCY', 'DEPOSIT AMT', 'TXN. AMT'],
  ['EQUIVALENT CURRENCY', 'CURRENCY', 'DEPOSIT AMT', 'TXN. AMT'],

  'BALANCE AMT',
];

const response = {
  status: 'OK',
  count: 9,
  data: [
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
      parent: '',
      time: '23:15 Hrs',
      officeName: 'Jacobi, Stark and McClure',
      level: '1',
      userName: 'RylanWilliamson',
      depositType: 'Manual',
      nativeCurrency: 'AED',
      nativeDepositAmt: '64042.78',
      nativeTxnAmt: '7620',
      currency: 'AED',
      depositAmt: '64042.78',
      txnAmt: '7620',
      balanceAmt: '135484.80',
    },
  ],
};

const CreditLimitBreakup = () => {
  const { register, handleSubmit, errors, control, getValues } = useForm({});

  return (
    <>
      <div className="ManageCreditLimit">
        <div className="ManageCreditLimit-head">
          <div className="d-flex justify-content-between align-items-center pb-8">
            <div className="font-primary-semibold-24">
              OFFICE CREDIT LIMIT BREAKUP
            </div>

            <div className="d-flex">
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
              <div className="font-primary-medium-16">Opening Bal:&nbsp;</div>
              <div className="font-primary-bold-16 ">64424.00</div>
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">Closing Bal:&nbsp;</div>
              <div className="font-primary-bold-16 ">1354031.53</div>
            </Grid>
          </Grid>
        </div>
        <PrimaryTable
          header={<SearchTableHeader register={register} />}
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
          AddElement={{ fisrt: <ParentGroupIcon /> }}
        />
      </div>
    </>
  );
};

export default CreditLimitBreakup;
