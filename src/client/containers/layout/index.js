import React, { Fragment } from "react";
import Routers from "App/client/routers";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";


const Layout = () => {
  return (
    <Fragment>
           
      <Header /> 
      <Routers/>
      <Footer />
    </Fragment>
  );
}

export default Layout;
