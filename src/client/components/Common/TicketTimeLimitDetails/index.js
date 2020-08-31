import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import moment from "moment";

import { ERROR_MESSAGE } from "./constant";
import { TIME_LIMITS_LIST } from "Constants/commonConstant";
import {
	convertMinutesToTime,
	extractHourFromTime,
	formatDateFromDateTime,
	roundDownHourTime,
	subtractTimeFromDateTime,
} from "Helpers/global";
import { getItemFromStorage } from "Helpers/utils";
import { utils } from "Helpers";
import securityOptionConstant from "Constants/securityOptionConstant";

import { Button, DatePickerMui, ErrorMessage, Image, SelectField, Text, TextInputMui } from "Widgets";

import "./style.scss";

const TicketTimeLimitDetails = (props) => {
	const dispatch = useDispatch();
	const { className, flightItineraryValidate, primaryBtnDisabled, secondaryBtnDisabled, onCreatePNR } = props;
	const { date, maxTicketTimeLimit, time } = flightItineraryValidate;
	const formattedDate = formatDateFromDateTime(date, time);
	const timeToSubtract = convertMinutesToTime(maxTicketTimeLimit);
	const [subtractedDate, subtractedTime] = subtractTimeFromDateTime(formattedDate, timeToSubtract);
	const timeLimitHour = extractHourFromTime(roundDownHourTime(subtractedDate, subtractedTime));
	const userData = JSON.parse(getItemFromStorage("userData"));
	const {
		userDto: { officeDto },
	} = userData;
	const [formData, setState] = useState({
		agencyName: !!officeDto.officeName ? officeDto.officeName : "",
		date: "",
		time: "",
	});
	const [errorData, setErrorData] = useState({
		date: "",
		time: "",
	});

	const handleChange = (key, value) => {
		setState({
			...formData,
			[key]: value,
		});
		setErrorData({
			...errorData,
			[key]: "",
		});
	};

	const validateForm = (btnId) => {
		const { date, time } = formData;
		let errorObj = errorData;

		if (btnId === "continue") {
			handleSubmit("", btnId);
		} else {
			const securityMessage = utils.checkSecurityGroup(securityOptionConstant.flights.createOrder.securityNumber);
			if (securityMessage !== '') {
				dispatch(utils.showErrorBox(securityMessage));
				return;
			}
			!date.trim() && (errorObj.date = ERROR_MESSAGE.DATE_REQUIRED);
			!time.trim() && (errorObj.time = ERROR_MESSAGE.TIME_REQUIRED);

			setErrorData({
				...errorData,
				...errorObj,
			});
			if (!!date && !errorObj.date && !!time && !errorObj.time) {
				const postData = moment(date).format(`YYYY-MM-DDT${time}`);
				handleSubmit(postData, btnId);
			}
		}
	};

	const handleSubmit = (formData, btnId) => {
		const { currentPanelId, formId, nextPanelId, visiblePanelName, onSubmit } = props;
		if (btnId === "continue") {
			onSubmit(currentPanelId, nextPanelId, true, visiblePanelName, true, formId, formData);
		} else {
			onCreatePNR(formId, formData);
		}
	};

	return (
		<div className={`TicketTimeLimitDetails ${!!className ? className : ""}`}>
			<Text
				showLeftBorder
				className="TicketTimeLimitDetails-title font-primary-medium-18"
				text="Ticket Time Limit Details"
			/>
			<div className="TicketTimeLimitDetails-form d-flex">
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextInputMui
							id="agencyName"
							type="text"
							label="Agency Name"
							placeholder="Agency Name"
							value={formData.agencyName}
							disabled
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<DatePickerMui
							id="date"
							label="Date"
							disablePastDates
							maxDate={subtractedDate}
							hasError={!!errorData.date}
							onChange={handleChange}
						/>
						{!!errorData.date && <ErrorMessage errorMessage={errorData.date} />}
					</Grid>
					<Grid item xs={12} md={3}>
						<SelectField
							id="time"
							label="Time"
							placeholder="12:00"
							icon={
								<Image
									altText="time"
									imgName="clock-grey.svg"
									style={{ height: "20px", width: "20px", marginTop: "5px" }}
								/>
							}
							data={TIME_LIMITS_LIST}
							limitDataCount={
								!!date && !!formData.date && date === moment(formData.date).format("YYYY-MM-DD")
									? timeLimitHour
									: TIME_LIMITS_LIST.length
							}
							onChange={handleChange}
						/>
						{!!errorData.time && <ErrorMessage errorMessage={errorData.time} />}
					</Grid>
				</Grid>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					className="mr-10"
					text="create pnr"
					secondary
					disabled={secondaryBtnDisabled}
					onClick={() => validateForm("createPNR")}
				/>
				<Button text="continue" disabled={primaryBtnDisabled} onClick={() => validateForm("continue")} />
			</div>
		</div>
	);
};

export default TicketTimeLimitDetails;
