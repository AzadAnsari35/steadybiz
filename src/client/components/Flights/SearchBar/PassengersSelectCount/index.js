import React, { useState } from "react";

import { Button, Text } from "Widgets";

import "./style.scss";

const PassengersSelectCount = props => {
  const { passengerTypes, calculateTotalPassengers, onResetClick, onApplyClick } = props;
  const [passengers, setPassengers] = useState(passengerTypes);
  const [totalCount, setTotalCount] = useState(1);

  const handleCounter = (id, type = "add") => {
    const elementsIndex = passengers.findIndex(element => element.id == id);
    let newArray = [...passengers];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      count:
        type === "add"
        ? newArray[elementsIndex].count + 1
        : newArray[elementsIndex].count - 1,
    };
    setPassengers(newArray);
    calculateTotalPassengers(newArray);
    type === "add" ? setTotalCount(totalCount + 1) : setTotalCount(totalCount - 1);
  };

  return (
    <div className="PassengersSelectCount">
      {passengers.map(passenger => 
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
                  passenger.id === "ADT"
                    ? passenger.count === 1
                    : passenger.count === 0
                  }
                text="-"
                secondary
                onClick={() => handleCounter(passenger.id, "subtract")}
              />
              <Button
                className="font-primary-medium-16"
                disabled={
                  totalCount === 9 || 
                  (passenger.id === "INF" &&
                    passenger.count >= passengers[0].count
                  )
                }
                text="+"
                secondary
                onClick={() => handleCounter(passenger.id)}
              />
            </div>
          </div>
        </div>
      )}
      {passengers[0].count < passengers[2].count &&
        <Text className="font-primary-medium-14 mb-12" text="Infant should be less than or equal to Adult" />
      }
      <div className="PassengersSelectCount-action d-flex justify-content-end">
        <div className="d-flex">
          <Button className="text-uppercase mr-24" isLinkType secondary text="Reset" onClick={onResetClick} />
          <Button disabled={passengers[0].count < passengers[2].count} className="text-uppercase" isLinkType text="Apply" onClick={onApplyClick} />
        </div>
      </div>
    </div>
  )
};

export default PassengersSelectCount;
