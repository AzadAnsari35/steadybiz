import React from "react";
import Popover from "@material-ui/core/Popover";

const SimplePopover = (props) => {
  const { handleClose, anchorEl, children } = props;

  const showPopover = Boolean(anchorEl);

  return (
    <Popover
      open={showPopover}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
    </Popover>
  );
};

export default SimplePopover;
