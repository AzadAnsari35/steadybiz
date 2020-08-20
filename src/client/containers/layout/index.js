import React, { Fragment, useEffect } from 'react';
import Routes from 'Client/routes';
import Header from 'Components/UserControls/Header';
import Footer from 'Components/UserControls/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonAction,
  commonActionWithoutApi,
  commonActionUpdate,
} from 'Actions/';
import { Loader, Toast } from 'Widgets';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { useLocation } from 'react-router-dom';

import './../../styles/global.scss';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
        isToastVisible: false,
      })
    );
  }, [location]);

  return (
    <div className="position-relative">
      <Loader />
      <Toast />
      <Fragment>
        <Header />
        <div className="route-wrapper">
          <Routes />
        </div>
        <Footer />
      </Fragment>
    </div>
  );
};

export default Layout;
