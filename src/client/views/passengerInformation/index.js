import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { commonAction, commonActionWithoutApi } from 'Actions';
import endpoint from 'Config/endpoint';
import routes from 'Constants/routes';
import {
  getDataFromRedux,
  getCountryNamesList,
  getCountryPhoneCodeList,
  getModifiedAirlinesList,
  getUniqueArrayOfObjects,
  sortList,
} from 'Helpers/global';
import { showError, getItemFromStorage } from 'Helpers/utils';
import endpointWithoutApi from 'Config/endpointWithoutApi';
// import {
// 	scrollToRef,
// } from "./../../utils/helpers/common";
import colors from 'Constants/colors';
import securityOptionConstant from 'Constants/securityOptionConstant';
import { utils } from 'Helpers';

import { PAYMENT_MODE, dropDownParam } from 'Constants/commonConstant.js';
import ContactDetails from 'Components/Common/ContactDetails';
import FlightDetails from 'Components/Flights/Availability/FlightDetails';
import FlightSummary from 'Components/Flights/Availability/FlightSummary';
// import FareDetailsCard from 'Components/Common/FareDetailsCard';
import AgencyInformation from 'Components/Common/AgencyInformation';

import PassengerDetails from 'Components/Common/PassengerDetails';
import TicketTimeLimitDetails from 'Components/Common/TicketTimeLimitDetails';
import PaymentDetails from 'Components/Common/PaymentDetails';
import { Alert, Button, Image, Panel } from 'Widgets';
import SearchAirplaneIcon from 'Widgets/Icons/SearchAirplaneIcon';
import useDropDown from 'Hooks/useDropDown';

import './style.scss';

