import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Hidden from '@material-ui/core/Hidden';
import PrintIcon from "@material-ui/icons/Print";
import AssignmentIcon from "@material-ui/icons/Assignment";

import colors from "Constants/colors";
import routes from "Constants/routes";
import { displayImage } from "Helpers/utils";

// import { getCreditLimitAction } from "./../../actions/common";

import FlightSummary from "Components/Flights/Availability/FlightSummary";
import ContactDetailsStatic from "Components/Common/ContactDetailsStatic/index";
import PassengerInformationStatic from "Components/Common/PassengerInformationStatic";
import PaymentDetails from "Components/Common/PaymentDetails";
import PaymentDetailsCard from "Components/Common/PaymentDetailsCard";
import FlightDetails from "Components/Flights/Availability/FlightDetails";
import FareDetailsCard from "Components/Common/FareDetailsCard";
import OrderDetails from "Components/Common/OrderDetails";

import {
	Alert,
	IconWithBackground,
	Panel,
	Toast
} from "Widgets";
import MailIcon from "Widgets/Icons/MailIcon";
import SearchAirplaneIcon from "Widgets/Icons/SearchAirplaneIcon";
import endpoint from "Config/endpoint";
import { getDataFromRedux } from "Helpers/global";

import "./style.scss";

const Transaction = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showAlert, setShowAlert] = useState(true);

	// const { data: transactionData } = useSelector((state) => state.transaction);
	const transaction = useSelector((state) => state[endpoint.transaction.airprice.reducerName]);
	const flightSearchInput = useSelector(state => state.flightSearchInput);
	const transactionData = getDataFromRedux(transaction);
	const flightSearchInputData = getDataFromRedux(flightSearchInput);

	const { pathname } = history.location;

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// 	pathname === "/transaction/issueTicket" && dispatch(getCreditLimitAction());
	// }, [pathname]);

	const panelsInitialState = {
		flightDetailsPanel: true,
		passengerDetailsPanel: true,
		paymentDetailsPanel: true,
	};

	const [panelsState, setPanelsState] = useState(panelsInitialState);

	const customerDetailList = !!transactionData && transactionData.customerDetails &&
		transactionData.customerDetails.customerDetailList.length > 0 &&
		transactionData.customerDetails.customerDetailList;
	
	const flightSegments = !!transactionData && transactionData.outboundItinerary &&
		transactionData.outboundItinerary.flightSegments.length > 0 &&
		transactionData.outboundItinerary.flightSegments;

	const passengersTypeCount = customerDetailList.length > 0 && customerDetailList.reduce((obj, v) => {
		obj[v.passengerInfo.passengerType] = (obj[v.passengerInfo.passengerType] || 0) + 1;
		return obj;
	}, {});

	const handlePanelToggle = (id, value) => {
		setPanelsState({
			...panelsState,
			[id]: !!value ? value : !panelsState[id],
		});
	};

	const handleCancelClick = () => {
		// history.push("/search");
	};

	const handleConfirmClick = () => {
		setShowAlert(false);
	};

	const handlePay = () => {
		const viewBookingPath = routes.viewBooking.split("/")[1];
		history.push(viewBookingPath);
	};

	const renderFlightBookingActions = () => (
		<div className="d-flex">
			<IconWithBackground alt="mail" bgColor={colors.jacksonsPurple} className="mr-10" showCursor>
				<MailIcon color={colors.jacksonsPurple1} size={24} />
			</IconWithBackground>
			<IconWithBackground alt="mail" bgColor={colors.california1} showCursor>
				<PrintIcon style={{ color: colors.california, width: "24px", height: "24px" }} />
			</IconWithBackground>
		</div>
	);

	// const flightSummary = () => <PassengerInformationFlightSummary outboundItinerary={transactionData.outboundItinerary} />;
	// const flightSummary = () => <FlightSummary outboundItinerary={!!transactionData && transactionData.outboundItinerary} />;
	const flightSummary = () => <FlightSummary requestBody={flightSearchInputData} />;

	return (
		<Fragment>
			{pathname !== "/transaction/issueTicket" && (
				<Fragment>
					<Toast
						isSuccess={!!transactionData.orderNo}
						message={
							!!transactionData.orderNo && !transactionData.isTicketing
								? "PNR is created, Your Booking on Hold"
								: "Your Booking has been confirmed"
						}
					/>
				</Fragment>
			)}
			<div className="transaction layout-wrapper">
				<Grid item xs={12}>
					{!!transactionData.airPricing && showAlert && (
						<div className="alert-section mb-66">
							<Alert
								danger={transactionData.airPricing.showRedBox}
								className="mb-32"
								alertTitle="change alert"
								alertMessage={
									transactionData.airPricing.showMessage &&
									(transactionData.airPricing.Message || transactionData.airPricing.message)
								}
								showSecondaryAction
								secondaryActionText="cancel"
								showPrimaryAction={transactionData.airPricing.showConfirmButton}
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
						panelHeaderIcon={<AssignmentIcon style={{ color: colors.white, width: "40px", height: "32px" }} />}
						panelIconMarginLeft={"10"}
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
							ticketTimeLimit={transactionData.ticketTimeLimit}
						/>
					</Panel>
				</Grid>
				<div className="transaction-details d-flex">
					<Grid item xs={12} md={9}>
						<div className="left-section">
							<Panel
								id="flightDetailsPanel"
								title="flight details"
								panelHeaderIcon={<SearchAirplaneIcon size={30} color={colors.white} />}
								panelIconMarginLeft={"14"}
								showHeaderContent
								headerContent={flightSummary()}
								expand={panelsState.flightDetailsPanel}
								noPadding
								onClick={handlePanelToggle}
								addExtraMargin
							>
								<div className="transaction-details__content">
									<FlightDetails itinerary={transactionData.outboundItinerary} />
								</div>
							</Panel>
							<Panel
								id="passengerDetailsPanel"
								title="passenger details"
								// panelHeaderIcon={<img alt="passenger" src={passengerIcon} />}
								panelHeaderIcon={<img alt="passenger" src={displayImage("passenger.svg")} />}
								panelIconMarginLeft={"12"}
								headerText={`PASSENGER : ${!!passengersTypeCount.ADT && "ADT"} ${
									!!passengersTypeCount.CHD ? " | CHD" : ""
								} ${!!passengersTypeCount.INF ? " | INF" : ""}`}
								expand={panelsState.passengerDetailsPanel}
								onClick={handlePanelToggle}
							>

								<PassengerInformationStatic
									customersList={!!customerDetailList && customerDetailList}
									flightSegments={flightSegments}
								/>
							</Panel>
							{/* <Hidden only="md"> */}
							<Hidden mdUp={true}>
								<div className="fareDetails-mob">
									<FareDetailsCard outboundItinerary={transactionData.outboundItinerary} />
									{transactionData.isTicketing && <PaymentDetailsCard outboundItinerary={transactionData.outboundItinerary} />}
									{transactionData.customerDetails && transactionData.customerDetails.contactInfo && (
										<ContactDetailsStatic contactDetails={transactionData.customerDetails.contactInfo} />
									)}
								</div>
							</Hidden>
							{pathname === "/transaction/issueTicket" && (
								<Panel
									id="paymentDetailsPanel"
									title="payment details"
									panelHeaderIcon={<img alt="payment" src={displayImage("payment.svg")} />}
									panelIconMarginLeft={"12"}
									headerText="PAYMENT : Credit Limit | Credit Card"
									expand={panelsState.paymentDetailsPanel}
									onClick={handlePanelToggle}
								>
									<PaymentDetails outboundItinerary={transactionData.outboundItinerary} onPay={handlePay} />
								</Panel>
							)}
						</div>
					</Grid>
					{/* <Hidden only="xs"> */}
					<Hidden mdDown={true}>
						<Grid item xs={12} md={3}>
							<div className="right-section">
								<FareDetailsCard outboundItinerary={transactionData.outboundItinerary} />
								{transactionData.isTicketing && <PaymentDetailsCard outboundItinerary={transactionData.outboundItinerary} />}
								{transactionData.customerDetails && transactionData.customerDetails.contactInfo && (
									<ContactDetailsStatic contactDetails={transactionData.customerDetails.contactInfo} />
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