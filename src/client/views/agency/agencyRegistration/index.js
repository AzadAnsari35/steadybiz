import React, { useState, lazy, Suspense } from 'react';
import { BoxRadio, Panel, LinearLoaderSecondary } from 'Widgets';
import { useLocation } from 'react-router-dom';
// import OfficeRegistrationForm from "Components/Offices/Office/OfficeRegistration";
// import OfficeInvitationForm from "Components/Offices/Office/OfficeInvitation";
import AgencyRegistrationForm from 'Components/Agency/AgencyRegistration';
//import AgencyInvitationForm from 'Components/Agency/AgencyInvitation';
import { utils } from 'Helpers';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import colors from 'Constants/colors';
import './style.scss';
import useDropDown from 'Hooks/useDropDown';
import { commonConstant } from 'Constants/';
import endpoint from 'Config/endpoint';
import routes from 'Constants/routes';
const INVITE = 'Invite';
const REGISTRATION = 'Registration';
const AgencyInvitationForm = lazy(() =>
  import('Components/Agency/AgencyInvitation')
);
const AgencyRegistration = () => {
  const [selectedTab, setSelectedTab] = useState(REGISTRATION);
  const countriesList = useDropDown(
    endpoint.master.countries,
    commonConstant.dropDownParam.countries,
    endpoint.master.countries.reducerName
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    commonConstant.dropDownParam.countriesDialCode,
    endpoint.master.countries.reducerName,
    false,
    null,
    false
  );
  const location = useLocation();
  const isB2C = utils.stringComparison(
    location.pathname,
    routes.agency.publicRegistration
  );
  // const objectStatusesList = useDropDown(
  //   endpoint.master.objectStatuses,
  //   commonConstant.dropDownParam.objectStatuses,
  //   'masterObjectStatuses'
  // );

  const handleTab = (e) => {
    let value = e.target.value;
    setSelectedTab(value);
  };

  return (
    <div className="AgencyRegistration">
      {!isB2C && (
        <div className="d-flex align-items-center  pb-32">
          <BoxRadio
            handleClick={handleTab}
            label={INVITE}
            name="registration-type"
            value={INVITE}
            checked={selectedTab === INVITE}
            className="mr-16"
          />

          <BoxRadio
            handleClick={handleTab}
            label={REGISTRATION}
            name="registration-type"
            value={REGISTRATION}
            checked={selectedTab === REGISTRATION}
          />
        </div>
      )}

      <Grid item xs={12} md={12} lg={12}>
        {selectedTab === REGISTRATION ? (
          <Panel
            id="flightDetailsPanel"
            title="Agency Registration"
            panelHeaderIcon={
              <PeopleIcon style={{ fontSize: 30, color: colors.white }} />
            }
            panelIconMarginLeft={'14'}
            showHeaderContent
            headerContent={
              <div className="font-primary-medium-22">Registration Details</div>
            }
            noPadding
            addExtraMargin
            expand={true}
            alwaysOpen={true}
          >
            <AgencyRegistrationForm
              countriesList={countriesList}
              countriesDialCodeList={countriesDialCodeList}
              // objectStatusesList={objectStatusesList}
            />
          </Panel>
        ) : (
          <Panel
            id="flightDetailsPanel"
            title="Agency Invitation"
            panelHeaderIcon={
              <PeopleIcon style={{ fontSize: 30, color: '#ffffff' }} />
            }
            panelIconMarginLeft={'14'}
            showHeaderContent
            headerContent={
              <div className="font-primary-medium-22">Invite Details</div>
            }
            noPadding
            addExtraMargin
            expand={true}
            alwaysOpen={true}
          >
            <Suspense fallback={LinearLoaderSecondary}>
              <AgencyInvitationForm
                countriesDialCodeList={countriesDialCodeList}
              />
            </Suspense>
          </Panel>
        )}
      </Grid>
    </div>
  );
};

export default AgencyRegistration;
