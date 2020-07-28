import React, { Fragment, useEffect } from 'react';
import Routes from 'App/client/Routes';
import Header from 'Components/UserControls/Header';
import Footer from 'Components/UserControls/Footer';
import { isLogin } from 'Helpers/utils';
import '../../styles/global.scss';

const Layout = () => {
  let isAuthenticated = false;

  useEffect(() => {
    isAuthenticated = isLogin();
  }, []);

  return (
    <Fragment>
      <Header isAuthenticated={isAuthenticated} />
      <div className="route-wrapper">
        <Routes />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
