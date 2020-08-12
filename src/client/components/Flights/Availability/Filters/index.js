/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { commonActionWithoutApi } from 'Actions';
import useToggle from 'Client/hooks/useToggle';
import useCheckboxData from 'Client/hooks/useCheckboxData';
import endpoint from 'Config/endpoint';
import { getAirlineName, getFiltersData } from 'Helpers/flight.helpers';
import { applyCommaToPrice, getDataFromRedux } from 'Helpers/global';
//import availabilityResults from 'Views/availability/availabilityResults';
import moment from 'moment';
//import { countryList } from 'Views/availability/countryList';
import {
  returnFilterData,
  returnRangeFilterData,
  returnFilterArray,
  returnFilterTimeSlot,
  returnSortArray,
} from './filters.helpers';
import {
  CustomCheckbox,
  Image,
  Link,
  PrimaryAccordion,
  RangeSlider,
  SwitchTab,
  Text,
} from 'Widgets';

import './style.scss';

const LIMIT_AIRLINES_SHOW_COUNT = 6;

const swtichTab2 = [
  {
    id: 'outbound',
    text: 'outbound',
  },
  {
    id: 'return',
    text: 'return',
  },
];
const StopsHtml = (props) => {
  const { stopsData, activeTab, segmentType, setStops } = props;
  //console.log(stopsData, activeTab);
  // style={{
  //   display: activeTab == segmentType ? 'block' : 'none',
  // }}
  return (
    <Fragment>
      {[
        'directFlightsMinPrice',
        'oneStopFlighstMinPrice',
        'twoStopFlighstMinPrice',
      ].map((item, index) => (
        <CustomCheckbox
          onChange={setStops}
          useReactHookForm={false}
          key={`${segmentType}-${index}`}
          value={`${segmentType}-${index}`}
          disabled={!isFinite(stopsData[segmentType][item])}
          name="stops"
          primaryLabel={
            index == 0 ? 'Direct' : index == 1 ? '1 Stop' : '2 Stops'
          }
          secondaryLabel={
            isFinite(stopsData[segmentType][item])
              ? applyCommaToPrice(stopsData[segmentType][item])
              : ''
          }
        />
      ))}
    </Fragment>
  );
};
const FlightSlotsHtml = (props) => {
  const {
    setflightSlots,
    itineraryCityNames,
    flightSlotsData,
    activeTab,
    segmentType,
  } = props;

  return (
    <Fragment>
      {!!flightSlotsData &&
        !!itineraryCityNames &&
        itineraryCityNames.map((item, index) => (
          //{let cityName=segmentType=='inbound'?item.value:item.value;}
          <div
            style={{
              display: activeTab == segmentType ? 'block' : 'none',
            }}
            key={index}
            className="mb-20"
          >
            <div className="font-primary-medium-14 d-flex mb-22">
              <Text className="text-uppercase mr-4" text={`${item.id} : `} />
              <Text
                className="font-primary-bold text-uppercase"
                text={
                  segmentType === 'return'
                    ? index === 0
                      ? itineraryCityNames[1].value
                      : itineraryCityNames[0].value
                    : item.value
                }
              />
            </div>
            {Object.keys(flightSlotsData[segmentType][item.id]).map(
              (subItem, subIndex) => {
                const range =
                  subIndex == 0
                    ? '360_719'
                    : subIndex == 1
                    ? '720_1079'
                    : subIndex == 2
                    ? '1080_1439'
                    : '0_359';
                return (
                  <CustomCheckbox
                    key={`${segmentType}${item.id}${index}${subIndex}${subItem}`}
                    value={`${segmentType}${item.id}-${range}`}
                    onChange={setflightSlots}
                    useReactHookForm={false}
                    name="flightSlotState"
                    primaryLabel={
                      subIndex == 0
                        ? 'Morning ( 06:00 - 11:59 )'
                        : subIndex == 1
                        ? 'Afternoon ( 12:00 - 17:59 )'
                        : subIndex == 2
                        ? 'Evening ( 18:00 - 23:59 )'
                        : 'Night ( 00:00 - 05:59 )'
                    }
                    secondaryLabel={
                      isFinite(subItem) ? applyCommaToPrice(subItem) : ''
                    }
                  />
                );
              }
            )}
          </div>
        ))}
    </Fragment>
  );
};
const NearbyAirportHtml = (props) => {
  const {
    setNearByAirports,
    itineraryCityNames,
    nearbyAirportsData,
    activeTab,
    segmentType,
  } = props;

  return (
    <Fragment>
      {!!nearbyAirportsData &&
        !!itineraryCityNames &&
        itineraryCityNames.map((item, index) => (
          //{let cityName=segmentType=='inbound'?item.value:item.value;}
          <div
            style={{
              display: activeTab == segmentType ? 'block' : 'none',
            }}
            key={index}
            className="mb-20"
          >
            <div className="font-primary-medium-14 d-flex mb-22">
              <Text className="text-uppercase mr-4" text={`${item.id} : `} />
              <Text
                className="font-primary-bold text-uppercase"
                text={
                  segmentType === 'return'
                    ? index === 0
                      ? itineraryCityNames[1].value
                      : itineraryCityNames[0].value
                    : item.value
                }
              />
            </div>
            {Object.keys(nearbyAirportsData[segmentType][item.id]).map(
              (airport, index) => {
                return (
                  <CustomCheckbox
                    key={`${segmentType}${item.id}${airport}${index}`}
                    name="nearByAirports"
                    onChange={setNearByAirports}
                    useReactHookForm={false}
                    value={`${segmentType}${item.id}-${airport}`}
                    primaryLabel={
                      nearbyAirportsData[segmentType][item.id][airport].name
                    }
                    secondaryLabel={applyCommaToPrice(
                      nearbyAirportsData[segmentType][item.id][airport].price
                    )}
                  />
                );
              }
            )}
          </div>
        ))}
    </Fragment>
  );
};
const AirlineCheckbox = (props) => {
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
            style={{ height: '26px', width: '26px', marginRight: '16px' }}
          />
          <Text className="font-primary-regular-14" text={airlineName} />
        </div>
        <Text
          className="font-primary-regular-14"
          text={applyCommaToPrice(price)}
        />
      </div>
    </CustomCheckbox>
  );
};

