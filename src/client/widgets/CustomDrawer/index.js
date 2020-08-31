import React from "react";
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import colors from "Constants/colors";

import { IconWithBackground, Text } from "Widgets/";

import "./style.scss";

const CustomDrawer = props => {
  const { children, direction = "right", showDrawer, title, setShowDrawer, width } = props;

  return (
    <Drawer
      anchor={direction}
      open={showDrawer}
      variant="persistent"
      classes={{ paper: 'drawer' }}
    >
      <div className="CustomDrawer" style={{ width }}>
        <div className="CustomDrawer-header d-flex justify-content-between align-items-center">
          <Text className="CustomDrawer-title font-primary-semibold-24" text={title} />
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={setShowDrawer}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        {children}
      </div>
    </Drawer>
  )
};

export default CustomDrawer;
