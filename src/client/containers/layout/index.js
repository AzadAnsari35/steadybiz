import React, { Fragment } from "react";
import Routes from "App/client/Routes";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";
import "../../styles/global.scss";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div className="route-wrapper">
        <Routes />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
