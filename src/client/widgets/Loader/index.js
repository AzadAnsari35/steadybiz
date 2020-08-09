import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import endpointWithoutApi from "Config/endpointWithoutApi";

import { PrimaryLoader, LinearLoader } from "Widgets";
import { getDataFromRedux } from "Helpers/global";


const Loader = () => {
  const loaderStatus = useSelector(state => state[endpointWithoutApi.loader.loaderStatus.reducerName]);

  const loaderData = getDataFromRedux(loaderStatus);

  return (
    <>
      {loaderData.isLoaderVisible &&
        <>
          {loaderData.loaderType === "primary" ?
            <>
              <div className="loader-bg"></div>
              <PrimaryLoader />
            </>
            : loaderData.loaderType === "linearProgress" &&
            <Grid item xs={12}>
              <LinearLoader
                label={loaderData.loaderText}
                style={{
                  top: !!loaderData.top && loaderData.top
                }}
              />
            </Grid>
          }
        </>
      }
    </>
  );
};

export default Loader;
