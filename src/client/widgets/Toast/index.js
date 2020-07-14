import React, { Fragment, useState, useEffect } from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import colors from "Constants/colors";

import Text from "Widgets/Text";

import "./style.scss";

const Toast = (props) => {
  const {
    isSuccess,
    message,
    textClassName,
    removeAfterNumberOfSeconds,
  } = props;
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (removeAfterNumberOfSeconds) {
      setTimeout(() => {
        setShowToast(false);
      }, removeAfterNumberOfSeconds * 1000);
    }
  }, []);

  const handleCloseToastClick = () => {
    setShowToast(false);
  };

  return (
    <Fragment>
      {showToast && (
        <div
          className={`Toast ${
            !!isSuccess ? "success" : "error"
          } d-flex justify-content-between align-items-center box-shadow-secondary`}
        >
          <div className="Toast-container d-flex">
            <div className="d-flex align-items-center">
              {!!isSuccess && (
                <CheckCircleOutlineIcon
                  className="Toast-icon"
                  style={{ color: colors.sushi }}
                />
              )}
              {!isSuccess && (
                <HighlightOffIcon
                  className="Toast-icon"
                  style={{ color: colors.red }}
                />
              )}
              <Text
                className={`message font-primary-semibold-14 ${
                  !!textClassName ? textClassName : ""
                }`}
                text={message}
              />
            </div>
            <HighlightOffIcon
              className="cursor-pointer Toast-close"
              onClick={handleCloseToastClick}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Toast;
