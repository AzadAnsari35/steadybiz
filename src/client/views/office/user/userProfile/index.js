import React, { useEffect } from 'react';
import UserProfileForm from 'Components/Offices/User/UserProfile';
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { commonActionUpdate } from 'Actions';
import endpoint from 'Config/endpoint';

import './style.scss';

const UserProfile = () => {
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const mode = location.pathname;

  const handleClose = () => {
    if (mode === routes.office.manageUserProfile) {
      history.push(routes.flight.search);
    } else {
      history.push(routes.office.searchOfficeUser);
      dispatch(commonActionUpdate(endpoint.office.searchUser, null));
    }
  };

  return (
    <div className="ViewProfile">
      <Panel
        id="userProfilePanel"
        title={`${
          mode === routes.office.viewOfficeUser
            ? 'View User'
            : mode === routes.office.manageUserProfile
            ? 'Manage Profile'
            : 'Modify User'
        }`}
        panelHeaderIcon={
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        }
        panelIconMarginLeft={'14'}
        showHeaderContent
        headerContent={
          <div className="font-primary-medium-22">User Profile</div>
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
        <UserProfileForm mode={mode} />
      </Panel>
    </div>
  );
};
export default UserProfile;
