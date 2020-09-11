import React, { useState } from 'react';
import SignInForm from 'Components/Users/Agent/SignIn';
import Grid from '@material-ui/core/Grid';
import Text from 'Widgets/Text';
import { utils } from 'Helpers';
import Carousel from 'Components/Home/Carousel';

import './style.scss';

const Home = () => {
  return (
    <div className="Home">
      <div>
        <Carousel />
      </div>

      <div className="Home-features">
        <div className="layout-wrapper">
          <div className="Home-features-title font-primary-semibold-20">
            B2B Travel Services &minus; Technology approach for best travel
            content &amp; fares to book &amp; earn…
          </div>
          <Grid container spacing={8}>
            <Grid item xs={3} className="Home-features-single">
              <div className="d-flex align-items-end py-32 Home-features-single__icon">
                <img src={utils.displayImage('feature1.svg')} />
              </div>
              <Text
                showLeftBorder
                text="TRAVEL SERVICES"
                className="Home-features-single__title font-primary-medium-20 mb-18"
              />
              <span className="Home-features-single__para font-primary-medium-18_1">
                It offers multiple travel services, connected with multiple
                providers including GDS and Airlines, offering wide range of
                content at best possible prices including best deals…
              </span>
            </Grid>

            <Grid item xs={3} className="Home-features-single">
              <div className="d-flex align-items-end py-32 Home-features-single__icon">
                <img src={utils.displayImage('feature2.svg')} />
              </div>

              <Text
                showLeftBorder
                text="SCALING DISTRIBUTION"
                className="Home-features-single__title font-primary-medium-20 mb-18"
              />
              <span className="Home-features-single__para font-primary-medium-18_1">
                It offers agencies to create multiple level of sub agencies to
                increase their reach of distribution and in turn increasing sales
                and earnings from increased bookings…
              </span>
            </Grid>

            <Grid item xs={3} className="Home-features-single">
              <div className="d-flex align-items-end py-32 Home-features-single__icon">
                <img src={utils.displayImage('feature3.svg')} />
              </div>
              <Text
                showLeftBorder
                text="AUTOMATED TRAVEL PROCESSES"
                className="Home-features-single__title font-primary-medium-20 mb-18"
              />
              <span className="Home-features-single__para font-primary-medium-18_1">
                It offers the complete automation of all travel processes
                including booking, cancellation, rebooking, sub agents, branches,
                users, security features and many others…
              </span>
            </Grid>

            <Grid item xs={3} className="Home-features-single">
              <div className="d-flex align-items-end py-32 Home-features-single__icon">
                <img src={utils.displayImage('feature4.svg')} />
              </div>
              <Text
                showLeftBorder
                text="MULTIPLE CURRENCIES"
                className="Home-features-single__title font-primary-medium-20 mb-18"
              />
              <span className="Home-features-single__para font-primary-medium-18_1">
                It offers transactions and deposits to be done in multiple
                currencies with multiple forms of payments including credit limit,
                credit card, cash, wallets, and others…
              </span>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
