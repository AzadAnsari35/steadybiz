import React from "react";

import { getFormattedPrice } from "Helpers/global";
import { getTotalAmount, getTotalAmountCurrency } from "Helpers/flight.helpers";

import { Card, Text } from "Widgets";

import "./style.scss";

const PaymentDetailsCard = (props) => {
	const { outboundItinerary } = props;
	const totalAmount = getTotalAmount(outboundItinerary);
	const totalAmountCurrency = getTotalAmountCurrency(outboundItinerary);

	return (
		<div className="PaymentDetailsCard">
			<Card title="Payment Details">
				<div className="container">
					<div className="price-category">
						<div className="price-category-container">
							<div className="price-category__title">
								<Text className="font-primary-bold-18" text="Markup & Discount" />
							</div>
							<div className="price-category__description">
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Total Fare" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(totalAmount)} />
								</div>
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Markup" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
								</div>
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Discount" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
								</div>
							</div>
						</div>
						<div className="price-category-container">
							<div className="price-category__title d-flex justify-content-between">
								<Text className="font-primary-bold-18" text="Total Amount" />
								<Text className="font-primary-bold-18" text={getFormattedPrice(totalAmount)} />
							</div>
							<div className="price-category__description">
								<div className="price-category__description-price d-flex justify-content-between">
									<Text className="font-primary-medium-16" text="Commission" />
									<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
								</div>
							</div>
						</div>
					</div>
					<div className="total-section d-flex justify-content-between">
						<Text className="font-primary-bold-22" text="Paid Amount" />
						<Text className="font-primary-bold-22" text={`${totalAmountCurrency} ${getFormattedPrice(totalAmount)}`} />
					</div>
					<div className="d-flex justify-content-between">
						<Text className="font-primary-medium-16" text="Form of Payment" />
						<Text className="font-primary-medium-16" text="Credit Limit" />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default PaymentDetailsCard;
