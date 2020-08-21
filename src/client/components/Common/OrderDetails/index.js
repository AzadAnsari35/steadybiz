import React from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

import { Text } from "Widgets";

import "./style.scss";

const OrderDetails = (props) => {
	const { isTicketing = false, pnrStatus = "", orderNumber = "", sourceName = "", sourcePnr = "", ticketTimeLimit = "" } = props;

	return (
		<div className="OrderDetails">
			<Grid item xs={12} md={6}>
				<Text className="OrderDetails-orderNo font-primary-medium-32" text={`Order # : ${orderNumber}`} />
			</Grid>
			<Grid item xs={12} md={6}>
				<div className="d-flex OrderDetails-summary">
					<div className="OrderDetails-summary__itemContainer font-primary-medium-16">
						<div className="OrderDetails-summary__item d-flex">
							<Text className="mr-4" text={`${!!isTicketing ? "Booking" : "PNR"} Date`} />
							<Text className="ml-4" text=" : " />
						</div>
						{!!sourcePnr &&
							<div className="OrderDetails-summary__item d-flex">
								<Text className="mr-4" text={`${sourceName} PNR`} />
								<Text className="ml-4" text=" : " />
							</div>
						}
						<div className="OrderDetails-summary__item d-flex">
							<Text className="mr-4" text="Status" />
							<Text className="ml-4" text=" : " />
						</div>
						{!!ticketTimeLimit &&
							<div className="OrderDetails-summary__item d-flex">
								<Text className="mr-4" text="Time Limit" />
								<Text className="ml-4" text=" : " />
							</div>
						}
					</div>
					<div className="font-primary-semibold-16-1 text-align-right">
						<Text text={moment().format("DD MMM YYYY")} />
						{!!sourcePnr && <Text text={sourcePnr} />}
						<Text text={!!pnrStatus ? pnrStatus : "-"} />
						{/* <Text text={!!isTicketing ? "Confirmed" : "Hold"} /> */}
						{!!ticketTimeLimit && (
							<Text className="text-align-right" text={`${moment(ticketTimeLimit).format("DD MMMM YYYY, hh:mm")} Hrs`} />
						)}
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default OrderDetails;
