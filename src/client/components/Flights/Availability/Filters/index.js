import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import FlightIcon from "@material-ui/icons/Flight";
import { useForm } from 'react-hook-form';

import useToggle from "Client/hooks/useToggle";
import { applyCommaToPrice } from "Helpers/global";
import { getFiltersData } from "Helpers/flight.helpers";

import { CustomCheckbox, Image, Link, PrimaryAccordion, RangeSlider, SwitchTab, Text} from "Widgets";

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
  const { airlineCode, airlineName, price } = props;
  return (
    <CustomCheckbox name="airline" register={register} control={control}>
      <div className="d-flex justify-content-between align-items-center width-100">
        <div className="d-flex align-items-center">
          <Image
            altText={airlineCode}
            imgName={`${airlineCode}.png`}
            imgPath="images/airlines/smallicons"
            fallbackImgName="airlineSmDefault.png"
            style={{ height: "26px", width: "26px", marginRight: "16px" }}
          />
          <Text className="font-primary-regular-14" text={airlineName} />
        </div>
        <Text className="font-primary-regular-14" text={applyCommaToPrice(price)} />
      </div>
    </CustomCheckbox>
  )
};

const Filters = props => {
  const { flightSegmentType, outboundItinerary, departureAirportsNearBY, arrivalAirportsNearBY } = props;
  const [showAllAirlines, toggleShowAllAirlines] = useToggle(false);
  const [activeTab, setActiveTab] = useState({
    nearbyAirports: swtichTab1[0].id,
    stops: swtichTab2[0].id,
    flightTime: swtichTab2[0].id,
    layoverDuration: swtichTab2[0].id,
    tripDuration: swtichTab2[0].id,
  });
  const { register, control } = useForm();

  const masterAirlinesResponse = useSelector(state => state.masterAirlines);

  const masterAirlines = !!masterAirlinesResponse.items && !!masterAirlinesResponse.items.data &&
    masterAirlinesResponse.items.data.data;

  const {
    priceRange,
    refundableMinPrice,
    nonRefundableMinPrice,
    stopsData,
    airlines,
    flightSlots,
    layoverDurations,
    tripDurations,
  } = !!outboundItinerary && getFiltersData(outboundItinerary);

  const updateActiveTab = (id, activeTabId) => {
    setActiveTab({
      ...activeTab,
      [id]: activeTabId,
    });
  };

  return (
    <div className="Filters">
      <Text className="Filters-title font-primary-bold-20 text-uppercase" text="filter results" />
      <div className="Filters-section d-flex justify-content-between pt-0">
        {!!outboundItinerary &&
          <Text
            className="font-primary-medium-14"
            text={
              `${outboundItinerary.length} flights found.`
            }
          />
        }
        <Link className="ml-auto" text="Reset All" />
      </div>
      {!!priceRange &&
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Price" defaultOpen>
            <RangeSlider isPrice range={priceRange} />
          </PrimaryAccordion>
        </div>
      }
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Nearby Airports" defaultOpen>
          <SwitchTab
            id="nearbyAirports"
            defaultActiveTab={activeTab.nearbyAirports}
            tabs={swtichTab1}
            callback={updateActiveTab}
          />
          {activeTab.nearbyAirports === "departure"
            ? !!departureAirportsNearBY &&
            departureAirportsNearBY.map((airport, index) =>
              <CustomCheckbox
                key={index}
                control={control}
                name="nearByAirports"
                register={register}
                // value={airport.airportCode}
                primaryLabel={airport.airportName}
                // secondaryLabel="26,200"
              />
            )
            : !!arrivalAirportsNearBY &&
              arrivalAirportsNearBY.map((airport, index) =>
              <CustomCheckbox
                key={index}
                control={control}
                name="nearByAirports"
                register={register}
                // value={airport.airportCode}
                primaryLabel={airport.airportName}
                // secondaryLabel="26,200"
              />
            )
          }
        </PrimaryAccordion>
      </div>
      {!!stopsData &&
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Stops" defaultOpen>
          {flightSegmentType === "RT" &&
            <SwitchTab
              id="stops"
              defaultActiveTab={activeTab.stops}
              tabs={swtichTab2}
              callback={updateActiveTab}
            />
          }
            {isFinite(stopsData[activeTab.stops].directFlightsMinPrice) &&
              <CustomCheckbox
                control={control}
                name="stops"
                register={register}
                primaryLabel="Direct"
                secondaryLabel={applyCommaToPrice(stopsData[activeTab.stops].directFlightsMinPrice)}
              />
            }
            {isFinite(stopsData[activeTab.stops].oneStopFlighstMinPrice) &&
              <CustomCheckbox
                control={control}
                name="stops"
                register={register}
                primaryLabel="1 Stop"
                secondaryLabel={applyCommaToPrice(stopsData[activeTab.stops].oneStopFlighstMinPrice)}
              />
            }
            {isFinite(stopsData[activeTab.stops].twoStopFlighstMinPrice) &&
              <CustomCheckbox
                control={control}
                name="stops"
                register={register}
                primaryLabel="2 Stops"
                secondaryLabel={applyCommaToPrice(stopsData[activeTab.stops].twoStopFlighstMinPrice)}
              />
            }
          </PrimaryAccordion>
        </div>
      }
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Fare Types" defaultOpen>
          {isFinite(refundableMinPrice) &&
            <CustomCheckbox
              control={control}
              name="fareTypes"
              register={register}
              primaryLabel="Refundable"
              secondaryLabel={applyCommaToPrice(refundableMinPrice)}
            />
          }
          {isFinite(nonRefundableMinPrice) &&
            <CustomCheckbox
              control={control}
              name="fareTypes"
              register={register}
              primaryLabel="Non - Refundable"
              secondaryLabel={applyCommaToPrice(nonRefundableMinPrice)}
            />
          }
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
          {!!airlines && Object.keys(airlines).map((airline, index) => {
            if (!showAllAirlines && index < LIMIT_AIRLINES_SHOW_COUNT) {
              return (
                <AirlineCheckbox
                  key={index}
                  airlineCode={airline}
                  airlineName={masterAirlines.find(masterAirline => masterAirline.airlineCode === airline).airlineName}
                  price={airlines[airline]}
                />
              )
            } else if (showAllAirlines) {
              return (
                <AirlineCheckbox
                  key={index}
                  airlineCode={airline}
                  airlineName={masterAirlines.find(masterAirline => masterAirline.airlineCode === airline).airlineName}
                  price={airlines[airline]}
                />
              )
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
          {flightSegmentType === "RT" &&
            <SwitchTab
              id="flightTime"
              defaultActiveTab={activeTab.flightTime}
              tabs={swtichTab2}
              callback={updateActiveTab}
            />
          }
          {!!flightSlots && Array(
            {
              id: "departure",
              value: "New Delhi",
            },
            {
              id: "arrival",
              value: "new york",
            },
          ).map((item, index) =>
            <div key={index} className="mb-20">
              <div className="font-primary-medium-14 d-flex mb-22">
                <Text className="text-uppercase mr-4" text={`${item.id} : `} />
                <Text className="font-primary-bold text-uppercase" text={item.value} />
              </div> 
              {isFinite(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].first) &&
                <CustomCheckbox
                  control={control}
                  name="departureTime"
                  register={register}
                  primaryLabel="Morning ( 06:00 - 11:59 )"
                  secondaryLabel={
                    applyCommaToPrice(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].first)
                  }
                />
              }
              {isFinite(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].second) &&
                <CustomCheckbox
                  control={control}
                  name="departureTime"
                  register={register}
                  primaryLabel="Afternoon ( 12:00 - 17:59 )"
                  secondaryLabel={
                    applyCommaToPrice(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].second)
                  }
                />
              }
              {isFinite(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].third) &&
                <CustomCheckbox
                  control={control}
                  name="departureTime"
                  register={register}
                  primaryLabel="Evening ( 18:00 - 23:59 )"
                  secondaryLabel={
                    applyCommaToPrice(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].third)
                  }
                />
              }
              {isFinite(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].fourth) &&
                <CustomCheckbox
                  control={control}
                  name="departureTime"
                  register={register}
                  primaryLabel="Night ( 00:00 - 05:59 )"
                  secondaryLabel={
                    applyCommaToPrice(flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"].fourth)
                  }
                />
              }
            </div>
          )}
        </PrimaryAccordion>
      </div>
      {!!layoverDurations &&
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Layover Duration" defaultOpen>
            {flightSegmentType === "RT" &&
              <SwitchTab
                id="layoverDuration"
                defaultActiveTab={activeTab.layoverDuration}
                tabs={swtichTab2}
                callback={updateActiveTab}
              />
            }
            <RangeSlider isTime range={layoverDurations[activeTab.layoverDuration]} />
          </PrimaryAccordion>
        </div>
      }
      {!!tripDurations &&
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Trip Duration" defaultOpen>
            {flightSegmentType === "RT" &&
              <SwitchTab
                id="tripDuration"
                defaultActiveTab={activeTab.tripDuration}
                tabs={swtichTab2}
                callback={updateActiveTab}
              />
            }
            <RangeSlider isTime range={tripDurations[activeTab.tripDuration]} />
          </PrimaryAccordion>
        </div>
      }
    </div>
  )
};

export default Filters;
