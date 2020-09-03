import React from 'react';
import Popover from '@material-ui/core/Popover';

const SimplePopover = (props) => {
  const {
    handleClose,
    anchorEl,
    id,
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
      id={id}
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
