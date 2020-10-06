import React from 'react';
import colors from 'Constants/colors';
import FlightIcon from '@material-ui/icons/Flight';

import './style.scss';

const InvoiceTableHeader = () => {
  return (
    <div className="InvoiceTableHeader">
      <div className="text-align-center font-primary-semibold-24">Invoice</div>
      <div className="d-flex justify-content-between pt-32">
        <div className="InvoiceTableHeader-left">
          <div className="InvoiceTableHeader-left__company d-flex align-items-center">
            <div className="InvoiceTableHeader-left__company__logo">
              <FlightIcon
                style={{
                  color: colors.white,
                  fontSize: 45,
                  transform: 'rotate(90deg)',
                }}
              />
            </div>

            <div className="InvoiceTableHeader-left__company__name font-primary-medium-30">
              OK TRAVEL
            </div>
          </div>
          <div className="InvoiceTableHeader-left__billTo">
            <div className="font-primary-semibold-12">Bill To:</div>
            <div className="font-primary-semibold-16">
              Axis Tour &amp; Travels Pvt. Ltd. [UIDSBR02]
            </div>
            <div className="font-primary-regular-14">
              Al Ittihad Rd - Port Saeed
            </div>
            <div className="font-primary-regular-14">
              Dubai, United Arab Emirates
            </div>
            <div className="font-primary-regular-14">
              Email: info@axistours.in
            </div>
            <div className="font-primary-regular-14">
              Contact No..: +971 4 294 0099
            </div>
            <div className="font-primary-semibold-14">
              GSTIN: 4512313121212487
            </div>
          </div>
        </div>

        <div className="InvoiceTableHeader-right">
          <div className="text-align-right">
            <div className="font-primary-semibold-16">
              OK Travels &amp; Tourism L.L.C.
            </div>
            <div className="font-primary-regular-14">
              Hameem St - Al BihouthHameem Worker
            </div>
            <div className="font-primary-regular-14">
              Abu Dhabi, United Arab Emirates
            </div>
            <div className="font-primary-regular-14">
              Email: info@axistours.in
            </div>
            <div className="font-primary-regular-14">
              Contact No..: +971 4 294 0099
            </div>
            <div className="font-primary-semibold-14">
              GSTIN: 4512313121212487
            </div>
          </div>

          <div className="InvoiceTableHeader-right__details d-flex justify-content-between">
            <div className="InvoiceTableHeader-right__details__left">
              <div className="d-flex justify-content-between">
                <div className="d-flex font-primary-regular-14">
                  Invoice Date
                </div>
                <div>:</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex font-primary-regular-14">
                  Invoice Number
                </div>

                <div>:</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex font-primary-regular-14">
                  Invoice Amount
                </div>
                <div>:</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex font-primary-regular-14">
                  Previous Amount Due
                </div>
                <div className="pl-40">:</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex font-primary-regular-14">
                  Total Amount Due
                </div>
                <div>:</div>
              </div>
            </div>
            <div className="InvoiceTableHeader-right__details__right text-align-right  pl-40">
              <div className="font-primary-semibold-14">28-Mar-2020</div>
              <div className=" font-primary-semibold-14">INV0000000021</div>
              <div className=" font-primary-semibold-14">AED 25,000.00</div>
              <div className=" font-primary-semibold-14">AED 10,000.00</div>
              <div className=" font-primary-semibold-14">AED 35,000.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-align-center font-primary-medium-16 pt-24">
        This Account Summary is for the billing period February 1, 2020 -
        February 28, 2020
      </div>
    </div>
  );
};

export default InvoiceTableHeader;
