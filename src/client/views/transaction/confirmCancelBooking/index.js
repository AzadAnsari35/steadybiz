//import viewOrder from './viewOrder';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { commonAction, commonActionWithoutApi } from 'Actions/index';
import AgencyInformation from 'Components/Common/AgencyInformation';
import ContactDetailsStatic from 'Components/Common/ContactDetailsStatic/index';
import OrderDetails from 'Components/Common/OrderDetails';
import PaymentDetails from 'Components/Common/PaymentDetails';
import PaymentDetailsCard from 'Components/Common/PaymentDetailsCard';
import FlightDetails from 'Components/Flights/Availability/FlightDetails';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import colors from 'Constants/colors';
import routes from 'Constants/routes';
import { getDataFromRedux } from 'Helpers/global';
import { utils } from 'Helpers/index';
import { displayImage } from 'Helpers/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Panel, IconWithBackground, Image } from 'Widgets';
import MailIcon from 'Widgets/Icons/MailIcon';
import PrintIcon from '@material-ui/icons/Print';
import PassengerDetails from 'Components/Common/PassengerDetails';
import PassengerInformationStatic from 'Components/Common/PassengerInformationStatic';
import CancellationDetails from 'Components/Common/CancellationDetails';

import CloseIcon from '@material-ui/icons/Close';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SearchAirplaneIcon from 'Widgets/Icons/SearchAirplaneIcon';
import FlightSummary from 'Components/Flights/Availability/FlightSummary';


import './style.scss';

const ConfirmCancelBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  // useEffect(() => {
  //   try {
  //       dispatch(
  //         commonAction(endpoint.creditLimit.getInstantCreditlimit, {
  //           ofid: utils.getItemFromStorage('officeId'),
  //         })
  //       );

  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // }, []);

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

  return (
    <div className="ConfirmCancelBooking ">
      <div className="ConfirmCancelBooking-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">CANCEL BOOKING </div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.transaction.searchOrder)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
      </div>
      <div className="layout-wrapper">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Panel
              cardClassName="ConfirmCancelBooking-orderDetails"
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
                // refreshOrder={refreshOrder}
              />
            </Panel>
          </Grid>

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
                <div className="ConfirmCancelBooking-details__content">
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
                  showAccordian={true}
                  showCheckbox={false}
                />
              </Panel>

              <Panel
                id="cancellationDetailsPanel"
                title="Cancellation Details"
                // panelHeaderIcon={<img alt="passenger" src={passengerIcon} />}
                panelHeaderIcon={
                  <LocalAtmIcon style={{fontSize:30,color:colors.white }} />                }
                panelIconMarginLeft={'12'}
                headerText="CANCEL BREAKUP : FOR SELECTED PAX AND SEGMENT(S)"
                expand={panelsState.passengerDetailsPanel}
                onClick={handlePanelToggle}
              >
               <CancellationDetails />
              </Panel>

              {/* <Grid item xs={12} className="d-flex justify-content-end">
                <Button
                  text="Cancel Selection"
                  className="mr-20"
                  secondary
                  // onClick={handleCancelClick}
                />
                <Button
                  text="Complete Cancel"
                  // onClick={handleCancelClick}
                />
              </Grid> */}
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <div className="right-section">
              <AgencyInformation
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
                    contactDetails={transactionData.customerDetails.contactInfo}
                  />
                )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ConfirmCancelBooking;
