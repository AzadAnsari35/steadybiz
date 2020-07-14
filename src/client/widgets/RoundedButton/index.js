import React from "react";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import "./style.scss";
import colors from "Constants/colors";

const RoundedButton = () => {
  return (
    <div className="RoundedButton d-flex justify-content-center align-items-center cursor-pointer">
      <SwapHorizIcon style={{ color: colors.royalBlue }} />
    </div>
  )
};

export default RoundedButton;
