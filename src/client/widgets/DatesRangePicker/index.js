import React, { useState } from "react";
import { DateRangePicker, SingleDatePicker } from "react-dates";

import Button from "Widgets/Button/index";
import ArrivalDateIcon from "Widgets/Icons/ArrivalDateIcon";
import DepartureDateIcon from "Widgets/Icons/DepartureDateIcon";
import ArrowIcon from "Widgets/Icons/ArrowIcon";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./style.scss";
import colors from "Constants/colors";

const DatesRangePicker = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartData] = useState(null);
  const [endDate, setEndData] = useState(null);

  const handleDateChange = (startDate, endDate) => {
    setStartData(startDate);
    setEndData(endDate);
  };

  const handleDateSubmit = () => {
    setFocusedInput(null);
  }

  const handleDateReset = () => {
    setStartData(null);
    setEndData(null);
    setFocusedInput(null);
  }

  const renderCalendarBottomInfo = () => {
    return (
      <div className="RenderCalendarBottomInfo d-flex justify-content-between align-items-center">
        <div className="RenderCalendarBottomInfo-left font-primary-regular-12">Lowest fare</div>
        <div className="RenderCalendarBottomInfo-right d-flex">
          <Button isLinkType secondary text="Reset" onClick={handleDateReset} />
          <Button isLinkType text="Apply" onClick={handleDateSubmit} />
        </div>
      </div>
    )
  };

  return (
    <div className="DatesRangePicker">
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        startDatePlaceholderText="Departure Date"
        endDatePlaceholderText="Return Date"
        startDate={startDate}
        endDate={endDate}
        anchorDirection="right"
        customInputIcon={<DepartureDateIcon />}
        daySize={60}
        displayFormat="DD MMM YYYY"
        focusedInput={focusedInput}
        hideKeyboardShortcutsPanel
        keepOpenOnDateSelect
        navPrev={
          <ArrowIcon
            size={18}
            color={colors.royalBlue}
            orientation={180}
          />
        }
        navNext={
          <ArrowIcon
            size={18}
            color={colors.royalBlue}
          />
        }
        noBorder
        readOnly
        weekDayFormat="ddd"
        onFocusChange={(focusedInput) => {
          setFocusedInput(focusedInput);
        }}
        onDatesChange={({ startDate, endDate }) => {
          handleDateChange(startDate, endDate);
        }}
        renderCalendarInfo={renderCalendarBottomInfo}
      />
      <div className="DatesRangePicker-arrivalIcon">
        <ArrivalDateIcon />
      </div>
    </div>
  )
};

export default DatesRangePicker;
