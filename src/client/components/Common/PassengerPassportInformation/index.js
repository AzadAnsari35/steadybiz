import React, { useState, Fragment } from "react";

import { ExpandArrow, Text } from "Widgets";
import FrequentFlyerDetails from "./../FrequentFlyerDetails/index";
import PassportDetails from "./../PassportDetails/index";

import "./style.scss";

const PassengerPassportInformation = (props) => {
	const {
		id,
		index,
		airlines,
		countryNamesList,
		passportNumber,
		frequentFlyerNumber,
		issuingCountry,
		nationality,
		frequentFlyerAirline,
		errorData,
		onFocus,
		onChange,
	} = props;
	const [showPassportDetails, setShowPassportDetails] = useState(false);

	const togglePassportDetails = () => {
		setShowPassportDetails(!showPassportDetails);
	};

	const handleFocus = (key) => {
		onFocus(id, key);
	};

	const handleChange = (key, value) => {
		onChange(id, key, value);
	};

	return (
		<div className="PassengerPassportInformation">
			<div className="PassengerPassportInformation-title d-flex cursor-pointer" onClick={togglePassportDetails}>
				<Text className="font-primary-medium-16" text="Add Passport and Frequent Flyer Details" />
				<ExpandArrow showBackground={false} expand={showPassportDetails} />
			</div>
			{!!showPassportDetails && (
				<Fragment>
					<PassportDetails
						index={index}
						countryNamesList={countryNamesList}
						disablePastDates
						errorData={errorData}
						passportNumber={passportNumber}
						issuingCountry={issuingCountry}
						nationality={nationality}
						onFocus={handleFocus}
						onChange={handleChange}
					/>
					<FrequentFlyerDetails
						index={index}
						airlines={airlines}
						errorData={errorData}
						frequentFlyerNumber={frequentFlyerNumber}
						frequentFlyerAirline={frequentFlyerAirline}
						onFocus={handleFocus}
						onChange={handleChange}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default PassengerPassportInformation;
