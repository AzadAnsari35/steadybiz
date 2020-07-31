import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';

import useToggle from "Client/hooks/useToggle";
import useCheckboxData from "Client/hooks/useCheckboxData";
import endpoint from "Config/endpoint";
import { getAirlineName, getFiltersData } from "Helpers/flight.helpers";
import { applyCommaToPrice, getDataFromRedux } from "Helpers/global";

import { CustomCheckbox, Image, Link, PrimaryAccordion, RangeSlider, SwitchTab, Text} from "Widgets";

import "./style.scss";

const LIMIT_AIRLINES_SHOW_COUNT = 6;

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
  const { airlineCode, airlineName, price, onChange } = props;
  return (
    <CustomCheckbox
      name="airlines"
      value={airlineCode}
      useReactHookForm={false}
      onChange={onChange}
    >
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
  const { flightSegmentType, outboundItinerary } = props;
  const [showAllAirlines, toggleShowAllAirlines] = useToggle(false);
  const [activeTab, setActiveTab] = useState({
    nearbyAirports: swtichTab2[0].id,
    stops: swtichTab2[0].id,
    flightTime: swtichTab2[0].id,
    layoverDuration: swtichTab2[0].id,
    tripDuration: swtichTab2[0].id,
  });
  const { register, control } = useForm();
  const [airlines, setAirlines] = useCheckboxData([]);

  const masterAirlinesResponse = useSelector(state => state[endpoint.master.airlines.reducerName]);

  const masterAirlines = !!getDataFromRedux(masterAirlinesResponse) &&
    getDataFromRedux(masterAirlinesResponse).data;

  const {
    priceRange,
    nearbyAirportsData,
    stopsData,
    refundableMinPrice,
    nonRefundableMinPrice,
    airlinesData,
    flightSlots,
    layoverDurations,
    tripDurations,
    itineraryCityNames,
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
            tabs={swtichTab2}
            callback={updateActiveTab}
          />
          {!!nearbyAirportsData && !!itineraryCityNames && itineraryCityNames.map((item, index) =>
            <div key={index} className="mb-20">
              <div className="font-primary-medium-14 d-flex mb-22">
                <Text className="text-uppercase mr-4" text={`${item.id} : `} />
                <Text className="font-primary-bold text-uppercase" text={item.value} />
              </div>
              {Object.keys(nearbyAirportsData[activeTab.nearbyAirports][item.id]).map((airport, index) => {
                return (
                  <CustomCheckbox
                    key={index}
                    control={control}
                    name="nearByAirports"
                    register={register}
                    value={airport}
                    primaryLabel={nearbyAirportsData[activeTab.nearbyAirports][item.id][airport].name}
                    secondaryLabel={applyCommaToPrice(nearbyAirportsData[activeTab.nearbyAirports][item.id][airport].price)}
                  />
                )
              })}
            </div>
          )}
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
            <CustomCheckbox
              control={control}
              disabled={!isFinite(stopsData[activeTab.stops].directFlightsMinPrice)}
              name="stops"
              register={register}
              primaryLabel="Direct"
              secondaryLabel={
                isFinite(stopsData[activeTab.stops].directFlightsMinPrice)
                ? applyCommaToPrice(stopsData[activeTab.stops].directFlightsMinPrice)
                : ""
              }
            />
            <CustomCheckbox
              control={control}
              disabled={!isFinite(stopsData[activeTab.stops].oneStopFlighstMinPrice)}
              name="stops"
              register={register}
              primaryLabel="1 Stop"
              secondaryLabel={
                isFinite(stopsData[activeTab.stops].oneStopFlighstMinPrice)
                ? applyCommaToPrice(stopsData[activeTab.stops].oneStopFlighstMinPrice)
                : ""
              }
            />
            <CustomCheckbox
              control={control}
              disabled={!isFinite(stopsData[activeTab.stops].twoStopFlighstMinPrice)}
              name="stops"
              register={register}
              primaryLabel="2 Stops"
              secondaryLabel={
                isFinite(stopsData[activeTab.stops].twoStopFlighstMinPrice)
                ? applyCommaToPrice(stopsData[activeTab.stops].twoStopFlighstMinPrice)
                : ""
              }
            />
          </PrimaryAccordion>
        </div>
      }
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Fare Types" defaultOpen>
          <CustomCheckbox
            control={control}
            disabled={!isFinite(refundableMinPrice)}
            name="fareTypes"
            register={register}
            primaryLabel="Refundable"
            secondaryLabel={
              isFinite(refundableMinPrice)
              ? applyCommaToPrice(refundableMinPrice)
              : ""
            }
          />
          <CustomCheckbox
            control={control}
            disabled={!isFinite(nonRefundableMinPrice)}
            name="fareTypes"
            register={register}
            primaryLabel="Non - Refundable"
            secondaryLabel={
              isFinite(nonRefundableMinPrice)
              ? applyCommaToPrice(nonRefundableMinPrice)
              : ""
            }
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
          {!!airlinesData && Object.keys(airlinesData).map((airline, index) => {
            const airlineCheckbox =
              <AirlineCheckbox
                key={index}
                airlineCode={airline}
                airlineName={!!masterAirlines && getAirlineName(masterAirlines, airline)}
                price={airlinesData[airline]}
                onChange={setAirlines}
              />;
            if (!showAllAirlines && index < LIMIT_AIRLINES_SHOW_COUNT) {
              return airlineCheckbox;
            } else if (showAllAirlines) {
              return airlineCheckbox;
            }
          })}
          {!!airlinesData && Object.keys(airlinesData).length > LIMIT_AIRLINES_SHOW_COUNT && !showAllAirlines
            ? <Text
              className="font-primary-medium-14 link-text"
              text={`+ ${Object.keys(airlinesData).length - LIMIT_AIRLINES_SHOW_COUNT} Airline${
                Object.keys(airlinesData).length - LIMIT_AIRLINES_SHOW_COUNT > 1 ? "s" : ""}`}
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
          {!!flightSlots && !!itineraryCityNames && itineraryCityNames.map((item, index) => {
            const { first, second, third, fourth } = flightSlots[activeTab.flightTime][index === 0 ? "departure" : "arrival"];
            return (
              <div key={index} className="mb-20">
                <div className="font-primary-medium-14 d-flex mb-22">
                  <Text className="text-uppercase mr-4" text={`${item.id} : `} />
                  <Text className="font-primary-bold text-uppercase" text={item.value} />
                </div> 
                <CustomCheckbox
                  control={control}
                  disabled={!isFinite(first)}
                  name="departureTime"
                  register={register}
                  primaryLabel="Morning ( 06:00 - 11:59 )"
                  secondaryLabel={
                    isFinite(first)
                    ? applyCommaToPrice(first)
                    : ""
                  }
                />
                <CustomCheckbox
                  control={control}
                  disabled={!isFinite(second)}
                  name="departureTime"
                  register={register}
                  primaryLabel="Afternoon ( 12:00 - 17:59 )"
                  secondaryLabel={
                    isFinite(second)
                    ? applyCommaToPrice(second)
                    : ""
                  }
                />
                <CustomCheckbox
                  control={control}
                  disabled={!isFinite(third)}
                  name="departureTime"
                  register={register}
                  primaryLabel="Evening ( 18:00 - 23:59 )"
                  secondaryLabel={
                    isFinite(third)
                    ? applyCommaToPrice(third)
                    : ""
                  }
                />
                <CustomCheckbox
                  control={control}
                  disabled={!isFinite(fourth)}
                  name="departureTime"
                  register={register}
                  primaryLabel="Night ( 00:00 - 05:59 )"
                  secondaryLabel={
                    isFinite(fourth)
                    ? applyCommaToPrice(fourth)
                    : ""
                  }
                />
              </div>
            )
          })}
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
