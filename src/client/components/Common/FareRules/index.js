import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { commonAction, commonActionUpdate } from 'Actions';
import endpoint from 'Config/endpoint';
import { getDataFromRedux } from 'Helpers/global';
import { getFlightSegmentByType } from 'Helpers/flight.helpers';

import { Text } from 'Widgets';

import './style.scss';

const FareRules = (props) => {
  const { itinerary } = props;
  const dispatch = useDispatch();
  console.log('hii');
  const fareRulesResponse = useSelector(
    (state) => state[endpoint.flights.fareRules.reducerName]
  );
  const fareRules = getDataFromRedux(fareRulesResponse);

  const [fareRulesSegments, setFareRulesSegments] = useState([]);
  const [activeFareRulesTab, setActiveFareRulesTab] = useState(1);

  const outboundFlightSegment = getFlightSegmentByType(itinerary, 'Outbound');
  const inboundFlightSegment = getFlightSegmentByType(itinerary, 'Inbound');

  const { fareBasisCode } = itinerary.totalfareDetails;

  useEffect(() => {
    if (inboundFlightSegment) {
      setFareRulesSegments([outboundFlightSegment, inboundFlightSegment]);
    } else {
      setFareRulesSegments([outboundFlightSegment]);
    }
    setActiveFareRulesTab(outboundFlightSegment.flightSegments);
  }, []);

  const handleFareRulesTabClick = (tab) => {
    if (activeFareRulesTab === tab.flightSegments) {
      return;
    } else {
      if (tab.flightSegments.flightSegmentDirection === 'Outbound') {
        dispatch(commonActionUpdate(endpoint.flights.fareRules, null));
        getFareRulesData(tab);
        setActiveFareRulesTab(tab.flightSegments);
      } else {
        setActiveFareRulesTab(tab.flightSegments);
      }
    }
  };

  const getFareRulesData = (tab) => {
    dispatch(
      commonAction(endpoint.flights.fareRules, {
        flightSegments: tab,
        fareBasisCode,
      })
    );
  };

  return (
    <div className="FareRules">
      <div className="FareRules-tabs d-flex">
        {fareRulesSegments.map((tab, index) => {
          return (
            <div
              key={tab.flightSegments}
              className={`tab ${
                activeFareRulesTab === tab.flightSegments ? 'active' : ''
              } cursor-pointer`}
              onClick={() => handleFareRulesTabClick(tab)}
            >
              <Text
                className="font-primary-medium-14"
                text={`${
                  tab.flightSegmentGroup[0].departureDetails.cityName
                } (${
                  tab.flightSegmentGroup[0].departureDetails.airportCode
                }) - ${
                  tab.flightSegmentGroup[tab.flightSegmentGroup.length - 1]
                    .arrivalDetails.cityName
                } (${
                  tab.flightSegmentGroup[tab.flightSegmentGroup.length - 1]
                    .arrivalDetails.airportCode
                })`}
              />
            </div>
          );
        })}
      </div>
      {fareRules &&
        !!fareRules.fareRules &&
        fareRules.fareRules.length > 0 &&
        fareRules.fareRules.map((fareRule, index) => (
          <div className="FareRules-details">
            <div className="FareRules-details__title font-primary-semibold-12 mb-16">
              {fareRule.fareRuleName}
            </div>
            <div
              className="FareRules-details__description font-primary-medium-12 mb-16"
              dangerouslySetInnerHTML={{
                __html: fareRule.fareRuleDesc.replace(/\n/g, '<br />'),
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default FareRules;
