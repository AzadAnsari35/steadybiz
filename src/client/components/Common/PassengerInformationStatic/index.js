import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

import { getPassengerTypeName } from "Helpers/global";

import { Text } from "Widgets";

import "./style.scss";

const PassengerInformationStatic = (props) => {
	const { customersList, flightSegments } = props;

	return (
		<div className="PassengerInformationStatic">
			{customersList.map((customer, index) => (
				<div key={index} className="PassengerInformationStatic-passenger">
					<Text
						className="font-primary-medium-24 mb-24"
						text={`${customer.passengerInfo.title} ${customer.passengerInfo.firstName} ${
							customer.passengerInfo.lastName
						} (${getPassengerTypeName(customer.passengerInfo.passengerType, true)})`}
					/>
					{flightSegments.map((segment, index) => (
						<Fragment key={index}>
							{segment.flightSegmentGroup.map((segmentGroup, index) => {
								const departureCityName = segmentGroup.departureDetails.cityName;
								const departureCityCode = segmentGroup.departureDetails.cityCode;
								const arrivalCityName = segmentGroup.arrivalDetails.cityName;
								const arrivalCityCode = segmentGroup.arrivalDetails.cityCode;
								const checkinBaggageObj = !!segmentGroup.baggageInformation && segmentGroup.baggageInformation.checkInBaggage;
								const cabinBaggageObj = !!segmentGroup.baggageInformation && segmentGroup.baggageInformation.cabinBaggage;
								const airlinePnr = !!segmentGroup.airlinePnr && segmentGroup.airlinePnr;
								return (
									<div key={index} className="PassengerInformationStatic-passenger__segment">
										<Text
											className="font-primary-medium-18 mb-24"
											text={`${departureCityName} (${departureCityCode}) - ${arrivalCityName} (${arrivalCityCode})`}
											showLeftBorder
										/>
										<div className="PassengerInformationStatic-passenger__segment-items d-flex flex-wrap-wrap">
											{!!airlinePnr && (
												<Grid item xs={12} md={4}>
													<div className="d-flex item-detail">
														<Text className="font-primary-medium-14 mr-10" text="Airline PNR No.: " />
														<Text className="font-primary-bold-14" text={airlinePnr} />
													</div>
												</Grid>
											)}
											{customer.tickets && customer.tickets.ticketNumber && (
												<Grid item xs={12} md={4}>
													<div className="d-flex item-detail">
														<Text className="font-primary-medium-14 mr-10" text="Ticket No: " />
														<Text className="font-primary-bold-14" text={customer.tickets.ticketNumber} />
													</div>
												</Grid>
											)}
											{/* FOR FUTURE REFERENCE */}
											{/* <Grid item xs={12} md={4}>
												<div className="d-flex item-detail">
													<Text className="font-primary-medium-14 mr-10" text="Seat No: " />
													<Text className="font-primary-bold-14" text="3A" />
												</div>
											</Grid> */}
											<Grid item xs={12} md={4}>
												<div className="d-flex item-detail">
													<Text className="font-primary-medium-14 mr-10" text="Check In Baggage: " />
													<Text
														className="font-primary-bold-14"
														text={`${
															!!checkinBaggageObj && checkinBaggageObj.unit === "kg"
																? `${!!checkinBaggageObj && checkinBaggageObj.weight} kg`
																: `${!!checkinBaggageObj && checkinBaggageObj.noOfPieces} Pieces`
														} / Person`}
													/>
												</div>
											</Grid>
											<Grid item xs={12} md={4}>
												<div className="d-flex item-detail">
													<Text className="font-primary-medium-14 mr-10" text="Cabin Baggage: " />
													<Text
														className="font-primary-bold-14"
														text={`${
															cabinBaggageObj.unit === "kg"
																? `${cabinBaggageObj.weight} kg`
																: `${cabinBaggageObj.noOfPieces} Pieces`
														} / Person`}
													/>
												</div>
											</Grid>
											{/* FOR FUTURE REFERENCE */}
											{/* <Grid item xs={12} md={4}>
												<div className="d-flex item-detail">
													<Text className="font-primary-medium-14 mr-10" text="Meal: " />
													<Text className="font-primary-bold-14" text="Vegetarian Child Meal" />
												</div>
											</Grid> */}
										</div>
									</div>
								);
							})}
						</Fragment>
					))}
				</div>
			))}
		</div>
	);
};

export default PassengerInformationStatic;
