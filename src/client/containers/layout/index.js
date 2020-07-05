import React, { Fragment } from "react";

import Header from "./../../components/UserControls/Header";
import Footer from "./../../components/UserControls/Footer";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      {/* <div>Content based on Route goes here</div> */}
      {React.cloneElement(children)}
      <Footer />
    </Fragment>
  );
}

export default Layout;
