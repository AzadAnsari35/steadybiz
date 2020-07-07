import React, { Fragment } from "react";
import Router from "App/client/router";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";


const Layout = () => {
  return (
    <Fragment>
           
      <Header /> 
      <Router/>
      <Footer />
    </Fragment>
  );
}

export default Layout;
