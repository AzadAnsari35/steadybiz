import React, { Fragment, useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import colors from 'Constants/colors';
import { commonActionWithoutApi } from 'Actions';

import Text from 'Widgets/Text';

import './style.scss';

const Toast = (props) => {
  const {
    isSuccess,
    message,
    textClassName,
    removeAfterNumberOfSeconds,
  } = props;

  const dispatch = useDispatch();

  const toastData = useSelector(
    (state) => state[endpointWithoutApi.toast.toastStatus.reducerName]
  );

  const { isToastVisible = false, toastMessage = '', toastStatus } =
    toastData?.items?.data || {};

  useEffect(() => {
    if (removeAfterNumberOfSeconds) {
      setTimeout(() => {
        setShowToast(false);
      }, removeAfterNumberOfSeconds * 1000);
    }
  }, []);

  const handleCloseToastClick = () => {
    dispatch(
      commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
        isToastVisible: false,
      })
    );
  };

  return (
    <Fragment>
      {isToastVisible && (
        <div
          className={`Toast ${
            toastStatus ? 'success' : 'error'
          } d-flex justify-content-between align-items-center box-shadow-secondary`}
        >
          <div className="Toast-container d-flex">
            <div className="d-flex align-items-center">
              {toastStatus ? (
                <CheckCircleOutlineIcon
                  className="Toast-icon"
                  style={{ color: colors.sushi }}
                />
              ) : (
                <HighlightOffIcon
                  className="Toast-icon"
                  style={{ color: colors.red }}
                />
              )}
              <Text
                className={`message font-primary-semibold-14 ${
                  !!textClassName ? textClassName : ''
                }`}
                text={toastMessage}
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
