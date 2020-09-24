//import viewOrder from './viewOrder';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PrintIcon from '@material-ui/icons/Print';
import AssignmentIcon from '@material-ui/icons/Assignment';

import colors from 'Constants/colors';
import routes from 'Constants/routes';
import { displayImage } from 'Helpers/utils';

import { utils } from 'Helpers/index'; // import { getCreditLimitAction } from "./../../actions/common";

import FlightSummary from 'Components/Flights/Availability/FlightSummary';
import ContactDetailsStatic from 'Components/Common/ContactDetailsStatic/index';
import PassengerInformationStatic from 'Components/Common/PassengerInformationStatic';
import PaymentDetails from 'Components/Common/PaymentDetails';
import PaymentDetailsCard from 'Components/Common/PaymentDetailsCard';
import FlightDetails from 'Components/Flights/Availability/FlightDetails';
import FareDetailsCard from 'Components/Common/FareDetailsCard';
import OrderDetails from 'Components/Common/OrderDetails';

import { Alert, IconWithBackground, Panel, Toast, Button } from 'Widgets';
import MailIcon from 'Widgets/Icons/MailIcon';
import SearchAirplaneIcon from 'Widgets/Icons/SearchAirplaneIcon';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { getDataFromRedux } from 'Helpers/global';

import './style.scss';
import { commonAction, commonActionWithoutApi } from 'Actions/index';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
const createEndpoint = () => {
  return useAsyncEndpoint((data, endpoint) => ({
    _endpoint: endpoint,
    data,
  }));
};

