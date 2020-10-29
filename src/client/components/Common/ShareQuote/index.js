import Grid from '@material-ui/core/Grid';
import colors from 'Constants/colors';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ContactDetailsStatic from 'Components/Common/ContactDetailsStatic';
import { Button, Panel, Text, TextInput } from 'Widgets';
import SearchAirplaneIcon from 'Widgets/Icons/SearchAirplaneIcon';
import FlightDetails from '../../Flights/Availability/FlightDetails';
import FareDetailsCard from '../FareDetailsCard';
import './style.scss';

const handleClose = () => {};

const handleClick = () => {};

const ShareQuote = (props) => {
  const { outboundItinerary } = props;
  const location = useLocation();

  const path = location.pathname.toUpperCase();

  return (
    <div className="ShareQuote">
      <div className="ShareQuote-head">
        <div className="horizontal-grey-divider"></div>
        <form>
          <Text
            showLeftBorder={true}
            text={`Share Quote`}
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput
                name="EmailID"
                useReactHookForm={false}
                id="EmailID"
                label="Email ID(S):"
                placeholder="aa@oktravels.com, bb@oktravels.com (e.g.)"
              />
            </Grid>
            <Grid
              item
              xs={12}
              className="d-flex justify-content-between align-items-center pt-32"
            >
              <div className="font-primary-italic-14">
                <b>Note:</b> Please use "," for multiple Email ID(s).
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              className="d-flex justify-content-between align-items-center pt-32"
            >
              <div className="font-primary-italic-14">
                <label>
                  <input type="checkbox" /> Include Fare
                </label>
              </div>
              <div className="d-flex justify-content-end ">
                <Button type="submit" text="Share" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="ShareQuote-table">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Panel
              id="flightDetailsPanel"
              title="flight details"
              panelHeaderIcon={
                <SearchAirplaneIcon size={30} color={colors.white} />
              }
              panelIconMarginLeft={'14'}
              showHeaderContent
              // headerContent={flightSummary()}
              expand={true}
              noPadding
              addExtraMargin
              alwaysOpen={true}
              // onClick={handlePanelToggle}
            >
              <FlightDetails itinerary={outboundItinerary} />
            </Panel>
          </Grid>
          <Grid item xs={4}>
            <FareDetailsCard outboundItinerary={outboundItinerary} />
            <ContactDetailsStatic
              contactDetails={{
                agencyName: 'Ok Travels',
                countryCode: '+91',
                phone: '9891355406',
                email: 'info@oktravels.com',
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ShareQuote;
