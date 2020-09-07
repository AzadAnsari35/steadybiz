import React, { useEffect } from 'react';
import AgencyProfileForm from 'Components/Agency/AgencyProfile'
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';
import { utils } from 'Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { commonActionUpdate } from 'Actions';
import endpoint from 'Config/endpoint';

import './style.scss';

const AgencyProfile = () => {
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const mode = location.pathname;

  const handleClose = () => {
    history.push(routes.agency.searchAgency);
    dispatch(commonActionUpdate(endpoint.agency.searchAgency, null));
  };

  return (
    <div className="AgencyProfile">
      <Panel
        id="AgencyProfilePanel"
        title={`${
          utils.stringComparison(mode, routes.agency.viewAgency)
            ? 'View Agency'
            : utils.stringComparison(mode, routes.agency.updateAgency)
            ? 'Modify Agency'
            : 'Create Agency'
        }`}
        panelHeaderIcon={
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        }
        panelIconMarginLeft={'14'}
        showHeaderContent
        headerContent={
          <div className="font-primary-medium-22">Agency Profile</div>
        }
        noPadding
        addExtraMargin
        expand={true}
        headerActionContent={
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => handleClose()}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        }
        hidePanelAction={true}
      >
        <AgencyProfileForm mode={mode} />
      </Panel>
    </div>
  );
};
export default AgencyProfile;
