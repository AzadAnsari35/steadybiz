import React from "react";
import onClickOutside from "react-onclickoutside";

import Button from "Widgets/Button/index";
import Text from "Widgets/Text/index";

import "./style.scss";

const passengerTypes = [
  {
    type: "Adult",
    ageLimitText: "(Above 12 Yrs)"
  },
  {
    type: "Children",
    ageLimitText: "(2 - 12 Yrs)"
  },
  {
    type: "Infants",
    ageLimitText: "(Below 2 Yrs)"
  },
];

const PassengersSelectCount = props => {
  const { onOutsideClick } = props;
  PassengersSelectCount.handleClickOutside = () => onOutsideClick(false);

  return (
    <div className="PassengersSelectCount">
      {passengerTypes.map((passenger, index) => 
        <div key={index} className="PassengersSelectCount-row d-flex align-items-center justify-content-between">
          <div className="PassengersSelectCount-left">
            <Text className="PassengersSelectCount-left__type font-primary-medium-14" text={passenger.type} />
            <Text className="PassengersSelectCount-left__ageLimit font-primary-medium-12" text={passenger.ageLimitText} />
          </div>
          <div className="PassengersSelectCount-right d-flex align-items-center">
            <Text className="PassengersSelectCount-right__count font-primary-medium-16" text={0} />
            <div className="PassengersSelectCount-right__action d-flex">
              <Button className="font-primary-medium-16" text="-" secondary />
              <Button className="font-primary-medium-16" text="+" secondary />
            </div>
          </div>
        </div>
      )}
      <div className="PassengersSelectCount-action d-flex justify-content-end">
        <div className="d-flex">
          <Button className="text-uppercase mr-24" isLinkType secondary text="Reset" />
          <Button className="text-uppercase" isLinkType text="Apply" />
        </div>
      </div>
    </div>
  )
};

const clickOutsideConfig = {
  handleClickOutside: () => PassengersSelectCount.handleClickOutside
};

export default onClickOutside(PassengersSelectCount, clickOutsideConfig);
