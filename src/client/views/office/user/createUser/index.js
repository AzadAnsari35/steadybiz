import React from 'react';
import CreateUserForm from 'Components/Offices/User/CreateUser';
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';

import './style.scss';

const CreateUser = () => {
  let history = useHistory();

  return (
    <div className="ViewProfile">
      <Panel
        id="userProfilePanel"
        title="Create User"
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
            onClick={() => history.push('/office/user/search-user')}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        }
        hidePanelAction={true}
      >
        <CreateUserForm />
      </Panel>
    </div>
  );
};
export default CreateUser;
