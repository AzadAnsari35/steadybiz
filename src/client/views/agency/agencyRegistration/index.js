import React, { useState } from "react";
import { BoxRadio, Panel } from "Widgets";
import OfficeRegistrationForm from "Components/Offices/Office/OfficeRegistration";
import OfficeInvitationForm from "Components/Offices/Office/OfficeInvitation";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import colors from "Constants/colors";
import "./style.scss";

const INVITE = "Invite";
const REGISTRATION = "Registration";

const AgencyRegistration = () => {
  const [selectedTab, setSelectedTab] = useState(REGISTRATION);

  const handleTab = (e) => {
    let value = e.target.value;
    setSelectedTab(value);
  };

  return (
    <div className="AgencyRegister">
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

      <Grid item xs={12} md={12} lg={12}>
        {selectedTab === REGISTRATION ? (
          <Panel
            id="flightDetailsPanel"
            title="Agency Registration"
            panelHeaderIcon={
              <PeopleIcon style={{ fontSize: 30, color: colors.white }} />
            }
            panelIconMarginLeft={"14"}
            showHeaderContent
            headerContent={
              <div className="font-primary-medium-22">Registration Details</div>
            }
            noPadding
            addExtraMargin
            expand={true}
            alwaysOpen={true}
          >
            <OfficeRegistrationForm />
          </Panel>
        ) : (
          <Panel
            id="flightDetailsPanel"
            title="Agency Invitation"
            panelHeaderIcon={
              <PeopleIcon style={{ fontSize: 30, color: "#ffffff" }} />
            }
            panelIconMarginLeft={"14"}
            showHeaderContent
            headerContent={
              <div className="font-primary-medium-22">Invite Details</div>
            }
            noPadding
            addExtraMargin
            expand={true}
            alwaysOpen={true}
          >
            <OfficeInvitationForm />
          </Panel>
        )}
      </Grid>
    </div>
  );
};

export default AgencyRegistration;
