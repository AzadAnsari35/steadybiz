import { commonAction } from 'Actions/index';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import securityOptionConstant from 'Constants/securityOptionConstant';
import { utils } from 'Helpers';
import {
  getBaseFareDetails,
  getFlightSegmentByType,
  getHandlingCharges,
  getTaxesAndFeesDetails,
  getTotalAmount,
  getTotalAmountCurrency,
  getTotalFare,
  getTotalPassengersCount,
} from 'Helpers/flight.helpers';
import { getDataFromRedux, getFormattedPrice } from 'Helpers/global';
import useToggle from 'Hooks/useToggle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'Widgets';
import ItineraryFareDeatils from '../ItineraryFareDeatils';
import './style.scss';

const AgencyInformation = () => {
  const flightSelectData = useSelector(
    (state) => state[endpointWithoutApi.flights.flightSelect.reducerName]
  );
  const flightSelect = getDataFromRedux(flightSelectData);
  const { outboundItinerary } = flightSelect;

  const dispatch = useDispatch();
  const [showFareRules, setShowFareRules] = useToggle(false);

  const passengersCount = getTotalPassengersCount(outboundItinerary);
  const { baseFareTotal, baseFareBreakup } = getBaseFareDetails(
    outboundItinerary
  );
  const {
    taxTotal,
    airlineFuelSurcharge,
    airlineMiscellaneousFee,
  } = getTaxesAndFeesDetails(outboundItinerary);
  const totalFare = getTotalFare(outboundItinerary);
  const handlingCharges = getHandlingCharges(outboundItinerary);
  const totalAmount = getTotalAmount(outboundItinerary);
  const totalAmountCurrency = getTotalAmountCurrency(outboundItinerary);

  const outboundFlightSegment = getFlightSegmentByType(
    outboundItinerary,
    'Outbound'
  );
  const inboundFlightSegment = getFlightSegmentByType(
    outboundItinerary,
    'Inbound'
  );

  const { fareBasisCode } = outboundItinerary.totalfareDetails;

  const handleFareRulesClick = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.flights.fareRules
    );
    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    setShowFareRules();
    getFareRulesData(outboundFlightSegment);
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
    <div className="AgencyInformation">
      <div className="container">
        <div className="price-category">
          <div className="price-category-container">
            <div className="price-category__title d-flex justify-content-between">
              <Text
                className="font-primary-semibold-14"
                text={`Base Fare (${passengersCount} Persons)`}
              />
              <Text
                className="font-primary-semibold-14"
                text={getFormattedPrice(baseFareTotal)}
              />
            </div>
            <div className="price-category__description">
              {baseFareBreakup &&
                baseFareBreakup.length > 0 &&
                baseFareBreakup.map((passengerBaseFare, index) => (
                  <div
                    key={index}
                    className="price-category__description-price d-flex justify-content-between"
                  >
                    <Text
                      className="font-primary-regular-14"
                      text={`${passengerBaseFare.passengerType} x ${passengerBaseFare.passengerCount}`}
                    />
                    <Text
                      className="font-primary-regular-14"
                      text={getFormattedPrice(
                        passengerBaseFare.passengerBaseFare
                      )}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="price-category-container">
            <div className="price-category__title d-flex justify-content-between">
              <Text
                className="font-primary-semibold-14"
                text="Taxes and Fees"
              />
              <Text
                className="font-primary-semibold-14"
                text={getFormattedPrice(taxTotal)}
              />
            </div>
            <div className="price-category__description">
              {/* DO NOT REMOVE IT - WILL BE USED IN FUTURE */}
              {/* <div className="price-category__description-price d-flex justify-content-between">
										<Text className="font-primary-medium-16" text="Passenger Service Fee" />
										<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
									</div> */}
              <div className="price-category__description-price d-flex justify-content-between">
                <Text
                  className="font-primary-regular-14"
                  text="Airline Fuel Surcharge"
                />
                <Text
                  className="font-primary-regular-14"
                  text={getFormattedPrice(airlineFuelSurcharge)}
                />
              </div>
              <div className="price-category__description-price d-flex justify-content-between">
                <Text
                  className="font-primary-regular-14"
                  text="Airline Miscellaneous Fee"
                />
                <Text
                  className="font-primary-regular-14"
                  text={getFormattedPrice(airlineMiscellaneousFee)}
                />
              </div>
              <div className="price-category__description-price d-flex justify-content-between">
                <Text
                  className="font-primary-regular-14"
                  text="Value Added Tax (VAT)"
                />
                <Text
                  className="font-primary-regular-14"
                  text={getFormattedPrice(0)}
                />
              </div>
            </div>
          </div>
          {/* DO NOT REMOVE IT - WILL BE USED IN FUTURE */}
          {/* <div className="price-category-container">
								<div className="price-category__title d-flex justify-content-between">
									<Text className="font-primary-bold-18" text="Other services" />
									<Text className="font-primary-bold-18" text={getFormattedPrice(0)} />
								</div>
								<div className="price-category__description">
									<div className="price-category__description-price d-flex justify-content-between">
										<Text className="font-primary-medium-16" text="Insurance" />
										<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
									</div>
									<div className="price-category__description-price d-flex justify-content-between">
										<Text className="font-primary-medium-16" text="Meals" />
										<Text className="font-primary-medium-16" text={getFormattedPrice(0)} />
									</div>
								</div>
							</div> */}
          <div className="price-category-container">
            <div className="price-category__title d-flex justify-content-between">
              <Text className="font-primary-semibold-14" text="Total Fare" />
              <Text
                className="font-primary-semibold-14"
                text={getFormattedPrice(totalFare)}
              />
            </div>
            {/* <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-regular-14"
                    text="Handling Charges"
                  />
                  <Text
                    className="font-primary-regular-14"
                    text={getFormattedPrice(handlingCharges)}
                  />
                </div>
              </div> */}
          </div>
        </div>
        {/* <div className="total-section d-flex justify-content-between">
            <Text className="font-primary-bold-22" text="Total Amount" />
            <Text
              className="font-primary-bold-22 text-align-right"
              text={`${totalAmountCurrency} ${getFormattedPrice(totalAmount)}`}
            />
          </div> */}
      </div>
      <div className="font-primary-semibold-14 pb-12">EARNING</div>
      <div className="AgencyInformation-earning">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Commission @ 2%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Incentive @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>GDS Discount</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Deal Discount @ 2%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Discount @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Markup @ 1%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Run Time Markup</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Total Earning</div>
          <div>77.16</div>
        </div>
      </div>
      <div className="font-primary-semibold-14 pb-12 pt-24">TAXES</div>
      <div className="AgencyInformation-tax">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>VAT / GST Amount @ 5%</div>
          <div>77.16</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Net Amount to be Paid</div>
          <div>77.16</div>
        </div>
      </div>
    </div>
  );
};

export default AgencyInformation;
