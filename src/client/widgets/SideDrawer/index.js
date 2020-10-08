import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { commonActionUpdate } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { setItemToStorage, returnUserType } from 'Helpers/utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ConstructIcon } from 'Widgets';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import endpointWithoutApi from 'Config/endpointWithoutApi';

import './styles.scss';

const SideDrawer = ({ showDrawer, setShowDrawer }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [showFlight, setShowFlight] = React.useState(false);
  const [showSubagency, setShowSubagency] = React.useState(false);
  [[]];
  const [showOffice, setShowOffice] = React.useState(false);

  const [showReport, setShowReport] = React.useState(false);
  const [showConfig, setShowConfig] = React.useState(false);
  const [showSetting, setShowSetting] = React.useState(false);
  const usersSignIn = useSelector(
    (state) => state[endpoint.user.login.reducerName]?.items?.data
  );
  const {
    isAgency,
    isAgencyBranch,
    isSubAgency,
    isSubAgencyBranch,
  } = returnUserType(usersSignIn);
  const drawerData = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon style={{ fontSize: 30 }} />,
      link: '#',
    },

    {
      text: 'Flight',
      icon: <FlightIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowFlight(!showFlight),
      show: showFlight,
      subList: [
        {
          text: 'Flight Search',
          isHide: false,
          link: routes.flight.search,
          clickFunc: () => {
            dispatch(
              commonActionUpdate(
                endpointWithoutApi.flights.flightSearchInput,
                null
              )
            );
          },
        },

        {
          text: 'Search Order',
          link: routes.transaction.searchOrder,
          isHide: false,
          clickFunc: () => {
            dispatch(commonActionUpdate(endpoint.orders.searchOrders, null));
          },
        },
      ],
    },
    {
      text: 'Agency',
      icon: <PersonAddIcon style={{ transform: 'scaleX(-1)', fontSize: 30 }} />,
      clickFunc: () => setShowSubagency(!showSubagency),
      show: showSubagency,
      subList: [
        {
          text: 'Registration',
          link: routes.agency.registration,
          isHide: isAgencyBranch || isSubAgencyBranch,
        },
        {
          text: 'Manage Agency',
          link: routes.agency.searchAgency,
          isHide: isAgencyBranch || isSubAgencyBranch,
          clickFunc: () => {
            dispatch(commonActionUpdate(endpoint.agency.searchAgency, null));
          },
        },
        {
          text: 'Agency Group',
          link: routes.agency.searchAgencyGroup,
          isHide: isAgency || isAgencyBranch || isSubAgencyBranch,
        },

        // {
        //   text: 'Profile & Credit Limit',
        //   link: '/agency/subAgent',
        // },
        {
          text: 'Agency Deals',
          link: routes.agency.searchDeals,
          isHide: isAgencyBranch || isSubAgencyBranch,
        },

        {
          text: 'Manage Invoice',
          link: routes.agency.searchInvoice,
          isHide: isAgencyBranch || isSubAgencyBranch,
        },
        // {
        //   text: 'Markup & Discount',
        //   link: '#',
        // },
        // {
        //   text: 'Productivity Group',
        //   link: '#',
        // },
        // {
        //   text: 'Invoice Details',
        //   link: '#',
        // },
        // {
        //   text: 'Account Statement',
        //   link: '#',
        // },
      ],
    },

    {
      text: 'Office',
      icon: <ApartmentIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowOffice(!showOffice),
      show: showOffice,
      subList: [
        {
          text: 'Manage Office',
          link: routes.office.searchOffice,
          isHide: false,
          clickFunc: () => {
            dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
          },
        },
        {
          text: 'Manage User',
          link: routes.office.searchOfficeUser,
          isHide: false,
          clickFunc: () => {
            setItemToStorage('selectedOffice', '');
            setItemToStorage('selectedAgency', '');
            dispatch(commonActionUpdate(endpoint.office.searchUser, null));
            dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
            dispatch(commonActionUpdate(endpoint.agency.searchAgency, null));
          },
        },
        {
          text: 'Security Group',
          link: routes.office.searchSecurityGroup,
          isHide: false,
          clickFunc: () => {
            dispatch(
              commonActionUpdate(endpoint.office.searchSecurityGroup, null)
            );
          },
        },
      ],
    },

    {
      text: 'Reports',
      icon: <AssignmentIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowReport(!showReport),
      show: showReport,
      subList: [
        {
          text: 'Booking Report',
          link: routes.reports.bookingReport,
          isHide: false,
        },
        {
          text: 'Sales Report',
          link: routes.reports.totalSalesReport,
          isHide: false,
        },
        {
          text: 'Office Sales Report',
          link: routes.reports.officeSalesReport,
          isHide: false,
        },
        {
          text: 'Deposit Received Report',
          link: routes.reports.depositReceivedReport,
          isHide: isAgencyBranch || isSubAgencyBranch,
        },
        {
          text: 'Deposit Given Report',
          link: routes.reports.depositGivenReport,
          isHide: isAgencyBranch || isSubAgencyBranch,
        },
      ],
    },

    {
      text: 'Config & Control',
      icon: <ConstructIcon />,
      clickFunc: () => setShowConfig(!showConfig),
      show: showConfig,
      subList: [
        {
          text: 'Manage Deals',
          link: routes.master.searchDeals,
          isHide: isAgencyBranch || isSubAgency || isSubAgencyBranch,
        },
        {
          text: 'Manage Region',
          link: routes.master.searchRegion,
          isHide: isAgencyBranch || isSubAgency || isSubAgencyBranch,
        },
        {
          text: 'Manage Multi PCC',
          link: routes.master.searchMultiPcc,
          isHide: isAgencyBranch || isSubAgency || isSubAgencyBranch,
        },
      ],
      link: '#',
    },

    {
      text: 'Settings',
      icon: <SettingsIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowSetting(!showSetting),
      show: showSetting,
      subList: [],
      link: '#',
    },
  ];

  const isSelected = (selectedPath) => {
    return location.pathname === selectedPath;
  };
  return (
    <Drawer
      open={showDrawer}
      classes={{ paper: 'drawer' }}
      onClose={() => setShowDrawer(false)}
      // variant="persistent"
      ModalProps={{ onBackdropClick: () => setShowDrawer(false) }}
    >
      <nav className="SideDrawer">
        {drawerData.map((row, index) => (
          <div key={index}>
            <div
              className="SideDrawer-list"
              {...(row.clickFunc && { onClick: row.clickFunc })}
            >
              <div className="SideDrawer-list__icon">{row.icon}</div>
              <Link
                to={row.link || '#'}
                className="SideDrawer-list__text font-primary-semibold-18"
              >
                {row.text}
              </Link>
              {row.subList && (row.show ? <ExpandLess /> : <ExpandMore />)}
            </div>
            {row.subList &&
              row.subList.map((subrow, subrowIndex) => (
                <Collapse
                  in={row.show}
                  timeout="auto"
                  unmountOnExit
                  key={subrowIndex}
                  onClick={() => setShowDrawer(false)}
                >
                  {!subrow.isHide && (
                    <Link
                      to={subrow.link}
                      className={`SideDrawer-toggleList font-primary-semibold-16 py-12  ${
                        isSelected(subrow.link)
                          ? `SideDrawer-toggleList-selected`
                          : ''
                      }`}
                      {...(subrow.clickFunc && {
                        onClick: subrow.clickFunc,
                      })}
                    >
                      {subrow.text}
                    </Link>
                  )}
                </Collapse>
              ))}
          </div>
        ))}
      </nav>
    </Drawer>
  );
};

export default SideDrawer;
