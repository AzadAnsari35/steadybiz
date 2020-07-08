import React, { Fragment } from "react";
import Router from "App/client/router";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";
import "../../styles/global.scss";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div className="route-wrapper">
        <Router />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
