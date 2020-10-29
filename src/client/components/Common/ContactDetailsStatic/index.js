import React from "react";

import { Card, Text } from "Widgets";

import "./style.scss";

const ContactDetailsStatic = (props) => {
  const { contactDetails: { agencyName, countryCode, phone, email} } = props;

  return (
    <div className="ContactDetailsStatic">
      <Card title="Contact Details">
      {!!agencyName && <div className="ContactDetailsStatic-category">
          <Text
            className="ContactDetailsStatic-category__title font-primary-medium-16"
            text="Agency Name"
          />
          <Text
            className="ContactDetailsStatic-category__content font-primary-semibold-16-1"
            text={agencyName}
          />
        </div>}
        {!!phone && <div className="ContactDetailsStatic-category">
          <Text
            className="ContactDetailsStatic-category__title font-primary-medium-16"
            text="Mobile Number"
          />
          <Text
            className="ContactDetailsStatic-category__content font-primary-semibold-16-1"
            text={`${!!countryCode ? `${countryCode} ` : ''} ${phone}`}
          />
        </div>}
        {!!email && <div className="ContactDetailsStatic-category">
          <Text
            className="ContactDetailsStatic-category__title font-primary-medium-16"
            text="Email ID"
          />
          <Text
            className="ContactDetailsStatic-category__content font-primary-semibold-16-1"
            text={email}
          />
        </div>}
      </Card>
    </div>
  )
};

export default ContactDetailsStatic;