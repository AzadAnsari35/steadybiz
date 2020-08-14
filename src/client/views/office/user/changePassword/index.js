import React from 'react';
import ChangePasswordForm from 'Components/Offices/User/ChangePassword';
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';

import './style.scss';

const ChangePassword = () => {
  let history = useHistory();

  return (
    <div className="ViewProfile">
      <Panel
        id="userProfilePanel"
        title="Change Password"
        panelHeaderIcon={
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        }
        panelIconMarginLeft={'14'}
        showHeaderContent
        headerContent={
          <div className="font-primary-medium-22">Change Password</div>
        }
        noPadding
        addExtraMargin
        expand={true}
        headerActionContent={
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.flight.search)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        }
        hidePanelAction={true}
      >
        <ChangePasswordForm />
      </Panel>
    </div>
  );
};
export default ChangePassword;
