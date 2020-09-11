import React from 'react';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InfoIcon from '@material-ui/icons/Info';
import HotelIcon from '@material-ui/icons/Hotel';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MailIcon from '@material-ui/icons/Mail';

import SearchBar from 'Components/Flights/SearchBar/index';
import colors from 'Constants/colors';
import { utils } from 'Helpers';

import './style.scss';

const Search = () => {
  return (
    <div className="Search">
      <div className="Search-alert font-primary-regular-12 d-flex align-items-center">
        <InfoIcon className="pr-8" />
        IMPORTANT INFORMATION: Changes in traffic due to the coronavirus
        situation. Check the instructions if you have a booking between 16 March
        2020–31 March 2021.{' '}
        <span
          className="font-primary-medium-12"
          style={{ color: colors.royalBlue }}
        >
          Read Here
        </span>
      </div>
      <div className="Search-banner">
        <div className="layout-wrapper">
          <div className="Search-banner-panel">
            <div className="Search-banner-panel__icon Search-banner-panel__icon-active">
              <AirplanemodeActiveIcon
                style={{
                  fontSize: 32,
                  color: colors.white,
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
            <div className="Search-banner-panel__icon left-136">
              <HotelIcon style={{ fontSize: 32, color: colors.royalBlue }} />
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="Search-recentSearches">
        <div className="layout-wrapper">
          <div className="font-primary-bold-18 mb-20 mt-40">Recent Searches</div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className="Search-recentSearches-single">
                <div className="font-primary-medium-12 pb-8">Return Trip</div>
                <div className="font-primary-semibold-14 pb-8">
                  Thriuvanthpuram
                  <img
                    src={utils.displayImage('two-ways.svg')}
                    className="px-6"
                  />
                  New York
                </div>
                <div className="font-primary-semibold-14 pb-20">
                  Monday, Jun 15 - Friday, Jun 26
                </div>
                <div className="font-primary-regular-12">
                  Economy, 2 Adult, 1 Child, 1 Infant
                </div>
                <div className="Search-recentSearches-single__icon">
                  <AirplanemodeActiveIcon
                    style={{
                      fontSize: 24,
                      color: colors.white,
                      transform: 'rotate(45deg)',
                    }}
                  />
                </div>
                <div className="Search-recentSearches-single__btn font-primary-regular-12">
                  Search
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="Search-recentSearches-single">
                <div className="font-primary-medium-12 pb-8">Return Trip</div>
                <div className="font-primary-semibold-14 pb-8">
                  Thriuvanthpuram
                  <img
                    src={utils.displayImage('two-ways.svg')}
                    className="px-6"
                  />
                  New York
                </div>
                <div className="font-primary-semibold-14 pb-20">
                  Monday, Jun 15 - Friday, Jun 26
                </div>
                <div className="font-primary-regular-12">
                  Economy, 2 Adult, 1 Child, 1 Infant
                </div>

                <div className="Search-recentSearches-single__icon">
                  <AirplanemodeActiveIcon
                    style={{
                      fontSize: 24,
                      color: colors.white,
                      transform: 'rotate(45deg)',
                    }}
                  />
                </div>
                <div className="Search-recentSearches-single__btn font-primary-regular-12">
                  Search
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="Search-recentSearches-single">
                <div className="font-primary-medium-12 pb-8">Return Trip</div>
                <div className="font-primary-semibold-14 pb-8">
                  Thriuvanthpuram
                  <img
                    src={utils.displayImage('two-ways.svg')}
                    className="px-6"
                  />
                  New York
                </div>
                <div className="font-primary-semibold-14 pb-20">
                  Monday, Jun 15 - Friday, Jun 26
                </div>
                <div className="font-primary-regular-12">
                  Economy, 2 Adult, 1 Child, 1 Infant
                </div>

                <div className="Search-recentSearches-single__icon">
                  <AirplanemodeActiveIcon
                    style={{
                      fontSize: 24,
                      color: colors.white,
                      transform: 'rotate(45deg)',
                    }}
                  />
                </div>
                <div className="Search-recentSearches-single__btn font-primary-regular-12">
                  Search
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="Search-deals">
        <div className="layout-wrapper">
          <div className="font-primary-bold-18 mb-20 mt-40">Exculisive Deals</div>
          <div className="font-primary-bold-16 mb-32 pb-8 Search-deals-flights">
            Flights
          </div>
          <div className="d-flex justify-content-between pb-16">
            <div className="d-flex">
              <div className="font-primary-medium-16 ">International Flights</div>
              <div className="font-primary-medium-14 pl-28 Search-deals-from">
                From:
                <span className="Search-deals-from__location">
                  Dubai
                  <KeyboardArrowDownIcon
                    style={{ fontSize: 12, color: colors.royalBlue }}
                  />
                </span>
              </div>
            </div>
            <div className="d-flex">
              <div className="Search-deals-next mr-10">
                <NavigateBeforeIcon style={{ color: colors.white }} />
              </div>
              <div className="Search-deals-prev">
                <NavigateNextIcon style={{ color: colors.white }} />
              </div>
            </div>
          </div>

          <Grid container spacing={2} className="Search-deals-slider">
            <Grid item xs={4}>
              <div className="Search-deals-slider-img">
                <img src={utils.displayImage('amman.png')} />
              </div>
              <div className="Search-deals-slider-single">
                <div className="font-primary-medium-14">Dubai</div>
                <div
                  className="font-primary-medium-14"
                  style={{ color: '#00000073' }}
                >
                  Friday, 18 Dec
                </div>

                <div className="font-primary-medium-14 pt-24">Amman</div>
                <div className="Search-deals-slider-single__price">
                  <div className="font-primary-medium-12">Starting From</div>
                  <div className="font-primary-bold-16 ">AED 1,234</div>
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="Search-deals-slider-img">
                <img src={utils.displayImage('bahrain.png')} />
              </div>
              <div className="Search-deals-slider-single">
                <div className="font-primary-medium-14">Dubai</div>
                <div
                  className="font-primary-medium-14"
                  style={{ color: '#00000073' }}
                >
                  Friday, 18 Dec
                </div>

                <div className="font-primary-medium-14 pt-24">Bahrain</div>
                <div className="Search-deals-slider-single__price">
                  <div className="font-primary-medium-12">Starting From</div>
                  <div className="font-primary-bold-16 ">AED 900</div>
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="Search-deals-slider-img">
                <img src={utils.displayImage('beirut.png')} />
              </div>
              <div className="Search-deals-slider-single">
                <div className="font-primary-medium-14">Dubai</div>
                <div
                  className="font-primary-medium-14"
                  style={{ color: '#00000073' }}
                >
                  Friday, 18 Dec
                </div>

                <div className="font-primary-medium-14 pt-24">Beirut</div>
                <div className="Search-deals-slider-single__price">
                  <div className="font-primary-medium-12">Starting From</div>
                  <div className="font-primary-bold-16 ">AED 1,021</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="Search-newsletter d-flex align-items-center flex-direction-column Search-newsletter-overlay">
        <div className="font-primary-bold-24">Newsletter</div>
        <div className="font-primary-regular-18 pb-48">
          Be the first to know our latest offers &amp; news!
        </div>
        <div className="d-flex">
          <div className="font-primary-medium-18 Search-newsletter-textInput  d-flex align-items-center">
            user@oktravels.com
          </div>
          <div className="Search-newsletter-btn font-primary-semibold-16 d-flex align-items-center">
            SUBSCRIBE
            <MailIcon
              style={{ fontSize: 30, color: colors.white }}
              className="pl-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
