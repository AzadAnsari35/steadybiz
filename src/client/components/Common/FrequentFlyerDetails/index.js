import React from "react";
import { Grid } from "@material-ui/core";

import { ErrorMessage, SelectField, Text, TextInputMui } from "Widgets";

import "./style.scss";

const FrequentFlyerDetails = (props) => {
	const { airlines, className, errorData, frequentFlyerNumber, index, onFocus, onChange } = props;

	return (
		<div className={`FrequentFlyerDetails ${!!className ? className : ""}`}>
			<Text showLeftBorder className="FrequentFlyerDetails-title font-primary-medium-18" text="Frequent Flyer Details" />
			<Grid container spacing={2}>
				<Grid item xs={12} md={3}>
					<SelectField
						id={`frequentFlyerAirline-${index}`}
						label="Select Airline"
						placeholder="Select Airline"
						data={airlines}
						hasError={!!errorData.frequentFlyerAirline}
						onChange={onChange}
					/>
					{!!errorData.frequentFlyerAirline && <ErrorMessage errorMessage={errorData.frequentFlyerAirline} />}
				</Grid>
				<Grid item xs={12} md={3}>
					<TextInputMui
						id={`frequentFlyerNumber-${index}`}
						type="text"
						label="Frequent Flyer Number"
						placeholder="Frequent Flyer Number"
						value={frequentFlyerNumber}
						hasError={!!errorData.frequentFlyerNumber}
						onFocus={onFocus}
						onChange={onChange}
					/>
					{!!errorData.frequentFlyerNumber && <ErrorMessage errorMessage={errorData.frequentFlyerNumber} />}
				</Grid>
			</Grid>
		</div>
	);
};

export default FrequentFlyerDetails;
