import React, { useState } from "react";
import Button from "Widgets/Button/index";
import Text from "Widgets/Text/index";

import "./style.scss";

const passengerTypes = [
  {
    id: "adult",
    type: "Adult",
    ageLimitText: "(Above 12 Yrs)",
    count: 1,
  },
  {
    id: "children",
    type: "Children",
    ageLimitText: "(2 - 12 Yrs)",
    count: 0,
  },
  {
    id: "infant",
    type: "Infants",
    ageLimitText: "(Below 2 Yrs)",
    count: 0,
  },
];

const PassengersSelectCount = () => {
  const [passengers, setPassengers] = useState(passengerTypes);

  const handleCounter = (id, type = "plus") => {
    const elementsIndex = passengers.findIndex(element => element.id == id);
    let newArray = [...passengers];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      count:
        type === "plus"
        ? newArray[elementsIndex].count + 1
        : newArray[elementsIndex].count - 1,
    };
    setPassengers(newArray);
  }

  return (
    <div className="PassengersSelectCount">
      {passengers.map((passenger, index) => 
        <div key={passenger.id} className="PassengersSelectCount-row d-flex align-items-center justify-content-between">
          <div className="PassengersSelectCount-left">
            <Text className="PassengersSelectCount-left__type font-primary-medium-14" text={passenger.type} />
            <Text className="PassengersSelectCount-left__ageLimit font-primary-medium-12" text={passenger.ageLimitText} />
          </div>
          <div className="PassengersSelectCount-right d-flex align-items-center">
            <Text className="PassengersSelectCount-right__count font-primary-medium-16" text={passenger.count} />
            <div className="PassengersSelectCount-right__action d-flex">
              <Button
                className="font-primary-medium-16"
                disabled={
                  passenger.id === "adult"
                    ? passenger.count === 1
                    : passenger.count === 0
                  }
                text="-"
                secondary
                onClick={() => handleCounter(passenger.id, "minus")}
              />
              <Button
                className="font-primary-medium-16"
                text="+"
                secondary
                onClick={() => handleCounter(passenger.id)}
              />
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

export default PassengersSelectCount;
