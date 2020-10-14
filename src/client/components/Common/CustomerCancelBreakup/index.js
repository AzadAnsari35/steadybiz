import React from 'react'
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
import { Card, Text } from 'Widgets';


  import './style.scss';


const CustomerCancelBreakup = () => {
    return (
        <div className="CustomerCancelBreakup">
        <Card
          title="CUSTOMER CANCEL BREAKUP"
          cardContainerClassName="position-relative"
          className="mt-40"
        >
          <div className="container">
              <div className="font-primary-semibold-16 pb-20">Cancel Breakup<br/> For selected pax and segment(s)</div>
              <div className="price-category__description">
                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text=" Total Amount Paid" />
                  <Text className="font-primary-medium-16" text="4368.90" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-medium-16" text="Cancellation Charges" />
                  <Text className="font-primary-medium-16" text="1050.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between">
                  <Text
                    className="font-primary-medium-16"
                    text="Handling Charges"
                  />
                  <Text className="font-primary-medium-16" text="168.00" />
                </div>

                <div className="price-category__description-price d-flex justify-content-between mb-0">
                  <Text
                    className="font-primary-medium-16"
                    text=" Service Charges"
                  />
                  <Text
                    className="font-primary-medium-16"
                    text="325"
                  />
                </div>
                  <Text className="font-primary-italic-14 pb-20" text="[Commission Reversed]" />
                  <div className="price-category__description-price d-flex justify-content-between">
                  <Text className="font-primary-semibold-20" text="Net Refundable Amt." />
                  <Text className="font-primary-semibold-20" text="2,825.90" />
                </div>
              </div>
          </div>
        </Card>
      </div>
    )
}

export default CustomerCancelBreakup
