import React from "react";

import {
	checkIsFareRefundable,
	getTotalPassengersCount,
	getBaseFareDetails,
	getTaxesAndFeesDetails,
	getTotalFare,
	getHandlingCharges,
	getTotalAmount,
	getTotalAmountCurrency,
} from "Helpers/flight.helpers";
import { getFormattedPrice } from "Helpers/global";

import { Card, Tag, Text } from "Widgets";

import "./style.scss";

const FareDetailsCard = (props) => {
	const { outboundItinerary } = props;
	const isRefundable = checkIsFareRefundable(outboundItinerary);
	const passengersCount = getTotalPassengersCount(outboundItinerary);
	const { baseFareTotal, baseFareBreakup } = getBaseFareDetails(outboundItinerary);
	const { taxTotal, airlineFuelSurcharge, airlineMiscellaneousFee } = getTaxesAndFeesDetails(outboundItinerary);
	const totalFare = getTotalFare(outboundItinerary);
	const handlingCharges = getHandlingCharges(outboundItinerary);
	const totalAmount = getTotalAmount(outboundItinerary);
	const totalAmountCurrency = getTotalAmountCurrency(outboundItinerary);

	return (
		<div className="FareDetailsCard">
			<Card title="Fare Details" cardContainerClassName="position-relative" link="Fare Rule">
				<Tag text={!!isRefundable ? "Refundable" : "Non Refundable"} isSuccess={!!isRefundable} />
				<div className="container">
					<div className="price-category">
						<div className="price-category-container">
							<div className="price-category__title d-flex justify-content-between">
								<Text className="font-primary-bold-18" text={`Base Fare (${passengersCount} Persons)`} />
								<Text className="font-primary-bold-18" text={getFormattedPrice(baseFareTotal)} />
							</div>
							<div className="price-category__description">
								{baseFareBreakup && baseFareBreakup.length > 0 &&
									baseFareBreakup.map((passengerBaseFare, index) => (
										<div key={index} className="price-category__description-price d-flex justify-content-between">
											<Text
												className="font-primary-medium-16"
												text={`${passengerBaseFare.passengerType} x ${passengerBaseFare.passengerCount}`}
											/>
											<Text
												className="font-primary-medium-16"
												text={getFormattedPrice(passengerBaseFare.passengerBaseFare)}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="price-category-container">
							<div className="price-category__title d-flex justify-content-between">
								<Text className="font-primary-bold-18" text="Taxes and Fees" />
								<Text className="font-primary-bold-18" text={getFormattedPrice(taxTotal)} />
							</div>
							<div className="price-category__description">
								{/* DO NOT REMOVE IT - WILL BE USED IN FUTURE */}
								{/* <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Passenger Service Fee" />
                  <Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
                </div> */}
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Airline Fuel Surcharge" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(airlineFuelSurcharge)} />
								</div>
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Airline Miscellaneous Fee" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(airlineMiscellaneousFee)} />
								</div>
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Value Added Tax (VAT)" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
								</div>
							</div>
						</div>
						{/* DO NOT REMOVE IT - WILL BE USED IN FUTURE */}
						{/* <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text className="font-primary-bold-18" text="Other services" />
                <Text className="font-primary-bold-18" text={getFormattedPrice(0)} />
              </div>
              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Insurance" />
                  <Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
                </div>
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Meals" />
                  <Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
                </div>
              </div>
            </div> */}
						<div className="price-category-container">
							<div className="price-category__title d-flex justify-content-between">
								<Text className="font-primary-bold-18" text="Total Fare" />
								<Text className="font-primary-bold-18" text={getFormattedPrice(totalFare)} />
							</div>
							<div className="price-category__description">
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Handling Charges" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(handlingCharges)} />
								</div>
							</div>
						</div>
					</div>
					<div className="total-section d-flex justify-content-between">
						<Text className="font-primary-bold-22" text="Total Amount" />
						<Text className="font-primary-bold-22 text-align-right" text={`${totalAmountCurrency} ${getFormattedPrice(totalAmount)}`} />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default FareDetailsCard;
