import React, { useEffect } from 'react';
import { Panel, IconWithBackground } from 'Widgets';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Constants/routes';
import CloseIcon from '@material-ui/icons/Close';
import { utils } from 'Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { commonActionUpdate } from 'Actions';
import CreatePccForm from 'Components/Config/CreatePcc';
import endpoint from 'Config/endpoint';

import './style.scss';

const CreatePcc = () => {
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const mode = location.pathname;

  const handleClose = () => {
    history.push(routes.master.searchMultiPcc);
    // dispatch(commonActionUpdate(endpoint.office.searchMultiPcc, null));
  };

  return (
    <div className="CreatePcc">
      <Panel
        id="CreatePccPanel"
        title="MANAGE MULTI PCC"
        panelHeaderIcon={
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        }
        panelIconMarginLeft={'14'}
        showHeaderContent
        headerContent={
          <div className="font-primary-medium-22">
            {utils.stringComparison(mode, routes.master.viewMultiPcc)
              ? 'View PCC'
              : utils.stringComparison(mode, routes.master.modifyMultiPcc)
              ? 'Modify PCC'
              : 'Create PCC'}
          </div>
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
        <CreatePccForm path={mode} />
      </Panel>
    </div>
  );
};
export default CreatePcc;
