import React, { Fragment } from "react";
import Routers from "App/client/routers";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";
import "../../styles/global.scss";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div className="route-wrapper">
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
