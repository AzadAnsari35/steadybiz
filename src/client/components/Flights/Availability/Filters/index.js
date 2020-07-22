import React, { useState } from "react";
import FlightIcon from "@material-ui/icons/Flight";
import { useForm } from 'react-hook-form';

import useToggle from "Client/hooks/useToggle";

import { CustomCheckbox, Link, PrimaryAccordion, RangeSlider, SwitchTab, Text} from "Widgets";

import "./style.scss";

const LIMIT_AIRLINES_SHOW_COUNT = 6;
const AIRLINES_COUNT = 18; // Temperary count to test show more logic

const swtichTab1 = [
  {
    id: "departure",
    text: "departure",
  },
  {
    id: "arrival",
    text: "arrival",
  },
];

const swtichTab2 = [
  {
    id: "outbound",
    text: "outbound",
  },
  {
    id: "return",
    text: "return",
  },
];

const AirlineCheckbox = props => {
  const { register, control } = useForm();
  return (
    <CustomCheckbox name="airline" register={register} control={control}>
      <div className="d-flex justify-content-between align-items-center width-100">
        <div className="d-flex align-items-center">
          {/* <img src="" style={{ marginRight: "16px" }} /> */}
          <FlightIcon
            style={{ transform: "rotate(90deg)", marginRight: "16px" }}
          />
          <Text className="font-primary-regular-14" text="AirAsia (10)" />
        </div>
        <Text className="font-primary-regular-14" text="26,200" />
      </div>
    </CustomCheckbox>
  )
};

const Filters = () => {
  const [showAllAirlines, toggleShowAllAirlines] = useToggle(false);
  const { register, control } = useForm();

  return (
    <div className="Filters">
      <Text className="Filters-title font-primary-bold-20 text-uppercase" text="filter results" />
      <div className="Filters-section d-flex justify-content-between pt-0">
        <Text className="font-primary-medium-14" text="169 flights found." />
        <Link text="Reset All" />
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Price" defaultOpen>
          <RangeSlider />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Nearby Airports" defaultOpen>
          <SwitchTab tabs={swtichTab1} defaultActiveTab={swtichTab1[0].id} />
          <CustomCheckbox
            control={control}
            name="nearByAirports"
            register={register}
            primaryLabel="Dubai, Al Maktoum .."
            secondaryLabel="26,200"
          />
          <CustomCheckbox
            control={control}
            name="nearByAirports"
            register={register}
            primaryLabel="Abu Dhabi, Abu Dha.."
            secondaryLabel="56,200"
          />
          <CustomCheckbox
            control={control}
            name="nearByAirports"
            register={register}
            primaryLabel="Sharjah, Sharjah (S.."
            secondaryLabel="1,26,200"
          />
          <CustomCheckbox
            control={control}
            name="nearByAirports"
            register={register}
            primaryLabel="Dubai, Dubai Bus .."
            secondaryLabel="32,200"
          />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Stops" defaultOpen>
          <CustomCheckbox
            control={control}
            name="fareTypes"
            register={register}
            primaryLabel="Direct"
            secondaryLabel="26,200"
          />
          <CustomCheckbox
            control={control}
            name="fareTypes"
            register={register}
            primaryLabel="1 Stop"
            secondaryLabel="56,200"
          />
          <CustomCheckbox
            control={control}
            name="fareTypes"
            register={register}
            primaryLabel="2 Stops"
            secondaryLabel="1,26,200"
          />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Fare Types" defaultOpen>
          <CustomCheckbox
            control={control}
            name="fareTypes"
            register={register}
            primaryLabel="Refundable"
            secondaryLabel="17,000"
          />
          <CustomCheckbox
            control={control}
            name="fareTypes"
            register={register}
            primaryLabel="Non - Refundable"
            secondaryLabel="26,200"
          />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Airlines" defaultOpen>
          <CustomCheckbox
            control={control}
            name="airline"
            register={register}
            primaryLabel="Hide Multi-Airline Itineraries"
          />
          {Array(AIRLINES_COUNT).fill(null).map((item, index) => {
            if (!showAllAirlines && index < LIMIT_AIRLINES_SHOW_COUNT) {
              return <AirlineCheckbox key={index} />
            } else if (showAllAirlines) {
              return <AirlineCheckbox key={index} />
            }
          })}
          {AIRLINES_COUNT > LIMIT_AIRLINES_SHOW_COUNT && !showAllAirlines
            ? <Text
              className="font-primary-medium-14 link-text"
              text={`+ ${AIRLINES_COUNT - LIMIT_AIRLINES_SHOW_COUNT} Airline${AIRLINES_COUNT - LIMIT_AIRLINES_SHOW_COUNT > 1 ? "s" : ""}`}
              onClick={toggleShowAllAirlines}
            />
            : <Text
              className="font-primary-medium-14 link-text"
              text={`- Show Less`}
              onClick={toggleShowAllAirlines}
            />
          }
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Flight Time" defaultOpen>
          <SwitchTab tabs={swtichTab2} defaultActiveTab={swtichTab2[0].id} />
          <CustomCheckbox
            control={control}
            name="departureTime"
            register={register}
            primaryLabel="Morning ( 06:00 - 11:59 )"
            secondaryLabel="26,200"
          />
          <CustomCheckbox
            control={control}
            name="departureTime"
            register={register}
            primaryLabel="Morning ( 06:00 - 11:59 )"
            secondaryLabel="56,200"
          />
          <CustomCheckbox
            control={control}
            name="departureTime"
            register={register}
            primaryLabel="Evening ( 18:00 - 23:59 )"
            secondaryLabel="1,26,200"
          />
          <CustomCheckbox
            control={control}
            name="departureTime"
            register={register}
            primaryLabel="Night ( 00:00 - 05:59 )"
            secondaryLabel="26,200"
          />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Layover Duration" defaultOpen>
          <SwitchTab tabs={swtichTab2} defaultActiveTab={swtichTab2[0].id} />
          <RangeSlider suffix="hrs" />
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Trip Duration" defaultOpen>
          <SwitchTab tabs={swtichTab2} defaultActiveTab={swtichTab2[0].id} />
          <RangeSlider suffix="hrs" />
        </PrimaryAccordion>
      </div>
    </div>
  )
};

export default Filters;
