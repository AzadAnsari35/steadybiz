import React from 'react';
import Popover from '@material-ui/core/Popover';

const SimplePopover = (props) => {
  const {
    handleClose,
    anchorEl,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'center',
    },
    children,
  } = props;

  const showPopover = Boolean(anchorEl);

  return (
    <Popover
      open={showPopover}
      anchorEl={anchorEl}
      onClose={handleClose}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {children}
    </Popover>
  );
};

export default SimplePopover;
