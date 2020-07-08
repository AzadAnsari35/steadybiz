import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import "./style.scss";
import FlightIcon from "@material-ui/icons/Flight";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from "../../../widgets/Avatar";
import SimplePopover from "Widgets/Popover";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SideDrawer from "Widgets/SideDrawer";

const isAuthenticated = true;

const Header = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              style={{ color: "#fff", transform: "rotate(90deg)" }}
            />
          </div>
          <div className="font-primary-medium-30">OK Travel</div>
        </div>

        {isAuthenticated ? (
          <div
            className="Header-right-loggedin d-flex align-items-center cursor-pointer"
            onClick={handleClick}
          >
            <Avatar>OT</Avatar>
            <div className="font-primary-semibold-20 pl-16">OK Travels </div>
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
          <div className="HeaderPopover br-6">
            <div className="HeaderPopover-head">
              <Avatar classes="HeaderPopover-head-avatar font-primary-medium-36">
                OT
              </Avatar>
              <div className="HeaderPopover-head__detail pl-24 d-flex flex-direction-column">
                <span className=" HeaderPopover-head__detail-name font-primary-medium-24">
                  Ok Travels
                </span>
                <span className="HeaderPopover-head__detail-email font-primary-semibold-16">
                  oktravels@yopmail.com
                </span>
              </div>
            </div>
            <div className="HeaderPopover-body font-primary-semibold-18 p-12">
              <div className="HeaderPopover-body-creditdetails  pb-4">
                <span name="office-name">Steady Biz</span>{" "}
                <span name="office-id">[DXBOKT0000]</span>
              </div>
              <div className="HeaderPopover-body-creditlimit">
                <span>Credit Limit Balance :</span> <span>$</span>{" "}
                <span>2000</span>
              </div>
            </div>

            <div className="horizontal-grey-divider"></div>

            <div className="HeaderPopover-foot font-primary-medium-18 d-flex flex-direction-column cursor-pointer my-6">
              <Link className="pb-12" to="#">
                Manage Profile
              </Link>
              <Link to="#">Change Password</Link>
              <Link to="#">Signout</Link>
            </div>
          </div>
        </SimplePopover>
      </div>
      <SideDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
};

export default Header;
