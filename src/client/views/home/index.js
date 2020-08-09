import React, { useState } from 'react';
import SignInForm from 'Components/Users/Agent/SignIn';
import Grid from '@material-ui/core/Grid';
import Text from 'Widgets/Text';
import { utils } from 'Helpers';
import Carousel from 'Components/Home/Carousel';

import './style.scss';

const Home = () => {
  return (
    <div className="Home ">
      <div>
        <Carousel />
      </div>

      <div className="Home-features">
        <div className="Home-features-title font-primary-semibold-35">
          Technology approach for best travel content &amp; fares to book and
          earn...
        </div>
        <Grid container spacing={8}>
          <Grid item xs={3} className="Home-features-single">
            <img src={utils.displayImage('feature1.png')} className="py-44" />
            <Text
              showLeftBorder
              text="CLOSE TO THE METAL"
              className="font-primary-medium-20 mb-22"
            />
            <span className="Home-features-single__para  font-primary-medium-18_1">
              From direct integrations with card networks and banks to checkout
              flows in the browser, we operate on and optimize at every level of
              the financial stack.
            </span>
          </Grid>

          <Grid item xs={3} className="Home-features-single">
            <img src={utils.displayImage('feature2.png')} className="py-44" />
            <Text
              showLeftBorder
              text="FASTEST-IMPROVING PLATFORM"
              className="font-primary-medium-20 mb-22"
            />
            <span className="Home-features-single__para  font-primary-medium-18_1">
              We release hundreds of features and improvements each year to help
              you stay ahead of industry shifts. (On average, we deploy our
              production API 16x per day.)
            </span>
          </Grid>

          <Grid item xs={3} className="Home-features-single">
            <img src={utils.displayImage('feature3.png')} className="py-44" />
            <Text
              showLeftBorder
              text="BATTLE-TESTED RELIABILITY"
              className="font-primary-medium-20 mb-22"
            />
            <span className="Home-features-single__para  font-primary-medium-18_1">
              Our systems operate with 99.9%+ uptime and are highly scalable and
              redundant. Stripe is certified to the highest compliance
              standards.
            </span>
          </Grid>

          <Grid item xs={3} className="Home-features-single">
            <img src={utils.displayImage('feature4.png')} className="py-44" />
            <Text
              showLeftBorder
              text="INTELLIGENT OPTIMIZATIONS"
              className="font-primary-medium-20 mb-22"
            />
            <span className="Home-features-single__para  font-primary-medium-18_1">
              Our machine learning models train on billions of data points and
              help increase revenue across conversion, fraud, revenue recovery,
              and more.
            </span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
