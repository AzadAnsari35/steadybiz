import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Routes from "App/client/Routes";
import Header from "Components/UserControls/Header";
import Footer from "Components/UserControls/Footer";

import { PrimaryLoader, LinearLoader } from "Widgets";

import "../../styles/global.scss";

const Layout = () => {
  const loaderStatus = useSelector((state) => state.loaderStatus);

  return (
    <div className="position-relative">
      {loaderStatus.items && loaderStatus.items.data.loaderType === "primary" ?
        <>
          <div className={`${loaderStatus.items.data.isLoaderVisible ? "loader-bg": ""}`}></div>
          {loaderStatus.items.data.isLoaderVisible && <PrimaryLoader />}
        </>
        : loaderStatus.items && loaderStatus.items.data.loaderType === "linearProgress" &&
          <Grid item xs={12}>
            <LinearLoader
              label={loaderStatus.items.data.loaderText}
              style={{
                top: !!loaderStatus.items.data.top && loaderStatus.items.data.top
              }}
            />
          </Grid>
      }
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
