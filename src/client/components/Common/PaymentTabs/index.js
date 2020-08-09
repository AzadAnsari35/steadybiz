import React from "react";

import { Text } from "Widgets";

import "./style.scss";

const PaymentTabs = (props) => {
	const { tabs, activeTab, onTabClick } = props;

	return (
		<div className="PaymentTabs">
			{tabs.map((tab, index) => {
				return (
					<div
						key={index}
						className={`PaymentTabs-tab d-flex align-items-center cursor-${tab.disabled ? "disabled" : "pointer"} ${
							tab.id === activeTab ? "active arrow-left" : ""
						}`}
						onClick={() => (!tab.disabled ? onTabClick(tab.id) : () => {})}
					>
						<div className="PaymentTabs-tab__icon d-flex justify-content-center">
							<img alt={tab.text} src={tab.id === activeTab ? tab.whiteIcon : tab.blackIcon} />
						</div>
						<Text className="PaymentTabs-tab__text" text={tab.text} />
					</div>
				);
			})}
		</div>
	);
};

export default PaymentTabs;
