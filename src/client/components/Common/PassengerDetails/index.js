import React, { Fragment, useState } from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";

import { ERROR_MESSAGE } from "./constant";
import { TITLES } from "Constants/commonConstant";
import { validateFirstName, validateLastName } from "Helpers/validations";
import { checkAllEmptyProperties } from "Helpers/global";

import { Button, FormPanel, Text } from "Widgets";
import PassengerPrimaryInformation from "./../PassengerPrimaryInformation";
import PassengerPassportInformation from "./../PassengerPassportInformation";

import "./style.scss";

const PassengerDetails = (props) => {
	const { airlines, countryNamesList, paxCount } = props;
	const initialActivePassengerIds = {};
	const initialPassengersFormDataState = [];
	const initialPassengersErrorDataState = [];
	const commonFormData = {
		title: "",
		firstName: "",
		lastName: "",
		dob: "",
		passportNumber: "",
		issuingCountry: "",
		passportExpiry: "",
		nationality: "",
		frequentFlyerAirline: "",
		frequentFlyerNumber: "",
	};
	const passengerCommonData = {
		name: "",
		hasError: false,
		isActive: false,
		...commonFormData,
	};
	const passengerErrorCommonData = {
		...commonFormData,
	};
	const totalPaxCount = paxCount.adultCount + paxCount.childCount + paxCount.infantCount;
	if (totalPaxCount > 0) {
		for (let i = 0; i < totalPaxCount; i++) {
			initialActivePassengerIds[`passenger${i + 1}`] = true;
		}
	}
	if (paxCount.adultCount) {
		for (let i = 0; i < paxCount.adultCount; i++) {
			initialPassengersFormDataState.push({
				id: Object.keys(initialActivePassengerIds)[i],
				typeText: `ADULT ${i + 1}`,
				type: "ADT",
				minDob: "",
				maxDob: paxCount.adultDobRange,
				...passengerCommonData,
			});
			initialPassengersErrorDataState.push({
				id: Object.keys(initialActivePassengerIds)[i],
				...passengerErrorCommonData,
			});
		}
	}
	if (paxCount.childCount) {
		for (let i = 0; i < paxCount.childCount; i++) {
			initialPassengersFormDataState.push({
				id: Object.keys(initialActivePassengerIds)[paxCount.adultCount + i],
				typeText: `CHILD ${i + 1}`,
				type: "CHD",
				minDob: paxCount.childDobRange.split(",")[0],
				maxDob: paxCount.childDobRange.split(",")[1],
				...passengerCommonData,
			});
			initialPassengersErrorDataState.push({
				id: Object.keys(initialActivePassengerIds)[paxCount.adultCount + i],
				...passengerErrorCommonData,
			});
		}
	}
	if (paxCount.infantCount) {
		for (let i = 0; i < paxCount.infantCount; i++) {
			initialPassengersFormDataState.push({
				id: Object.keys(initialActivePassengerIds)[paxCount.adultCount + paxCount.childCount + i],
				typeText: `INFANT ${i + 1}`,
				type: "INF",
				minDob: paxCount.infantDobRange.split(",")[0],
				maxDob: paxCount.infantDobRange.split(",")[1],
				...passengerCommonData,
			});
			initialPassengersErrorDataState.push({
				id: Object.keys(initialActivePassengerIds)[paxCount.adultCount + paxCount.childCount + i],
				...passengerErrorCommonData,
			});
		}
	}
	const [activePassengersList, setActivePassengersList] = useState(initialActivePassengerIds);
	const [passengersFormData, updatePassengersFormData] = useState(initialPassengersFormDataState);
	const [passengersErrorData, updatePassengersErrorData] = useState(initialPassengersErrorDataState);

	const handleFocus = (id) => {
		const clonedPassengersFormData = [...passengersFormData];
		const updatedPassengerIndex = passengersFormData.findIndex((passenger) => passenger.id === id);
		clonedPassengersFormData.forEach((passenger, index) => {
			if (updatedPassengerIndex === index) {
				clonedPassengersFormData[updatedPassengerIndex]["isActive"] = true;
			} else {
				passenger.isActive = false;
			}
		});
		updatePassengersFormData(clonedPassengersFormData);
	};

	const handleChange = (id, key, value) => {
		const updatedKey = key.split("-")[0];
		const clonedPassengersFormData = [...passengersFormData];
		const clonedPassengersErrorData = [...passengersErrorData];
		const updatedPassengerIndex = passengersFormData.findIndex((passenger) => passenger.id === id);
		if (value !== "") {
			clonedPassengersErrorData[updatedPassengerIndex][updatedKey] = "";
			updatePassengersErrorData(clonedPassengersErrorData);
		}
		clonedPassengersFormData[updatedPassengerIndex][updatedKey] = value;
		clonedPassengersFormData.forEach((passenger, index) => {
			if (updatedPassengerIndex === index) {
				clonedPassengersFormData[updatedPassengerIndex]["isActive"] = true;
			} else {
				passenger.isActive = false;
			}
		});
		updatePassengersFormData(clonedPassengersFormData);
	};

	const handlePassengerPanelClick = (id) => {
		setActivePassengersList({
			...activePassengersList,
			[id]: !activePassengersList[id],
		});
	};

	const formatPassengersFormData = (passengersFormData) => {
		const formattedData = [];
		for (let i = 0; i < passengersFormData.length; i++) {
			formattedData.push({
				passengerInfo: {
					title: passengersFormData[i].title,
					firstName: passengersFormData[i].firstName,
					lastName: passengersFormData[i].lastName,
					meal: null,
					nationality: passengersFormData[i].nationality,
					dateOfBirth: !!passengersFormData[i].dob ? moment(passengersFormData[i].dob).format("YYYY-MM-DD") : "",
					passportNumber: !!passengersFormData[i].passportNumber ? passengersFormData[i].passportNumber : null,
					issuingCountry: !!passengersFormData[i].issuingCountry ? passengersFormData[i].issuingCountry : null,
					passportExpiryDate: !!passengersFormData[i].passportExpiry
						? moment(passengersFormData[i].passportExpiry).format("YYYY-MM-DD")
						: null,
					frequentFlyerAirline: !!passengersFormData[i].frequentFlyerAirline
						? passengersFormData[i].frequentFlyerAirline
						: null,
					frequentFlyerNumber: !!passengersFormData[i].frequentFlyerNumber
						? passengersFormData[i].frequentFlyerNumber
						: null,
					passengerType: passengersFormData[i].type,
				},
			});
		}
		return formattedData;
	};

	const updatePassengerPanelError = () => {
		const clonedPassengersFormData = [...passengersFormData];
		const clonedPassengersErrorData = [...passengersErrorData];
		clonedPassengersErrorData.forEach((passenger, index) => {
			const clonedPassenger = { ...passenger };
			delete clonedPassenger.id;
			if (!checkAllEmptyProperties(clonedPassenger)) {
				clonedPassengersFormData[index].hasError = true;
			} else {
				clonedPassengersFormData[index].hasError = false;
			}
		});
		updatePassengersFormData(clonedPassengersFormData);
	};

	const validatePassportFormData = (passenger) => {
		const { passportNumber, issuingCountry, passportExpiry, nationality } = passenger;
		const passportData = {
			passportNumber,
			issuingCountry,
			passportExpiry,
			nationality,
		};
		return checkAllEmptyProperties(passportData);
	};

	const validateFrequentFlyerFormData = (passenger) => {
		const { frequentFlyerAirline, frequentFlyerNumber } = passenger;
		const frequentFlyerData = {
			frequentFlyerAirline,
			frequentFlyerNumber,
		};
		return checkAllEmptyProperties(frequentFlyerData);
	};

	const validateForm = () => {
		let errorObj = [...passengersErrorData];

		passengersFormData.forEach((passenger, index) => {
			!passenger.title.trim() && (errorObj[index].title = ERROR_MESSAGE.TITLE_REQUIRED);
			!passenger.firstName.trim() && (errorObj[index].firstName = ERROR_MESSAGE.FIRST_NAME_REQUIRED);
			passenger.title.trim() &&
				passenger.firstName.trim() &&
				!validateFirstName(passenger.firstName) &&
				(errorObj[index].firstName = ERROR_MESSAGE.VALID_FIRST_NAME_REQUIRED);
			if (!passenger.title.trim() && !passenger.firstName.trim()) {
				errorObj[index].title = "";
				errorObj[index].firstName = ERROR_MESSAGE.TITLE_FIRST_NAME_REQUIRED;
			}
			!passenger.lastName.trim() && (errorObj[index].lastName = ERROR_MESSAGE.LAST_NAME_REQUIRED);
			passenger.lastName.trim() &&
				!validateLastName(passenger.lastName) &&
				(errorObj[index].lastName = ERROR_MESSAGE.VALID_LAST_NAME_REQUIRED);
			!passenger.dob && (errorObj[index].dob = ERROR_MESSAGE.DOB_REQUIRED);

			if (!validatePassportFormData(passenger)) {
				!passenger.passportNumber.trim() && (errorObj[index].passportNumber = ERROR_MESSAGE.PASSPORT_NUMBER_REQUIRED);
				!passenger.issuingCountry && (errorObj[index].issuingCountry = ERROR_MESSAGE.ISSUING_COUNTRY_REQUIRED);
				!passenger.passportExpiry && (errorObj[index].passportExpiry = ERROR_MESSAGE.PASSPORT_EXPIRY_REQUIRED);
				!passenger.nationality && (errorObj[index].nationality = ERROR_MESSAGE.NATIONALITY_REQUIRED);
			} else {
				errorObj[index].passportNumber = "";
				errorObj[index].issuingCountry = "";
				errorObj[index].passportExpiry = "";
				errorObj[index].nationality = "";
			}
			if (!validateFrequentFlyerFormData(passenger)) {
				!passenger.frequentFlyerAirline && (errorObj[index].frequentFlyerAirline = ERROR_MESSAGE.AIRLINE_REQUIRED);
				!passenger.frequentFlyerNumber.trim() &&
					(errorObj[index].frequentFlyerNumber = ERROR_MESSAGE.FREQUENT_FLYER_NUMBER_REQUIRED);
			} else {
				errorObj[index].frequentFlyerAirline = "";
				errorObj[index].frequentFlyerNumber = "";
			}
		});

		updatePassengersErrorData(errorObj);
		updatePassengerPanelError();
		let errroObjCount = errorObj.length;

		errorObj.forEach((obj) => {
			const clonedObj = { ...obj };
			delete clonedObj.id;
			if (checkAllEmptyProperties(clonedObj)) {
				errroObjCount--;
			}
		});
		if (errroObjCount === 0) {
			const formData = formatPassengersFormData(passengersFormData);
			handleSubmit(formData);
		}
	};

	const handleSubmit = (formData) => {
		const { currentPanelId, formId, nextPanelId, visiblePanelName, onSubmit } = props;
		onSubmit(currentPanelId, nextPanelId, true, visiblePanelName, true, formId, formData);
	};

	return (
		<div className="PassengerDetails">
			<Text
				className="PassengerDetails-subHeading font-primary-regular-18 "
				text="Please make sure that the name entered is exactly as per
        passenger's passport. The passport should be valid for 6 months
        from the date of travel."
			/>
			<div className="PassengerDetails-form">
				{passengersFormData.map((passenger, index) => (
					<FormPanel
						key={index}
						id={passenger.id}
						text={`${passenger.typeText} ${!!passenger.name ? ` - ${passenger.name}` : " "}`}
						hasError={passenger.hasError}
						expand={activePassengersList[passenger.id]}
						isActive={passenger.isActive}
						onClick={handlePassengerPanelClick}
					>
						<Grid container spacing={2} style={{ marginBottom: "16px" }}>
							<PassengerPrimaryInformation
								index={index}
								id={passenger.id}
								titleData={TITLES[passenger.type]}
								title={passenger.title}
								firstName={passenger.firstName}
								lastName={passenger.lastName}
								minDob={passenger.minDob}
								maxDob={passenger.maxDob}
								errorData={passengersErrorData[index]}
								onFocus={handleFocus}
								onChange={handleChange}
							/>
						</Grid>
						<PassengerPassportInformation
							index={index}
							id={passenger.id}
							countryNamesList={countryNamesList}
							airlines={airlines}
							passportNumber={passenger.passportNumber}
							frequentFlyerNumber={passenger.frequentFlyerNumber}
							issuingCountry={passenger.issuingCountry}
							nationality={passenger.nationality}
							frequentFlyerAirline={passenger.frequentFlyerAirline}
							errorData={passengersErrorData[index]}
							onFocus={handleFocus}
							onChange={handleChange}
						/>
					</FormPanel>
				))}
			</div>
			<div className="d-flex justify-content-end">
				<Button text="continue" onClick={validateForm} />
			</div>
		</div>
	);
};

export default PassengerDetails;
