import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import colors from 'Constants/colors';
import { utils } from 'Helpers';
import { displayImage } from 'Helpers/utils';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { routes } from 'Constants';
import { commonAction } from 'Actions';
import endpoint from 'Config/endpoint';

import {
  IconWithBackground,
  PrimaryTable,
  SearchTableHeader,
  SimplePopover,
  Text,
} from 'Widgets';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

const response = {
  status: 'OK',
  count: 9,
  data: [
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
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
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
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
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
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
    {
      // ofId: '37d3be08-60c6-4ffa-8538-66075f19acbd',
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

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };

  return (
    <>
      <img
        src={displayImage('ParentGroupIcon.svg')}
        className="cursor-pointer"
        onClick={handlePopoverOpen}
      />
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
        <div>Popover</div>
      </SimplePopover>
    </>
  );
};

const CreditLimitBreakup = () => {
  const { register, handleSubmit, errors, control, getValues } = useForm({});

  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;

  const isSearchAgency = utils.stringComparison(
    path,
    routes.agency.creditLimitBreakup
  );

  const headerData = [
    'PARENT',
    'TIME',
    isSearchAgency ? 'AGENCY NAME' : 'OFFICE NAME',
    'LEVEL',
    'USER NAME',
    'DEPOSIT TYPE',
    ['NATIVE CURRENCY', 'CURRENCY', 'DEPOSIT AMT', 'TXN. AMT'],
    ['EQUIVALENT CURRENCY', 'CURRENCY', 'DEPOSIT AMT', 'TXN. AMT'],

    'BALANCE AMT',
  ];

  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

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

  useEffect(() => {
    if (requestJson !== null) {
      callSearch(page);
    }

    // return dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
  }, [requestJson]);

  useEffect(() => {
    callSearch(page);
  }, [page]);

  const callSearch = (page) => {
    try {
      dispatch(
        commonAction(endpoint.office.creditLimitBreakup, {
          ...requestJson,
          page: page - 1,
          size,
          ofId: selectedItem.ofId,
        })
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <>
      <div className="ManageCreditLimit">
        <div className="ManageCreditLimit-head">
          <div className="d-flex justify-content-between align-items-center pb-8">
            <div className="font-primary-semibold-24">
              {isSearchAgency ? 'AGENCY' : 'OFFICE'} CREDIT LIMIT BREAKUP
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
                text={isSearchAgency ? 'AGENCY DETAILS' : 'OFFICE DETAILS'}
                className="font-primary-medium-18 mt-24"
              />
            </Grid>
            <Grid item xs={3}>
              <div className="font-primary-medium-16">
                {isSearchAgency ? 'Agency' : 'Office'} Name: &nbsp;
              </div>
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
            'left',
            'center',
            'left',
            'left',
            'center',
            'center',
            'center',
            'center',
            'center',
            'right',
          ]}
          statusIndex={6}
          AddElement={{ first: <PopoverAction /> }}
          tableStyling={[
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            { borderRight: `1px solid ${colors.mercury}` },
          ]}
        />
      </div>
    </>
  );
};

export default CreditLimitBreakup;
