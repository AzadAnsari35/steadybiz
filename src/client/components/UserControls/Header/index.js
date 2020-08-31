import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import FlightIcon from '@material-ui/icons/Flight';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SimplePopover from 'Widgets/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SideDrawer from 'Widgets/SideDrawer';
import UserCreditLimit from 'Components/UserControls/UserCreditLimit';
import Avatar from 'Widgets/Avatar';
import colors from 'Constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'Actions/index';
import endpoint from 'Config/endpoint';
import {
  getItemFromStorage,
  checkStatus,
  getShortName,
  isLogin,
} from 'Helpers/utils';

import { LinearLoaderSecondary } from 'Widgets/';

import './style.scss';

const Header = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const usersSignIn = useSelector((state) => state.usersSignIn?.items?.data);
  console.log('usersSignIn', usersSignIn);

  const creditLimitDetails = useSelector(
    (state) => state.getInstantCreditLimit?.items?.data?.data
  );

  let isAuthenticated = !!usersSignIn;

  const token = getItemFromStorage('userToken');

  const { userDto = {} } = usersSignIn || {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token && !!usersSignIn?.userDto?.officeId) {
      console.log(
        ' usersSignIn.userDto.officeId',
        usersSignIn.userDto.officeId
      );
      try {
        dispatch(
          commonAction(endpoint.creditLimit.getInstantCreditlimit, {
            ofid: usersSignIn.userDto.officeId,
          })
        );
      } catch (err) {
        console.log('err', err);
      }
    }
  }, [token || usersSignIn]);

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
          <div className="font-primary-medium-22">OK Travels</div>
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
              {userDto.firstName} {userDto.lastName}
            </div>
            <KeyboardArrowDownIcon />
          </div>
        ) : (
          <div className="Header-right d-flex">
            <div className="d-flex align-items-center ">
              <CallIcon style={{ fontSize: 20 }} />
              <span className="font-primary-medium-16 ml-16">
                +971 25575800
              </span>
            </div>
            <div className="d-flex align-items-center pl-40">
              <MailOutlineIcon style={{ fontSize: 20 }} />
              <span className="font-primary-medium-16 ml-16">
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
            handleClose={handleClose}
            setShowDrawer={setShowDrawer}
          />
        </SimplePopover>
        {/* <LinearLoaderSecondary /> */}
      </div>
      {isAuthenticated && (
        <SideDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      )}
    </>
  );
};

export default Header;
