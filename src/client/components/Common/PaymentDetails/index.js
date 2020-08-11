import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import endpoint from "Config/endpoint";
import { getTotalAmount, getTotalAmountCurrency } from "Helpers/flight.helpers";
import { isEmptyObj, getDataFromRedux } from "Helpers/global";
import { displayImage } from "Helpers/utils";

import { Button } from "Widgets";
import PaymentTabs from "./../PaymentTabs";
import CreditLimit from "./../CreditLimit";

// import moneyWhiteIcon from "./../../assets/money-icon-white.svg";
// import moneyBlackIcon from "./../../assets/money-icon-black.svg";
// import creditCardWhiteIcon from "./../../assets/credit-card-icon-white.svg";
// import creditCardBlackIcon from "./../../assets/credit-card-icon-black.svg";

import "./style.scss";

const paymentTabs = [
	{
		id: "creditLimit",
		// whiteIcon: moneyWhiteIcon,
		// blackIcon: moneyBlackIcon,
		whiteIcon: displayImage("money-icon-white.svg"),
		blackIcon: displayImage("money-icon-black.svg"),
    text: "Credit Limit",
    disabled: false,
	},
	{
		id: "creditCard",
		// whiteIcon: creditCardWhiteIcon,
		// blackIcon: creditCardBlackIcon,
		whiteIcon: displayImage("credit-card-icon-white.svg"),
		blackIcon: displayImage("credit-card-icon-black.svg"),
    text: "Credit / Debit Card",
    disabled: true,
	},
];

const PaymentDetails = (props) => {
	const { className, isPayDisabled = false, outboundItinerary, onPay } = props;
	const [activeTab, setActiveTab] = useState("creditLimit");
	const creditLimitData = useSelector((state) => state[endpoint.creditLimit.getInstantCreditlimit.reducerName]);
	const creditLimit = getDataFromRedux(creditLimitData);

	const totalAmount = getTotalAmount(outboundItinerary);
	const totalAmountCurrencyCode = getTotalAmountCurrency(outboundItinerary);
	const creditLimitAmount = !isEmptyObj(creditLimit.data) &&
		!!creditLimit.data && Number(creditLimit.data.balanceAmount);
	const creditLimitCurrencyCode = !isEmptyObj(creditLimit.data) &&
		!!creditLimit.data && creditLimit.data.currencyCode;
	const remainingCreditLimitAmount = !isEmptyObj(creditLimit.data) &&
		!!creditLimit.data && Number(creditLimit.data.balanceAmount) - totalAmount;

	const handleTabClick = (id) => {
		setActiveTab(id);
	};

	return (
		<div className={`PaymentDetails ${!!className ? className : ""}`}>
			<div className="PaymentDetails-content">
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<PaymentTabs tabs={paymentTabs} activeTab={activeTab} onTabClick={handleTabClick} />
					</Grid>
					<Grid item xs={12} md={8}>
						<CreditLimit
							creditLimitAmount={creditLimitAmount}
							creditLimitCurrencyCode={creditLimitCurrencyCode}
							remainingCreditLimitAmount={remainingCreditLimitAmount}
							totalAmount={Number(totalAmount)}
							totalAmountCurrencyCode={totalAmountCurrencyCode}
						/>
					</Grid>
				</Grid>
			</div>
			<div className="d-flex justify-content-end">
				<Button text="pay" onClick={onPay} disabled={remainingCreditLimitAmount < 0 || isPayDisabled} />
			</div>
		</div>
	);
};

export default PaymentDetails;