const Filters = (props) => {
  const dispatch = useDispatch();
  const { flightSegmentType, outboundItinerary ,parentFilterDataCallback,sortingOption} = props;
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
  const [fareType, setFareType] = useCheckboxData([]);

  const [nearByAirports, setNearByAirports] = useCheckboxData([]);
  const [flightSlotsState, setflightSlots] = useCheckboxData([]);
  const [newPriceRange, setNewPriceRange] = useState([]);
  const [stops, setStops] = useCheckboxData([]);
  const [sortType, setSortType] = useState(sortingOption);
  const [sortOrder, setSortOrder] = useState('dsc');
  useEffect(() => {
    //console.log(stops);
    //2020-09-01T23:35:00+05:30
    console.log(moment('2020-09-01T23:35:00+05:30').format('X'));
    //console.log(stops);
    const list =outboundItinerary;//      availabilityResults.commonRS.flightItinerary[0].outboundItinerary;
    //const result =outboundItinerary // availabilityResults;
    let filterData = returnFilterData(airlines, list, 'airlines');
    console.log(filterData);
    
    filterData = returnFilterData(fareType, filterData, 'fareType');

    const oDeptAirport = returnFilterArray(nearByAirports, 'outbounddeparture');

    const oArrAirport = returnFilterArray(nearByAirports, 'outboundarrival');
    filterData = returnFilterData(oDeptAirport, filterData, 'oDeptAirport');
    filterData = returnFilterData(oArrAirport, filterData, 'oArrAirport');

    const isReturn = true;
    if (isReturn) {
      const rDeptAirport = returnFilterArray(nearByAirports, 'returndeparture');
      filterData = returnFilterData(rDeptAirport, filterData, 'rDeptAirport');

      const rArrAirport = returnFilterArray(nearByAirports, 'returnarrival');
      filterData = returnFilterData(rArrAirport, filterData, 'rArrAirport');
    }

    const oStops = returnFilterArray(stops, 'outbound').map((el) =>
      parseInt(el)
    );

    filterData = returnFilterData(oStops, filterData, 'oStops');
    console.log('hi', filterData);
    if (isReturn) {
      const rStops = returnFilterArray(stops, 'return').map((el) =>
        parseInt(el)
      );
      filterData = returnFilterData(rStops, filterData, 'rStops');
    }
    const oDeptFlightSlots = returnFilterArray(
      flightSlotsState,
      'outbounddeparture'
    );
    filterData = returnFilterTimeSlot(
      oDeptFlightSlots,
      filterData,
      'oDeptFlightSlots'
    );
    const oArrFlightSlots = returnFilterArray(
      flightSlotsState,
      'outboundarrival'
    );
    filterData = returnFilterTimeSlot(
      oArrFlightSlots,
      filterData,
      'oArrFlightSlots'
    );
    if (isReturn) {
      const rDeptFlightSlots = returnFilterArray(
        flightSlotsState,
        'returndeparture'
      );
      filterData = returnFilterTimeSlot(
        rDeptFlightSlots,
        filterData,
        'rDeptFlightSlots'
      );
      const rArrFlightSlots = returnFilterArray(
        flightSlotsState,
        'returnarrival'
      );
      filterData = returnFilterTimeSlot(
        rArrFlightSlots,
        filterData,
        'rArrFlightSlots'
      );
    }
    console.log(flightSlotsState);
    filterData = returnRangeFilterData(
      newPriceRange,
      filterData,
      'newPriceRange'
    );

    filterData = returnSortArray(filterData, sortType, sortOrder);
    parentFilterDataCallback(filterData);
    // result.outboundItinerary = [];
    // result.outboundItinerary = filterData;
    //outboundItinerary = filterData;
    //availabilityResults.commonRS.flightItinerary[0]=airlineData;
    //console.log('dfdf', result);
    //dispatch(commonActionWithoutApi(endpoint.flights.flightSearch, result));
    // let autoSuggestData = [];
    // countryList.map((country) => {
    //   country.cities.map((city) => {
    //     // autoSuggestData.push({
    //     //   code: city.cityCode,
    //     //   subTitle: city.cityName + ', ' + country.countryname,
    //     //   title: city.cityName + ' (All Airports)',
    //     //   level: 0,
    //     // });
    //     city.airports.map((airport) => {
    //       autoSuggestData.push({
    //         code: '',
    //         subTitle: '',
    //         title:
    //           city.cityName +
    //           ' (' +
    //           airport.airportCode +
    //           ') - ' +
    //           airport.airportName,
    //         level: 0,
    //       });
    //     });
    //   });
    // });
    // download(JSON.stringify(autoSuggestData), 'json.txt', 'text/plain');
  }, [
    airlines,
    fareType,
    nearByAirports,
    stops,
    newPriceRange,
    flightSlotsState,
  ]);
  function download(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  //  console.log(newPriceRange);
  const masterAirlinesResponse = useSelector(
    (state) => state[endpoint.master.airlines.reducerName]
  );

  const masterAirlines =
    !!getDataFromRedux(masterAirlinesResponse) &&
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
  console.log(flightSlots);
  const updateActiveTab = (id, activeTabId) => {
    setActiveTab({
      ...activeTab,
      [id]: activeTabId,
    });
  };
  const priceRangeCallback = (newValue) => {
    setNewPriceRange(newValue);
  };
  const handleResetAll = () => {
    console.log('hh');
    setAirlines([]);
    setFareType([]);
  };
  return (
    <div className="Filters">
      <Text
        className="Filters-title font-primary-bold-20 text-uppercase"
        text="filter results"
      />
      <div className="Filters-section d-flex justify-content-between pt-0">
        {!!outboundItinerary && (
          <Text
            className="font-primary-medium-14"
            text={`${outboundItinerary.length} flights found.`}
          />
        )}
        <Link className="ml-auto" text="Reset All" onClick={handleResetAll} />
        <span onClick={handleResetAll}>reset all</span>
      </div>
      {!!priceRange && (
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Price" defaultOpen>
            <RangeSlider
              isPrice
              range={priceRange}
              parentCallback={priceRangeCallback}
            />
          </PrimaryAccordion>
        </div>
      )}
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Nearby Airports" defaultOpen>
          {flightSegmentType === 'RT' && (
            <SwitchTab
              id="nearbyAirports"
              defaultActiveTab={activeTab.nearbyAirports}
              tabs={swtichTab2}
              callback={updateActiveTab}
            />
          )}

          <NearbyAirportHtml
            setNearByAirports={setNearByAirports}
            itineraryCityNames={itineraryCityNames}
            nearbyAirportsData={nearbyAirportsData}
            activeTab={activeTab.nearbyAirports}
            segmentType={'outbound'}
          />
          {flightSegmentType === 'RT' && (
            <NearbyAirportHtml
              setNearByAirports={setNearByAirports}
              itineraryCityNames={itineraryCityNames}
              nearbyAirportsData={nearbyAirportsData}
              activeTab={activeTab.nearbyAirports}
              segmentType={'return'}
            />
          )}
        </PrimaryAccordion>
      </div>

      {!!stopsData && (
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Stops" defaultOpen>
            {flightSegmentType === 'RT' && (
              <SwitchTab
                id="stops"
                defaultActiveTab={activeTab.stops}
                tabs={swtichTab2}
                callback={updateActiveTab}
              />
            )}
            <StopsHtml
              setStops={setStops}
              stopsData={stopsData}
              activeTab={activeTab.stops}
              segmentType={'outbound'}
            />
            {flightSegmentType === 'RT' && (
              <StopsHtml
                stopsData={stopsData}
                activeTab={activeTab.stops}
                segmentType={'return'}
              />
            )}
          </PrimaryAccordion>
        </div>
      )}
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Fare Types" defaultOpen>
          <CustomCheckbox
            disabled={!isFinite(refundableMinPrice)}
            name="fareTypes"
            value={true}
            onChange={setFareType}
            useReactHookForm={false}
            primaryLabel="Refundable"
            secondaryLabel={
              isFinite(refundableMinPrice)
                ? applyCommaToPrice(refundableMinPrice)
                : ''
            }
          />
          <CustomCheckbox
            disabled={!isFinite(nonRefundableMinPrice)}
            name="fareTypes"
            value={false}
            onChange={setFareType}
            useReactHookForm={false}
            primaryLabel="Non - Refundable"
            secondaryLabel={
              isFinite(nonRefundableMinPrice)
                ? applyCommaToPrice(nonRefundableMinPrice)
                : ''
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
          {!!airlinesData &&
            Object.keys(airlinesData).map((airline, index) => {
              const airlineCheckbox = (
                <AirlineCheckbox
                  key={index}
                  airlineCode={airline}
                  airlineName={
                    !!masterAirlines && getAirlineName(masterAirlines, airline)
                  }
                  price={airlinesData[airline]}
                  onChange={setAirlines}
                />
              );
              if (!showAllAirlines && index < LIMIT_AIRLINES_SHOW_COUNT) {
                return airlineCheckbox;
              } else if (showAllAirlines) {
                return airlineCheckbox;
              }
            })}
          {!!airlinesData &&
          Object.keys(airlinesData).length > LIMIT_AIRLINES_SHOW_COUNT &&
          !showAllAirlines ? (
            <Text
              className="font-primary-medium-14 link-text"
              text={`+ ${
                Object.keys(airlinesData).length - LIMIT_AIRLINES_SHOW_COUNT
              } Airline${
                Object.keys(airlinesData).length - LIMIT_AIRLINES_SHOW_COUNT > 1
                  ? 's'
                  : ''
              }`}
              onClick={toggleShowAllAirlines}
            />
          ) : (
            <Text
              className="font-primary-medium-14 link-text"
              text={`- Show Less`}
              onClick={toggleShowAllAirlines}
            />
          )}
        </PrimaryAccordion>
      </div>
      <div className="Filters-section d-flex justify-content-between">
        <PrimaryAccordion text="Flight Time" defaultOpen>
          {flightSegmentType === 'RT' && (
            <SwitchTab
              id="flightTime"
              defaultActiveTab={activeTab.flightTime}
              tabs={swtichTab2}
              callback={updateActiveTab}
            />
          )}
          <FlightSlotsHtml
            setflightSlots={setflightSlots}
            itineraryCityNames={itineraryCityNames}
            flightSlotsData={flightSlots}
            activeTab={activeTab.flightTime}
            segmentType={'outbound'}
          />
          {flightSegmentType === 'RT' && (
            <FlightSlotsHtml
              setflightSlots={setflightSlots}
              itineraryCityNames={itineraryCityNames}
              flightSlotsData={flightSlots}
              activeTab={activeTab.flightTime}
              segmentType={'return'}
            />
          )}
          {/* {!!flightSlots &&
            !!itineraryCityNames &&
            itineraryCityNames.map((item, index) => {
              const { first, second, third, fourth } = flightSlots[
                activeTab.flightTime
              ][index === 0 ? 'departure' : 'arrival'];
              return (
                <div key={index} className="mb-20">
                  <div className="font-primary-medium-14 d-flex mb-22">
                    <Text
                      className="text-uppercase mr-4"
                      text={`${item.id} : `}
                    />
                    <Text
                      className="font-primary-bold text-uppercase"
                      text={item.value}
                    />
                  </div>
                  <CustomCheckbox
                    control={control}
                    disabled={!isFinite(first)}
                    name="departureTime"
                    register={register}
                    primaryLabel="Morning ( 06:00 - 11:59 )"
                    secondaryLabel={
                      isFinite(first) ? applyCommaToPrice(first) : ''
                    }
                  />
                  <CustomCheckbox
                    control={control}
                    disabled={!isFinite(second)}
                    name="departureTime"
                    register={register}
                    primaryLabel="Afternoon ( 12:00 - 17:59 )"
                    secondaryLabel={
                      isFinite(second) ? applyCommaToPrice(second) : ''
                    }
                  />
                  <CustomCheckbox
                    control={control}
                    disabled={!isFinite(third)}
                    name="departureTime"
                    register={register}
                    primaryLabel="Evening ( 18:00 - 23:59 )"
                    secondaryLabel={
                      isFinite(third) ? applyCommaToPrice(third) : ''
                    }
                  />
                  <CustomCheckbox
                    control={control}
                    disabled={!isFinite(fourth)}
                    name="departureTime"
                    register={register}
                    primaryLabel="Night ( 00:00 - 05:59 )"
                    secondaryLabel={
                      isFinite(fourth) ? applyCommaToPrice(fourth) : ''
                    }
                  />
                </div>
              );
            })} */}
        </PrimaryAccordion>
      </div>
      {!!layoverDurations && (
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Layover Duration" defaultOpen>
            {flightSegmentType === 'RT' && (
              <SwitchTab
                id="layoverDuration"
                defaultActiveTab={activeTab.layoverDuration}
                tabs={swtichTab2}
                callback={updateActiveTab}
              />
            )}
            <RangeSlider
              isTime
              range={layoverDurations[activeTab.layoverDuration]}
            />
          </PrimaryAccordion>
        </div>
      )}
      {!!tripDurations && (
        <div className="Filters-section d-flex justify-content-between">
          <PrimaryAccordion text="Trip Duration" defaultOpen>
            {flightSegmentType === 'RT' && (
              <SwitchTab
                id="tripDuration"
                defaultActiveTab={activeTab.tripDuration}
                tabs={swtichTab2}
                callback={updateActiveTab}
              />
            )}
            <RangeSlider isTime range={tripDurations[activeTab.tripDuration]} />
          </PrimaryAccordion>
        </div>
      )}
    </div>
  );
};

export default Filters;
