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
import { setItemToStorage } from 'Helpers/utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ConstructIcon } from 'Widgets';
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
          link: routes.flight.search,
        },
      ],
    },
    {
      text: 'Agency',
      icon: <PersonAddIcon style={{ transform: 'scaleX(-1)', fontSize: 30 }} />,
      clickFunc: () => setShowSubagency(!showSubagency),
      show: showSubagency,
      subList: [
        // {
        //   text: 'Registration',
        //   link: '/createAccount',
        // },
        // {
        //   text: 'Profile & Credit Limit',
        //   link: '/agency/subAgent',
        // },
        // {
        //   text: 'Deal & Commission',
        //   link: '#',
        // },
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
          clickFunc: () => {
            dispatch(commonActionUpdate(endpoint.office.searchOffice, null));
          },
        },
        {
          text: 'Manage User',
          link: routes.office.searchOfficeUser,
          clickFunc: () => {
            setItemToStorage('selectedOffice', '');
            dispatch(commonActionUpdate(endpoint.office.searchUser, null));
          },
        },
        {
          text: 'Security Group',
          link: routes.office.searchSecurityGroup,
        },
      ],
    },

    {
      text: 'Reports',
      icon: <AssignmentIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowReport(!showReport),
      show: showReport,
      subList: [],
      link: '#',
    },

    {
      text: 'Config & Control',
      icon: <ConstructIcon />,
      clickFunc: () => setShowConfig(!showConfig),
      show: showConfig,
      subList: [],
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
      variant="persistent"
      classes={{ paper: 'drawer' }}
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
                >
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
                </Collapse>
              ))}
          </div>
        ))}
      </nav>
    </Drawer>
  );
};

export default SideDrawer;
