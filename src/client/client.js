import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./containers/layout/index";

const MyApp = (props) => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

ReactDOM.render(<MyApp />, document.getElementById("app"));
