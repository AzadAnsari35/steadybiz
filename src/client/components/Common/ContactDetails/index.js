import React, { Fragment, useState } from "react";
import { Grid } from "@material-ui/core";

import { ERROR_MESSAGE } from "./constant";
import { validateEmail, validateMobileNumber } from "Helpers/validations";

import { Button, ErrorMessage, SelectWithTextInput, Text, TextInputMui } from "Widgets";

import "./style.scss";

const ContactDetails = (props) => {
	const { countriesDialCodeList } = props;
	const [formData, setFormData] = useState({
		countryCode: "",
		cityCode: "",
		phone: "",
		phoneUseType: "M",
		email: "",
	});
	const [errorData, setErrorData] = useState({
		countryCode: "",
		phone: "",
		email: "",
	});

	const handleChange = (key, value) => {
		if (value !== "") {
			setErrorData({
				...errorData,
				[key]: "",
			});
		}
		setFormData({
			...formData,
			[key]: value,
		});
	};

	const handleSelectOption = (value, id) => {
		if (value !== "") {
			setErrorData({
				...errorData,
				[id]: "",
			});
		}
		setFormData({
			...formData,
			[id]: value.value,
		});
  };

	const validateForm = () => {
		const { countryCode, phone, email } = formData;
		let errorObj = errorData;

		!countryCode.trim() && (errorObj.countryCode = ERROR_MESSAGE.COUNTRY_CODE_REQUIRED);
		!phone.trim() && (errorObj.phone = ERROR_MESSAGE.PHONE_REQUIRED);
		countryCode.trim() &&
			phone.trim() &&
			!validateMobileNumber(phone) &&
			(errorObj.phone = ERROR_MESSAGE.VALID_PHONE_REQUIRED);
		if (!countryCode.trim() && !phone.trim()) {
			errorObj.phone = ERROR_MESSAGE.MOBILE_NUMBER_REQUIRED;
			errorObj.countryCode = "";
		}
		!email.trim() && (errorObj.email = ERROR_MESSAGE.EMAIL_REQUIRED);
		email.trim() && !validateEmail(email) && (errorObj.email = ERROR_MESSAGE.VALID_EMAIL_REQUIRED);

		setErrorData({
			...errorData,
			...errorObj,
		});
		if (!!countryCode && !errorObj.countryCode && !!phone && !errorObj.phone && !!email && !errorObj.email) {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		const { currentPanelId, formId, nextPanelId, visiblePanelName, onSubmit } = props;
		onSubmit(currentPanelId, nextPanelId, true, visiblePanelName, true, formId, formData);
	};

	return (
		<div className="ContactDetails">
			<Text
				className="ContactDetails-subHeading font-primary-regular-18"
				text="Booking details will be sent to this mobile number and email address."
			/>
			<div className="ContactDetails-form d-flex">
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<SelectWithTextInput
							name="phone"
							selectInputName="countryCode"
							type="text"
							label="Mobile Number"
							selectPlaceholder="Dial"
							placeholder="Mobile Number"
							value={formData.phone}
							hasError={!!errorData.countryCode || !!errorData.phone}
							data={countriesDialCodeList.dropDownItems}
							showValue
							useReactHookForm={false}
							onChange={handleChange}
							onSelectChange={handleSelectOption}
						/>
						{!!errorData.phone && <ErrorMessage errorMessage={errorData.phone} />}
						{!!errorData.countryCode && <ErrorMessage errorMessage={errorData.countryCode} />}
					</Grid>
					<Grid item xs={12} md={8}>
						<TextInputMui
							id="email"
							type="text"
							label="Email ID"
							placeholder="Email ID"
							value={formData.email}
							hasError={!!errorData.email}
							onChange={handleChange}
						/>
						{!!errorData.email && <ErrorMessage errorMessage={errorData.email} />}
					</Grid>
				</Grid>
			</div>
			<div className="d-flex justify-content-end">
				<Button text="continue" onClick={validateForm} />
			</div>
		</div>
	);
};

export default ContactDetails;
