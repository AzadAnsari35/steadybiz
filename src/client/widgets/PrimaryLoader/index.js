import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./style.scss";

const PrimaryLoader = () => {
  return (
    <div className="PrimaryLoader">
      <CircularProgress />
    </div>
  );
};

export default PrimaryLoader;