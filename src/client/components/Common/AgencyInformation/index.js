/* eslint-disable react/prop-types */
import {
  getFlightSegmentByType,
  getHandlingCharges,
  getTotalEarning,
  getTaxesAndFeesDetails,
  getTotalAmount,
  getTotalAmountCurrency,
  getTotalFare,
  calculateTaxBreakUp,
} from 'Helpers/flight.helpers';
import { getFormattedPrice } from 'Helpers/global';
import React from 'react';
import { SecondaryAccordion, Text } from 'Widgets';
import './style.scss';

const AgencyInformation = (props) => {
  const { outboundItinerary } = props;
  //console.log(outboundItinerary);
  const {
    taxTotal,

    airlineMiscellaneousFee,
  } = getTaxesAndFeesDetails(outboundItinerary);
  const totalFare = getTotalFare(outboundItinerary);
  const handlingCharges = getHandlingCharges(outboundItinerary);
  const totalAmount = getTotalAmount(outboundItinerary);
  const totalAmountCurrency = getTotalAmountCurrency(outboundItinerary);

  // const outboundFlightSegment = getFlightSegmentByType(
  //   outboundItinerary,
  //   'Outbound'
  // );
  // const inboundFlightSegment = getFlightSegmentByType(
  //   outboundItinerary,
  //   'Inbound'
  // );
  const totalfareDetails = outboundItinerary.totalfareDetails;
  const fareDetails = totalfareDetails.fareDetails;
  const YQTax = calculateTaxBreakUp(fareDetails, 'YQ');
  const YRTax = calculateTaxBreakUp(fareDetails, 'YR');
  const passengersCount = fareDetails.reduce(
    (totalSum, pax) => totalSum + pax.count,
    0
  );

  // const { fareBasisCode } = outboundItinerary.totalfareDetails;

  return (
    <div className="AgencyInformation">
      <SecondaryAccordion
        text="ITINERARY FARE"
        defaultOpen={true}
        className="AgencyInformation-accordian"
      >
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
                  text={getFormattedPrice(totalfareDetails.baseFareTotal)}
                />
              </div>
              <div className="price-category__description">
                {fareDetails.map((passengerBaseFare, index) => (
                  <div
                    key={index}
                    className="price-category__description-price d-flex justify-content-between"
                  >
                    <Text
                      className="font-primary-regular-14"
                      text={`${passengerBaseFare.ptc} x ${passengerBaseFare.count}`}
                    />
                    <Text
                      className="font-primary-regular-14"
                      text={getFormattedPrice(passengerBaseFare.baseFare)}
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
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-regular-14" text="YQ Tax" />
                  <Text
                    className="font-primary-regular-14"
                    text={getFormattedPrice(YQTax)}
                  />
                </div>
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-regular-14" text="YR Tax" />
                  <Text
                    className="font-primary-regular-14"
                    text={getFormattedPrice(YRTax)}
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
                {/* <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-regular-14"
                    text="Value Added Tax (VAT)"
                  />
                  <Text
                    className="font-primary-regular-14"
                    text={getFormattedPrice(0)}
                  />
                </div> */}
              </div>
            </div>

            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text className="font-primary-semibold-14" text="Total Fare" />
                <Text
                  className="font-primary-semibold-14"
                  text={getFormattedPrice(totalFare)}
                />
              </div>
            </div>
          </div>
        </div>
      </SecondaryAccordion>

      <div className="font-primary-semibold-14 pb-12">EARNING</div>
      <div className="AgencyInformation-earning">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Commission</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Incentive</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>GDS Discount</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Deal Discount</div>
          <div>{getFormattedPrice(totalfareDetails.dealDiscount)}</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Discount</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Markup</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>Run Time Markup</div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Total Earning</div>
          <div>{getFormattedPrice(getTotalEarning(outboundItinerary))}</div>
        </div>
      </div>
      <div className="font-primary-semibold-14 pb-12 pt-24">TAXES</div>
      <div className="AgencyInformation-tax">
        <div className="d-flex justify-content-between font-primary-regular-14">
          <div>VAT / GST Amount </div>
          <div>0.00</div>
        </div>
        <div className="d-flex justify-content-between font-primary-semibold-14">
          <div>Net Amount to be Paid</div>
          <div>{getFormattedPrice(totalAmount)}</div>
        </div>
      </div>
    </div>
  );
};

export default AgencyInformation;
