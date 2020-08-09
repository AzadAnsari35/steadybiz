import React from "react";

import { Text } from "Widgets";

import "./style.scss";

const ErrorMessage = props => {
  const { errorMessage } = props;
  return (
    <Text
      className="error-message font-primary-medium-16"
      text={errorMessage}
    />
  )
};

export default ErrorMessage;