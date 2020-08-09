import React from "react";
import { Grid } from "@material-ui/core";

import { getFormattedPrice } from "Helpers/global";

import { Text } from "Widgets";

import "./style.scss";

const CreditLimit = (props) => {
	const {
		creditLimitAmount,
		creditLimitCurrencyCode,
		remainingCreditLimitAmount,
		totalAmount,
		totalAmountCurrencyCode,
	} = props;
	const creditData = [
		{
			text: "Available Credit Limit",
			currency: creditLimitCurrencyCode || "",
			value: creditLimitAmount || 0,
		},
		{
			text: "Transaction Amount",
			currency: totalAmountCurrencyCode || "",
			value: totalAmount || 0,
		},
		{
			text: "Credit Limit after Transaction",
			currency: creditLimitCurrencyCode || "",
			value: remainingCreditLimitAmount || 0,
		},
	];

	return (
		<div className="CreditLimit">
			<Text
				showLeftBorder
				className="CreditLimit-title font-primary-medium-18"
				text="Credit Limit"
				style={{ paddingLeft: "10px" }}
			/>
			<div className="CreditLimit-table border-bottom-dark-gray-thin">
				{creditData.map((creditItem, index) => (
					<Grid key={index} container spacing={2}>
						<Grid item xs={6} md={7}>
							<Text className="font-primary-medium-16" text={creditItem.text} />
						</Grid>
						<Grid item xs={2}>
							{!!creditLimitCurrencyCode && !!totalAmountCurrencyCode && (
								<Text className="font-primary-semibold-16" text={creditItem.currency} />
							)}
						</Grid>
						<Grid item xs={4} md={3}>
							{!!creditLimitAmount && !!totalAmount && (
								<Text className="font-primary-semibold-16 text-align-right" text={getFormattedPrice(creditItem.value)} />
							)}
						</Grid>
					</Grid>
				))}
			</div>
			<div className="CreditLimit-net">
				<Text className="font-primary-regular-20 mr-10" text="Net amount to be paid" />
				{!!creditLimitAmount && !!totalAmount && (
					<Text className="font-primary-semibold-20" text={`${totalAmountCurrencyCode} ${getFormattedPrice(totalAmount)}`} />
				)}
			</div>
		</div>
	);
};

export default CreditLimit;
