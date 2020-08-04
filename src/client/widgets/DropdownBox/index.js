import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";

import colors from "Constants/colors";

import ArrowIcon from "Widgets/Icons/ArrowIcon";

import "./style.scss";

const DropdownBox = props => {
  const { children, isContentVisible = false, placeholder = "Select", onClick } = props;
  const [isOpen, setIsOpen] = useState(isContentVisible);

  useEffect(() => {
    setIsOpen(isContentVisible);
  }, [isContentVisible]);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    onClick(!isOpen);
  };

  DropdownBox.handleClickOutside = () => setIsOpen(false);

  return (
    <div className="DropdownBox d-flex align-items-center">
      <div className="DropdownBox-title d-flex align-items-center justify-content-between" onClick={handleDropdownClick}>
        <div className="font-primary-medium-14">
          {placeholder}
        </div>
        <ArrowIcon size={12} color={colors.black} orientation={90} />
      </div>
      {isOpen &&
        <div className="DropdownBox-content">
          {children}
        </div>
      }
    </div>
  )
};

const clickOutsideConfig = {
  handleClickOutside: () => DropdownBox.handleClickOutside,
};

DropdownBox.prototype = {};

export default onClickOutside(DropdownBox, clickOutsideConfig);
