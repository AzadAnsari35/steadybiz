import React, { useState } from "react";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import moment from "moment";

import colors from "Constants/colors";

import { ArrivalDateIcon, ArrowIcon, Button, DepartureDateIcon, Text } from "Widgets";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./style.scss";

const DatesRangePicker = props => {
  const { dates, enableSingleDatePicker, onDateChange } = props;
  const [focusedInput, setFocusedInput] = useState(null);

  // const handleDateChange = (startDate, endDate) => {
  //   setStartData(startDate);
  //   setEndData(endDate);
  // };

  const clearDateSelection = () => {
    setFocusedInput(null);
    onDateChange(moment(), moment().add(1, "days"));
  };

  const setDateSelection = () => {
    setFocusedInput(null);
  };

  const handleDateReset = () => {
    setStartData(null);
    setEndData(null);
    setFocusedInput(null);
  }

  const renderCalendarBottomInfo = () => {
    return (
      <div className="RenderCalendarBottomInfo d-flex justify-content-end align-items-center">
        {/* WILL BE IMPLEMENTED IN UPCOMING RELEASE */}
        {/* <div className="RenderCalendarBottomInfo-left font-primary-regular-12">Lowest fare</div> */}
        <div className="RenderCalendarBottomInfo-right d-flex">
          <Button isLinkType secondary text="Reset" onClick={clearDateSelection} />
          <Button isLinkType text="Apply" onClick={setDateSelection} />
        </div>
      </div>
    )
  };

  return (
    <div className="DatesRangePicker">
      {!enableSingleDatePicker ?
        <>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDatePlaceholderText="Departure Date"
            endDatePlaceholderText="Return Date"
            startDate={dates.startDate}
            endDate={dates.endDate}
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
              onDateChange(startDate, endDate);
            }}
            renderCalendarInfo={renderCalendarBottomInfo}
            onClose={setDateSelection}
          />
        </> :
        <>
          <SingleDatePicker
            id="startDate"
            placeholder="Departure Date"
            date={dates.startDate}
            anchorDirection="right"
            customInputIcon={<DepartureDateIcon />}
            daySize={60}
            displayFormat="DD MMM YYYY"
            focused={focusedInput}
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
            onDateChange={(startDate) => {
              onDateChange(startDate, null);
            }}
            renderCalendarInfo={renderCalendarBottomInfo}
            onClose={setDateSelection}
          />
          <Text className="font-primary-medium-18 disabled-return-date" text="Return Date" />
        </>
      }
      <div className="DatesRangePicker-arrivalIcon">
        <ArrivalDateIcon />
      </div>
    </div>
  )
};

export default DatesRangePicker;
