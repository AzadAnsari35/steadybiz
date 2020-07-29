import React, { Fragment } from "react";
import Routes from "App/client/Routes";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";

import { Loader } from "Widgets";

import "./../../styles/global.scss";

const Layout = () => {
  return (
    <div className="position-relative">
      <Loader />
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
