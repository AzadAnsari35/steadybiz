import React from "react";
import SignInForm from "Components/Users/Agent/SignIn";

import "./style.scss";

const Home = () => {
  return (
    <div className="Home d-flex align-items-center justify-content-center">
      <div className="Home-container d-flex justify-content-between">
        <div className="Home-container-left d-flex flex-direction-column align-items-center">
          <div className="font-primary-medium-42 pb-24 ">
            OK Travel &amp; Tourism
          </div>

          <div className="font-primary-medium-30 pb-24 ">
            Leading B2B travel portal
          </div>

          <div className="font-primary-regular-22 line-height-36">
            OK Travel &amp; Tourism is UAE's largest B2B travel portal. OK
            Travel is providing Global B2B booking system powering global travel
            solution to travel partners to serve their customers efficiently,
            with the right pricing and inventory.
          </div>
        </div>
        <div className="Home-container-right">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
