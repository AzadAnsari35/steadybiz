import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import endpointWithoutApi from "Config/endpointWithoutApi";

import { PrimaryLoader, LinearLoader } from "Widgets";


const Loader = () => {
  const loaderStatus = useSelector(state => state[endpointWithoutApi.loader.loaderStatus.reducerName]);

  return (
    <>
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
    </>
  );
};

export default Loader;