const Transaction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [issueTicketResponse, createIssueTicketResponse] = createEndpoint();
  const [cancelOrderResponse, setCancelOrderResponse] = createEndpoint();
  const [retrieveOrder, setRetrieveOrder] = createEndpoint();
  const [showAlert, setShowAlert] = useState(true);
  const alertRef = useRef(null);
  // let transaction = {};
  // transaction.items = viewOrder;

  // const { data: transactionData } = useSelector((state) => state.transaction);
  const transaction = useSelector(
    (state) => state[endpoint.transaction.airprice.reducerName]
  );

  const flightSearchInput = useSelector(
    (state) => state[endpointWithoutApi.flights.flightSearchInput.reducerName]
  );
  const transactionData = getDataFromRedux(transaction);
  const flightSearchInputData = getDataFromRedux(flightSearchInput);
  const { pathname } = history.location;
  const isIssueTicket =
    pathname.toUpperCase() === routes.transaction.issueTicket.toUpperCase();
  const isBooking =
    pathname.toUpperCase() === routes.transaction.viewBooking.toUpperCase();
  let isCancelPnr =
    pathname.toUpperCase() === routes.transaction.cancelPNR.toUpperCase();
  const refreshOrder = (orderNumber) => {
    setRetrieveOrder(
      {
        orderNumber: orderNumber,
        type: 'retieve',
      },
      endpoint.orders.viewOrder
    );
  };
  useEffect(() => {
    try {
      if (isIssueTicket || isBooking) {
        dispatch(
          commonAction(endpoint.creditLimit.getInstantCreditlimit, {
            ofid: utils.getItemFromStorage('officeId'),
          })
        );
      }
    } catch (err) {
      console.log('err', err);
    }
  }, []);
  // useEffect(() => {
  // 	window.scrollTo(0, 0);
  // 	pathname === "/transaction/issueTicket" && dispatch(getCreditLimitAction());
  // }, [pathname]);

  const panelsInitialState = {
    flightDetailsPanel: true,
    passengerDetailsPanel: true,
    //cancelationDetailsPanel: true,
    paymentDetailsPanel: true,
  };

  const [panelsState, setPanelsState] = useState(panelsInitialState);

  const customerDetailList =
    !!transactionData &&
    transactionData.customerDetails &&
    transactionData.customerDetails.customerDetailList.length > 0 &&
    transactionData.customerDetails.customerDetailList;

  const flightSegments =
    !!transactionData &&
    transactionData.outboundItinerary &&
    transactionData.outboundItinerary.flightSegments.length > 0 &&
    transactionData.outboundItinerary.flightSegments;

  const passengersTypeCount =
    customerDetailList.length > 0 &&
    customerDetailList.reduce((obj, v) => {
      obj[v.passengerInfo.passengerType] =
        (obj[v.passengerInfo.passengerType] || 0) + 1;
      return obj;
    }, {});

  useEffect(() => {
    dispatch(commonActionWithoutApi(endpoint.flights.flightSearch, null));
    dispatch(
      commonActionWithoutApi(endpointWithoutApi.flights.flightSearchInput, null)
    );
    dispatch(
      commonActionWithoutApi(endpointWithoutApi.flights.flightSelect, null)
    );
  }, []);

  const handlePanelToggle = (id, value) => {
    setPanelsState({
      ...panelsState,
      [id]: value ? value : !panelsState[id],
    });
  };
  useEffect(() => {
    if (cancelOrderResponse) {
      const error = utils.checkError(cancelOrderResponse);
      if (error != '') {
        //alert(issueTicketResponse.error.message);
        dispatch(utils.showErrorBox(error));
      } else {
        dispatch(utils.showSuccessBox('PNR cancelled successfully'));
        setShowAlert(false);
      }
    }
  }, [cancelOrderResponse]);
  const handleCancelClick = () => {
    // history.push("/search");
    // alert(sourcePnr);
    setCancelOrderResponse(
      { orderNumber: transactionData.orderNo },
      endpoint.orders.cancelOrder
    );
  };

  const handleConfirmClick = () => {
    setShowAlert(false);
  };

  const handlePay = () => {
    createIssueTicketResponse(
      transaction.items.data,
      endpoint.transaction.airTicketing
    );
    // const viewBookingPath = routes.viewBooking.split('/')[1];
    // history.push(viewBookingPath);
  };
  useEffect(() => {
    //console.log(issueTicketResponse);
    const result = issueTicketResponse ? issueTicketResponse : retrieveOrder;
    if (result) {
      const error = utils.checkError(result);
      if (error != '') {
        //alert(issueTicketResponse.error.message);
        dispatch(utils.showErrorBox(error));
      } else {
        dispatch(
          commonActionWithoutApi(endpoint.transaction.airprice, result.data)
        );
        if (issueTicketResponse) history.push(routes.transaction.viewBooking);
      }
    }
  }, [issueTicketResponse || retrieveOrder]);

  const renderFlightBookingActions = () => (
    <div className="d-flex">
      <IconWithBackground
        alt="mail"
        bgColor={colors.jacksonsPurple}
        className="mr-10"
        showCursor
      >
        <MailIcon color={colors.jacksonsPurple1} size={24} />
      </IconWithBackground>
      <IconWithBackground alt="mail" bgColor={colors.california1} showCursor>
        <PrintIcon
          style={{ color: colors.california, width: '24px', height: '24px' }}
        />
      </IconWithBackground>
    </div>
  );

  const flightSummary = () => (
    <FlightSummary
      outboundItinerary={!!transactionData && transactionData.outboundItinerary}
      useSearchInput={false}
    />
  );
  // const flightSummary = () => <FlightSummary requestBody={flightSearchInputData} />;

  return (
    <Fragment>
      {pathname !== '/transaction/issueTicket' && (
        <Fragment>
          <Toast
            isSuccess={!!transactionData.orderNo}
            message={
              !!transactionData.orderNo && !transactionData.isTicketing
                ? 'PNR is created, Your Booking on Hold'
                : 'Your Booking has been confirmed'
            }
          />
        </Fragment>
      )}
      <div className="transaction layout-wrapper">
        <Grid item xs={12}>
          {!!transactionData.airPricingReValidate && showAlert && (
            <div className="alert-section mb-66" ref={alertRef}>
              <Alert
                danger={transactionData.airPricingReValidate.showRedBox}
                className="mb-32"
                alertTitle="change alert"
                alertMessage={
                  transactionData.airPricingReValidate.showMessage &&
                  (transactionData.airPricingReValidate.Message ||
                    transactionData.airPricingReValidate.message)
                }
                showSecondaryAction
                secondaryActionText="cancel"
                showPrimaryAction={
                  transactionData.airPricingReValidate.showConfirmButton
                }
                primaryActionText="confirm"
                onCancelClick={handleCancelClick}
                onConfirmClick={handleConfirmClick}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Panel
            cardClassName="transaction-orderDetails"
            title="order details"
            panelHeaderIcon={
              <AssignmentIcon
                style={{ color: colors.white, width: '40px', height: '32px' }}
              />
            }
            panelIconMarginLeft={'10'}
            headerText="ORDER : FLIGHT BOOKING"
            expand
            noPadding
            hidePanelAction
            headerActionContent={renderFlightBookingActions()}
          >
            <OrderDetails
              orderNumber={transactionData.orderNo}
              sourceName={
                transactionData.outboundItinerary &&
                transactionData.outboundItinerary.itinerarySourceName &&
                transactionData.outboundItinerary.itinerarySourceName
              }
              sourcePnr={
                transactionData.outboundItinerary &&
                transactionData.outboundItinerary.sourcePnr &&
                transactionData.outboundItinerary.sourcePnr
              }
              isTicketing={transactionData.isTicketing}
              pnrStatus={transactionData.PNR_STATUS}
              actualStatus={transactionData.bookingStatus}
              ticketTimeLimit={transactionData.ticketTimeLimit}
              refreshOrder={refreshOrder}
            />
          </Panel>
        </Grid>
        <div className="transaction-details d-flex">
          <Grid item xs={12} md={9}>
            <div className="left-section">
              <Panel
                id="flightDetailsPanel"
                title="flight details"
                panelHeaderIcon={
                  <SearchAirplaneIcon size={30} color={colors.white} />
                }
                panelIconMarginLeft={'14'}
                showHeaderContent
                headerContent={flightSummary()}
                expand={panelsState.flightDetailsPanel}
                noPadding
                onClick={handlePanelToggle}
                addExtraMargin
              >
                <div className="transaction-details__content">
                  <FlightDetails
                    itinerary={transactionData.outboundItinerary}
                  />
                </div>
              </Panel>
              <Panel
                id="passengerDetailsPanel"
                title="passenger details"
                // panelHeaderIcon={<img alt="passenger" src={passengerIcon} />}
                panelHeaderIcon={
                  <img alt="passenger" src={displayImage('passenger.svg')} />
                }
                panelIconMarginLeft={'12'}
                headerText={`PASSENGER : ${
                  !!passengersTypeCount.ADT && 'ADT'
                } ${passengersTypeCount.CHD ? ' | CHD' : ''} ${
                  passengersTypeCount.INF ? ' | INF' : ''
                }`}
                expand={panelsState.passengerDetailsPanel}
                onClick={handlePanelToggle}
              >
                <PassengerInformationStatic
                  customersList={!!customerDetailList && customerDetailList}
                  flightSegments={flightSegments}
                />
              </Panel>
              {isCancelPnr && (
                <Grid item xs={12} className="d-flex justify-content-end">
                  <Button
                    text="Cancel PNR"
                    className="mb-40"
                    onClick={handleCancelClick}
                  />
                </Grid>
              )}
              {/* <Hidden only="md"> */}
              <Hidden mdUp={true}>
                <div className="fareDetails-mob">
                  <FareDetailsCard
                    outboundItinerary={transactionData.outboundItinerary}
                  />
                  {transactionData.isTicketing && (
                    <PaymentDetailsCard
                      outboundItinerary={transactionData.outboundItinerary}
                    />
                  )}
                  {transactionData.customerDetails &&
                    transactionData.customerDetails.contactInfo && (
                      <ContactDetailsStatic
                        contactDetails={
                          transactionData.customerDetails.contactInfo
                        }
                      />
                    )}
                </div>
              </Hidden>
              {isIssueTicket && (
                <Panel
                  id="paymentDetailsPanel"
                  title="payment details"
                  panelHeaderIcon={
                    <img alt="payment" src={displayImage('payment.svg')} />
                  }
                  panelIconMarginLeft={'12'}
                  headerText="PAYMENT : Credit Limit | Credit Card"
                  expand={panelsState.paymentDetailsPanel}
                  onClick={handlePanelToggle}
                >
                  <PaymentDetails
                    outboundItinerary={transactionData.outboundItinerary}
                    onPay={handlePay}
                  />
                </Panel>
              )}
            </div>
          </Grid>
          {/* <Hidden only="xs"> */}
          <Hidden mdDown={true}>
            <Grid item xs={12} md={3}>
              <div className="right-section">
                <FareDetailsCard
                  outboundItinerary={transactionData.outboundItinerary}
                />
                {transactionData.isTicketing && (
                  <PaymentDetailsCard
                    outboundItinerary={transactionData.outboundItinerary}
                  />
                )}
                {transactionData.customerDetails &&
                  transactionData.customerDetails.contactInfo && (
                    <ContactDetailsStatic
                      contactDetails={
                        transactionData.customerDetails.contactInfo
                      }
                    />
                  )}
              </div>
            </Grid>
          </Hidden>
        </div>
      </div>
    </Fragment>
  );
};

export default Transaction;
