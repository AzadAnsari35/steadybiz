import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FlightIcon from "@material-ui/icons/Flight";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";
// import ConstructIcon from "../svg/ConstructIcon";
import "./styles.scss";

const SideDrawer = ({ showDrawer, setShowDrawer }) => {
  const [showFlight, setShowFlight] = React.useState(false);
  const [showSubagency, setShowSubagency] = React.useState(false);
  [[]];
  const [showReport, setShowReport] = React.useState(false);
  const [showConfig, setShowConfig] = React.useState(false);
  const [showSetting, setShowSetting] = React.useState(false);

  const drawerData = [
    {
      text: "Dashboard",
      icon: <DashboardIcon style={{ fontSize: 30 }} />,
      link: "/search",
    },

    {
      text: "Flight",
      icon: <FlightIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowFlight(!showFlight),
      show: showFlight,
      subList: [
        {
          text: "Flight Search",
          link: "/search",
        },
      ],
    },
    {
      text: "Agency",
      icon: <PersonAddIcon style={{ transform: "scaleX(-1)", fontSize: 30 }} />,
      clickFunc: () => setShowSubagency(!showSubagency),
      show: showSubagency,
      subList: [
        {
          text: "Registration",
          link: "/createAccount",
        },
        {
          text: "Profile & Credit Limit",
          link: "/agency/subAgent",
        },

        {
          text: "Deal & Commission",
        },

        {
          text: "Markup & Discount",
        },
        {
          text: "Productivity Group",
        },
        {
          text: "Invoice Details",
        },
        {
          text: "Account Statement",
        },
      ],
    },

    {
      text: "Reports",
      icon: <AssignmentIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowReport(!showReport),
      show: showReport,
      subList: [],
    },

    {
      text: "Config & Control",
      icon: <AssignmentIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowConfig(!showConfig),
      show: showConfig,
      subList: [],
    },

    {
      text: "Settings",
      icon: <SettingsIcon style={{ fontSize: 30 }} />,
      clickFunc: () => setShowSetting(!showSetting),
      show: showSetting,
      subList: [],
    },
  ];

  const isSelected = (selectedPath) => {
    return window.location.pathname === selectedPath;
  };
  return (
    <Drawer
      open={showDrawer}
      variant="persistent"
      classes={{ paper: "drawer" }}
    >
      <nav className="SideDrawer">
        {drawerData.map((row, index) => (
          <div key={index}>
            <div
              className="SideDrawer-list"
              onClick={row.clickFunc ? row.clickFunc : ""}
            >
              <div className="SideDrawer-list__icon">{row.icon}</div>
              <Link
                to={row.link}
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
                        : ""
                    }`}
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
