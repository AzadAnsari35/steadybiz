/* eslint-disable react/prop-types */
import {
  getFlightSegmentByType,
  getHandlingCharges,
  getTaxesAndFeesDetails,
  getTotalAmount,
  getTotalAmountCurrency,
  getTotalEarning,
  getTotalFare,
} from 'Helpers/flight.helpers';
import { getFormattedPrice } from 'Helpers/global';

import React from 'react';
import { Card, Text } from 'Widgets';
import './style.scss';

const EarningDetails = (props) => {
  const { outboundItinerary } = props;

  const totalAmount = getTotalAmount(outboundItinerary);
  const totalEarning=getTotalEarning(outboundItinerary);

  const totalfareDetails = outboundItinerary?.totalfareDetails;

  return (
    <div className="EarningDetails">
      <Card
        title="AGENCY NET DETAILS"
        cardContainerClassName="position-relative"
        className="mt-40"
      >
        <div className="container">
          <div className="price-category">
            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text
                  className="font-primary-semibold-16"
                  text="Total Commission"
                />
                <Text className="font-primary-semibold-16" text="0.00" />
              </div>
              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Commission" />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Incentive" />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="GDS Discount"
                  />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="Deal Discount"
                  />
                  <Text
                    className="font-primary-medium-16"
                    text={getFormattedPrice(totalfareDetails.dealDiscount)}
                  />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Discount" />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>
              </div>
            </div>
          </div>

          <div className="price-category">
            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text
                  className="font-primary-semibold-16"
                  text="Total Handling Charges"
                />
                <Text className="font-primary-semibold-16" text="0.00" />
              </div>

              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Markup" />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="Run Time Markup"
                  />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>
              </div>
            </div>
          </div>

          <div className="price-category">
            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text
                  className="font-primary-semibold-16"
                  text="Total Earning"
                />
                <Text
                  className="font-primary-semibold-16"
                  text={getFormattedPrice(totalEarning)}
                />
              </div>
            </div>
          </div>

          <div className="price-category">
            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text
                  className="font-primary-semibold-16"
                  text="Taxes on Earning"
                />
              </div>

              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="VAT / GST Amount"
                  />
                  <Text className="font-primary-medium-16" text="0.00" />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between font-primary-semibold-16">
            <div>Net Amount to be Paid</div>
            <div>{getFormattedPrice(totalAmount)}</div>
          </div>
          <div className="font-primary-italic-14">[To be Paid By Agency]</div>
        </div>
      </Card>
    </div>
  );
};

export default EarningDetails;
