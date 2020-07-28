import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import FlightIcon from '@material-ui/icons/Flight';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import SimplePopover from 'Widgets/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SideDrawer from 'Widgets/SideDrawer';
import UserCreditLimit from 'Components/UserControls/UserCreditLimit';
import Avatar from 'Widgets/Avatar';
import colors from 'Constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'Actions/index';
import endpoint from 'Config/endpoint';
import { getItemFromStorage, checkStatus, getShortName } from 'Helpers/utils';

import './style.scss';

const Header = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const usersSignIn = useSelector((state) => state.usersSignIn?.items);

  const creditLimitDetails = useSelector(
    (state) => state.getInstantCreditLimit?.items?.data?.data
  );

  let isAuthenticated = checkStatus(usersSignIn);

  const { data: { userDto = {} } = {} } = usersSignIn || {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let ofid = getItemFromStorage('officeId');

  useEffect(() => {
    try {
      dispatch(
        commonAction(endpoint.creditLimit.getInstantCreditlimit, { ofid })
      );
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  return (
    <>
      <div className="Header d-flex justify-content-between align-items-center">
        <div className="Header-left d-flex align-items-center">
          {isAuthenticated ? (
            <div
              className="Header-left__icon pr-36"
              onClick={() => setShowDrawer(!showDrawer)}
            >
              <MenuIcon fontSize="large" />
            </div>
          ) : null}
          <div className="Header-left__logo">
            <FlightIcon
              fontSize="large"
              style={{ color: colors.white, transform: 'rotate(90deg)' }}
            />
          </div>
          <div className="font-primary-medium-30">OK Travels</div>
        </div>

        {isAuthenticated ? (
          <div
            className="Header-right__loggedin d-flex align-items-center cursor-pointer"
            onClick={handleClick}
          >
            <Avatar>
              {getShortName(`${userDto.firstName} ${userDto.lastName}`)}
            </Avatar>
            <div className="font-primary-semibold-20 pl-16">
              {' '}
              {userDto.firstName} {userDto.lastName}
            </div>
            <KeyboardArrowDownIcon />
          </div>
        ) : (
          <div className="Header-right ">
            <div className="d-flex align-items-center pb-24">
              <CallIcon fontSize="large" />
              <span className="font-primary-medium-22 ml-28">
                +971 25575800
              </span>
            </div>
            <div className="d-flex align-items-center ">
              <MailIcon fontSize="large" />
              <span className="font-primary-medium-22 ml-28">
                oktravels.mussafah@gmail.com
              </span>
            </div>
          </div>
        )}
        <SimplePopover handleClose={handleClose} anchorEl={anchorEl}>
          <UserCreditLimit
            creditLimitDetails={creditLimitDetails}
            officeDto={userDto?.officeDto}
            fullName={`${userDto.firstName} ${userDto.lastName}`}
          />
        </SimplePopover>
      </div>
      <SideDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
};

export default Header;
