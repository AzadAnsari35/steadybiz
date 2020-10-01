import {
  getHandlingCharges,
  getTotalAmount,
  getTotalFare,
} from 'Helpers/flight.helpers';
import React from 'react';
import { Card, Text } from 'Widgets';
import { getFormattedPrice } from 'Helpers/global';

import './style.scss';

const CustomerPaymentDetails = (props) => {
  const { outboundItinerary } = props;

  const totalFare = getTotalFare(outboundItinerary);
  const handlingCharges = getHandlingCharges(outboundItinerary);
  const totalAmount = getTotalAmount(outboundItinerary);

  return (
    <div className="CustomerPaymentDetails">
      <Card
        title="CUSTOMER PAYMENT DETAILS"
        cardContainerClassName="position-relative"
        className="mt-40"
      >
        <div className="container">
          <div className="price-category">
            <div className="price-category-container">
              <div className="price-category__title d-flex justify-content-between">
                <Text
                  className="font-primary-semibold-16"
                  text="       Amount to be paid by Customer                  "
                />
              </div>

              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Total Fare" />
                  <Text
                    className="font-primary-medium-16"
                    text={getFormattedPrice(totalFare)}
                  />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="Handling Charges"
                  />
                  <Text
                    className="font-primary-medium-16"
                    text={getFormattedPrice(handlingCharges)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="total-section d-flex justify-content-between">
            <Text className="font-primary-semibold-20" text="Total Amount" />
            <Text
              className="font-primary-semibold-20 text-align-right"
              text={getFormattedPrice(totalAmount)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerPaymentDetails;
