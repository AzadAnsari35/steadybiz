import React from "react";

import ArrowIcon from "Widgets/Icons/ArrowIcon";

import "./style.scss";

const ExpandArrow = (props) => {
	const { showBackground = true, isBordered, expand, isHorizontal = false, onClick } = props;

	return (
		<div
			className={`ExpandArrow ${
				!!showBackground ? "is-background" : ""
			} d-flex justify-content-center align-items-center cursor-pointer ${!!isBordered ? "border-dark-gray-thin" : ""}`}
			onClick={onClick}
		>
			<ArrowIcon
				size={12}
				color={"rgb(57, 117, 246)"}
				orientation={
					expand ? isHorizontal ? -180 : -90 : isHorizontal ? 0 : 90
				}
			/>
		</div>
	);
};

export default ExpandArrow;