const PassengerInformation = () => {
  const panelsInitialState = {
    flightDetailsPanel: true,
    contactDetailsPanel: false,
    passengerDetailsPanel: false,
    ticketTimeLimitDetailsPanel: false,
    paymentDetailsPanel: false,
  };
  const visiblePanelsInitialState = {
    isFlightDetailsPanelVisible: true,
    isContactDetailsPanelVisible: false,
    isPassengerDetailsPanelVisible: false,
    isTicketTimeLimitDetailsPanelVisible: false,
    isPaymentDetailsPanelVisible: false,
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [panelsState, setPanelsState] = useState(panelsInitialState);
  const [visiblePanelsState, setVisiblePanelsState] = useState(
    visiblePanelsInitialState
  );
  const [showFlightDetailContinue, setShowFlightDetailContinue] = useState(
    true
  );
  const [showAlert, setShowAlert] = useState(true);
  const [createPNRProcessing, setCreatePNRProcessing] = useState(false);
  const [
    timeLimitContinueProcessing,
    setTimeLimitContinueProcessing,
  ] = useState(false);
  const [bookingProcessing, setBookingProcessing] = useState(false);
  const [mode, setMode] = useState('');

  const masterCountries = useSelector(
    (state) => state[endpoint.master.countries.reducerName]
  );
  const masterAirlines = useSelector(
    (state) => state[endpoint.master.airlines.reducerName]
  );
  const transactionData = useSelector(
    (state) => state[endpoint.transaction.airprice.reducerName]
  );
  const flightSelectData = useSelector(
    (state) => state[endpointWithoutApi.flights.flightSelect.reducerName]
  );
  const flightSearchInput = useSelector((state) => state.flightSearchInput);
  const passengerInformationAllData = useSelector(
    (state) =>
      state[endpointWithoutApi.common.passengerInformationData.reducerName]
  );
  const countriesList = getDataFromRedux(masterCountries);
  const airlinesList = getDataFromRedux(masterAirlines);
  const flightSearchInputData = getDataFromRedux(flightSearchInput);
  const passengerInformationData = getDataFromRedux(
    passengerInformationAllData
  );
  const transaction = getDataFromRedux(transactionData);

  const flightSelect = getDataFromRedux(flightSelectData);
  const {
    flightItineraryValidate,
    flightReValidate,
    outboundItinerary,
    paxCount,
  } = flightSelect;

  const [alertData, setAlertData] = useState(flightReValidate);

  const alertRef = useRef(null);

  // const countryPhoneCodesList = !!countriesList.data && sortList(getUniqueArrayOfObjects(getCountryPhoneCodeList(countriesList.data), "value"), "value");
  const countryNamesList =
    !!countriesList.data && getCountryNamesList(countriesList.data);
  const modifiedAirlinesList =
    !!airlinesList.data && getModifiedAirlinesList(airlinesList.data);

  const countryPhoneCodesList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    endpoint.master.countries.reducerName,
    false,
    null,
    false
  );

  useEffect(() => {
    //console.log('hi', flightSelectData);
    if (flightSelectData.items) {
      try {
        //dispatch(commonAction(endpoint.flights.flightSelect, flightSelect));
        if (flightSelectData.items.status)
          dispatch(commonAction(endpoint.master.countries));
        //else dispatch(utils.showErrorBox(flightSelectData.items.error.message));
      } catch (err) {
        dispatch(utils.showErrorBox(err.message));
      }
    }
  }, [flightSelectData]);

  // useEffect(() => {
  // 	window.scrollTo(0, 0);
  // 	dispatch(getContriesListAction());
  // 	dispatch(getAirlinesListAction());
  // 	if (!!alertData) {
  // 		setShowFlightDetailContinue(false);
  // 	}
  // }, []);

  useEffect(() => {
    // if (transaction.status && createPNRProcessing && mode === "createPNR") {
    // 	handleTransactionResponse(transaction, mode);
    // } else if (transaction.status && bookingProcessing && mode === "pay") {
    // 	handleTransactionResponse(transaction, mode);
    // }
    if (transactionData.items)
      if (transactionData.items.status) {
        if (createPNRProcessing && mode === 'createPNR') {
          handleTransactionResponse(transaction, mode);
        } else if (bookingProcessing && mode === 'pay') {
          handleTransactionResponse(transaction, mode);
        }
      } else {
        setCreatePNRProcessing(false);
        setTimeLimitContinueProcessing(false);
        setBookingProcessing(false);
        setMode('');
        dispatch(utils.showErrorBox(transactionData.items.error.message));
      }
  }, [transactionData]);

  const handleCancelClick = () => {
    history.push(routes.flight.search);
  };

  const handleConfirmClick = () => {
    setShowAlert(false);
    setShowFlightDetailContinue(true);
  };

  const handlePanelToggle = (id, value) => {
    setPanelsState({
      ...panelsState,
      [id]: value ? value : !panelsState[id],
    });
  };

  const handleMultiplePanelToggle = (
    currentPanelId,
    nextPanelId,
    nextPanelValue
  ) => {
    setPanelsState({
      ...panelsState,
      [currentPanelId]: !panelsState[currentPanelId],
      [nextPanelId]: nextPanelValue
        ? nextPanelValue
        : !panelsState[nextPanelId],
    });
  };

  const handleVisiblePanel = (id, value) => {
    setVisiblePanelsState({
      ...visiblePanelsState,
      [id]: value ? value : !visiblePanelsState[id],
    });
  };

  const handleContinue = (
    currentPanelId,
    nextPanelId,
    nextPanelValue,
    visiblePanelName,
    visiblePanelValue,
    formId,
    formData
  ) => {
    handleMultiplePanelToggle(currentPanelId, nextPanelId, nextPanelValue);
    handleVisiblePanel(visiblePanelName, visiblePanelValue);
    handleFormSubmit(formId, formData);
  };

  const handleFormSubmit = (key, data) => {
    const clonedPassengerInformationData = { ...passengerInformationData };
    let formData = {};
    if (key === 'contactInfo' || key === 'customerDetailList') {
      formData = {
        ...clonedPassengerInformationData,
        customerDetails: {
          ...clonedPassengerInformationData.customerDetails,
          [key]: data,
        },
      };
    } else {
      formData = {
        ...clonedPassengerInformationData,
        [key]: data,
      };
    }
    try {
      dispatch(
        commonActionWithoutApi(
          endpointWithoutApi.common.passengerInformationData,
          formData
        )
      );
    } catch (err) {
      showError(err, setError);
    }
  };

  const handleCreatePNR = (formId, formData) => {
    handleFormSubmit(formId, formData);
    const clonedPassengerInformationPostData = {
      ...passengerInformationData,
    };
    clonedPassengerInformationPostData[formId] = formData;
    setCreatePNRProcessing(true);
    setTimeLimitContinueProcessing(true);
    setMode('createPNR');
    try {
      dispatch(
        commonAction(
          endpoint.transaction.airprice,
          clonedPassengerInformationPostData
        )
      );
    } catch (err) {
      showError(err, setError);
    }
  };

  const handleTimeLimitContinue = (
    currentPanelId,
    nextPanelId,
    nextPanelValue,
    visiblePanelName,
    visiblePanelValue,
    formId,
    formData
  ) => {
    setTimeLimitContinueProcessing(true);
    let officeId = getItemFromStorage('officeId');
    try {
      dispatch(
        commonAction(endpoint.creditLimit.getInstantCreditlimit, { officeId })
      );
    } catch (err) {
      console.log('err', err);
    }
    handleContinue(
      currentPanelId,
      nextPanelId,
      nextPanelValue,
      visiblePanelName,
      visiblePanelValue,
      formId,
      formData
    );
    handleMultiplePanelToggle(currentPanelId, nextPanelId, nextPanelValue);
    setTimeout(() => {
      setTimeLimitContinueProcessing(false);
    }, 1000);
  };

  const handlePay = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.flights.issueTicket
    );
    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    const formId = 'paymentInfo';
    const formData = PAYMENT_MODE[0];
    handleFormSubmit(formId, formData);
    const clonedPassengerInformationPostData = {
      ...passengerInformationData,
    };
    clonedPassengerInformationPostData[formId] = formData;
    setBookingProcessing(true);
    setMode('pay');
    try {
      dispatch(
        commonAction(
          endpoint.transaction.airPriceAndTicketing,
          clonedPassengerInformationPostData
        )
      );
    } catch (err) {
      showError(err, setError);
    }
  };

  const handleTransactionResponse = (transactionData, mode) => {
    if (mode === 'createPNR') {
      setCreatePNRProcessing(false);
      setTimeLimitContinueProcessing(false);
    } else {
      setBookingProcessing(false);
    }
    setMode('');
    if (transactionData.flightReValidate) {
      setAlertData(transactionData.flightReValidate);
      setShowAlert(true);
      // scrollToRef(alertRef);
    } else if (transactionData.orderNo) {
      mode === 'createPNR'
        ? history.push(routes.transaction.viewPNR)
        : history.push(routes.transaction.viewBooking);
    }
  };

  const flightSummary = () => (
    <FlightSummary requestBody={flightSearchInputData} />
  );
  //console.log(flightSelectData.items);
  return (
    <Fragment>
      <div className="passenger-information layout-wrapper">
        <Grid item xs={12}>
          {!!alertData && showAlert && (
            <div className="alert-section mb-66" ref={alertRef}>
              <Alert
                danger={alertData.showRedBox}
                className="mb-32"
                alertTitle="change alert"
                alertMessage={
                  alertData.showMessage &&
                  (alertData.Message || alertData.message)
                }
                showSecondaryAction
                secondaryActionText="cancel"
                showPrimaryAction={alertData.showConfirmButton}
                primaryActionText="confirm"
                onCancelClick={handleCancelClick}
                onConfirmClick={handleConfirmClick}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          {flightSelectData.items && !flightSelectData.items.status && (
            <div className="alert-section mb-66" ref={alertRef}>
              <Alert
                danger={true}
                className="mb-32"
                alertTitle="change alert"
                alertMessage={flightSelectData.items.error.message}
                showPrimaryAction={false}
                showSecondaryAction
                secondaryActionText="Ok"
                onCancelClick={handleCancelClick}
              />
            </div>
          )}
        </Grid>

        {flightSelect && (
          <div className="passenger-details d-flex">
            <Grid item xs={12} md={9}>
              <div className="left-section">
                {visiblePanelsState.isFlightDetailsPanelVisible && (
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
                    addExtraMargin
                    onClick={handlePanelToggle}
                  >
                    <div className="passenger-details__content">
                      <FlightDetails itinerary={outboundItinerary} />
                      {!!showFlightDetailContinue && (
                        <div className="d-flex justify-content-end">
                          <Button
                            className="passenger-details__panelSubmit"
                            text="continue"
                            onClick={() =>
                              handleContinue(
                                'flightDetailsPanel',
                                'contactDetailsPanel',
                                true,
                                'isContactDetailsPanelVisible',
                                true,
                                'outboundItinerary',
                                outboundItinerary
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Panel>
                )}
                {visiblePanelsState.isContactDetailsPanelVisible && (
                  <Panel
                    id="contactDetailsPanel"
                    title="contact details"
                    panelHeaderIcon={
                      <Image altText="contact" imgName="contact.svg" />
                    }
                    panelIconMarginLeft={'14'}
                    headerText="CONTACT : Mobile | Email"
                    expand={panelsState.contactDetailsPanel}
                    onClick={handlePanelToggle}
                  >
                    <ContactDetails
                      formId="contactInfo"
                      countriesDialCodeList={countryPhoneCodesList}
                      currentPanelId="contactDetailsPanel"
                      nextPanelId="passengerDetailsPanel"
                      visiblePanelName="isPassengerDetailsPanelVisible"
                      onSubmit={handleContinue}
                    />
                  </Panel>
                )}
                {visiblePanelsState.isPassengerDetailsPanelVisible && (
                  <Panel
                    id="passengerDetailsPanel"
                    title="passenger details"
                    panelHeaderIcon={
                      <Image altText="passenger" imgName="passenger.svg" />
                    }
                    panelIconMarginLeft={'12'}
                    headerText={`PASSENGER : ${
                      paxCount.adultCount > 0 && 'ADT'
                    } ${paxCount.childCount > 0 ? ' | CHD' : ''} ${
                      paxCount.infantCount > 0 ? ' | INF' : ''
                    }`}
                    expand={panelsState.passengerDetailsPanel}
                    onClick={handlePanelToggle}
                  >
                    <PassengerDetails
                      formId="customerDetailList"
                      airlines={modifiedAirlinesList}
                      paxCount={paxCount}
                      countryNamesList={countryNamesList}
                      currentPanelId="passengerDetailsPanel"
                      nextPanelId="ticketTimeLimitDetailsPanel"
                      visiblePanelName="isTicketTimeLimitDetailsPanelVisible"
                      onSubmit={handleContinue}
                    />
                  </Panel>
                )}
                {visiblePanelsState.isTicketTimeLimitDetailsPanelVisible && (
                  <Panel
                    id="ticketTimeLimitDetailsPanel"
                    title="ticket time limit details"
                    panelHeaderIcon={
                      <Image altText="timer" imgName="clock.svg" />
                    }
                    panelIconMarginLeft={'12'}
                    headerText="TIME LIMIT : PNR"
                    expand={panelsState.ticketTimeLimitDetailsPanel}
                    onClick={handlePanelToggle}
                  >
                    <TicketTimeLimitDetails
                      formId="ticketTimeLimit"
                      currentPanelId="ticketTimeLimitDetailsPanel"
                      nextPanelId="paymentDetailsPanel"
                      visiblePanelName="isPaymentDetailsPanelVisible"
                      flightItineraryValidate={flightItineraryValidate}
                      secondaryBtnDisabled={createPNRProcessing}
                      primaryBtnDisabled={timeLimitContinueProcessing}
                      onCreatePNR={handleCreatePNR}
                      onSubmit={handleTimeLimitContinue}
                    />
                  </Panel>
                )}
                <Hidden mdUp={true}>
                  <div className="fareDetails-mob">
                    <AgencyInformation outboundItinerary={outboundItinerary} />
                  </div>
                </Hidden>
                {visiblePanelsState.isPaymentDetailsPanelVisible && (
                  <Panel
                    id="paymentDetailsPanel"
                    title="payment details"
                    panelHeaderIcon={
                      <Image altText="payment" imgName="payment.svg" />
                    }
                    panelIconMarginLeft={'12'}
                    headerText="PAYMENT : Credit Limit | Credit Card"
                    expand={panelsState.paymentDetailsPanel}
                    onClick={handlePanelToggle}
                  >
                    <PaymentDetails
                      isPayDisabled={bookingProcessing}
                      outboundItinerary={outboundItinerary}
                      onPay={handlePay}
                    />
                  </Panel>
                )}
              </div>
            </Grid>
            <Hidden mdDown={true}>
              <Grid item xs={12} md={3}>
                <div className="right-section">
                  <AgencyInformation outboundItinerary={outboundItinerary} />
                </div>
              </Grid>
            </Hidden>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PassengerInformation;
