import React, { useEffect } from 'react';
import OfficeProfileForm from 'Components/Offices/Office/OfficeProfile';
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';
import { utils } from 'Helpers';

import './style.scss';

const OfficeProfile = () => {
  const location = useLocation();
  let history = useHistory();

  const mode = location.pathname;

  return (
    <div className="OfficeProfile">
      <Panel
        id="officeProfilePanel"
        title={`${
          utils.stringComparison(mode, routes.office.viewOffice)
            ? 'View Office'
            : utils.stringComparison(mode, routes.office.updateOffice)
            ? 'Modify Office'
            : 'Create Office'
        }`}
        panelHeaderIcon={
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        }
        panelIconMarginLeft={'14'}
        showHeaderContent
        headerContent={
          <div className="font-primary-medium-22">Office Profile</div>
        }
        noPadding
        addExtraMargin
        expand={true}
        headerActionContent={
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.office.searchOffice)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        }
        hidePanelAction={true}
      >
        <OfficeProfileForm mode={mode} />
      </Panel>
    </div>
  );
};
export default OfficeProfile;
