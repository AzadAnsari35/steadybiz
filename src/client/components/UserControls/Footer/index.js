import React from "react";
import CallIcon from "@material-ui/icons/Call";
import CopyrightIcon from "@material-ui/icons/Copyright";

import { displayImage } from "Helpers/utils";

import "./style.scss";

const Footer = () => {
  return (
    <div className="Footer d-flex justify-content-between  p-12 font-primary-medium-22">
      <div className="Footer-info d-flex align-items-center">
        <CallIcon fontSize="large" />
        <div className="ml-16 mr-4">Call us at:</div>
        <div className="font-primary-semibold-22">+971 9956789432</div>
      </div>
      <div className="Footer-rights d-flex align-items-center">
        <CopyrightIcon />
        <div className="ml-8">
          2020 OK Travel & Tourism. All Rights Reserved.
        </div>
      </div>

      <div className="Footer-links d-flex align-items-center">
        <img
          src={displayImage("whatsapp.svg")}
          alt="Whatsapp Icon"
          className="pr-20"
        />
        <img
          src={displayImage("facebook.svg")}
          alt="Facebook Icon"
          className="pr-20"
        />
        <img
          src={displayImage("youtube.svg")}
          alt="Youtube Icon"
          className="pr-20"
        />
        <img src={displayImage("twitter.svg")} alt="Twitter Icon" />
      </div>
    </div>
  );
};

export default Footer;
