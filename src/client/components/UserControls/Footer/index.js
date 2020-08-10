import React from 'react';
import CallIcon from '@material-ui/icons/Call';
import CopyrightIcon from '@material-ui/icons/Copyright';

import { displayImage } from 'Helpers/utils';

import './style.scss';

const Footer = () => {
  return (
    <div className="Footer d-flex justify-content-between  p-12 font-primary-medium-14">
      <div className="Footer-info d-flex align-items-center">
        <CallIcon style={{ fontSize: 24 }} />
        <div className="ml-16 mr-4">Call us at:</div>
        <div className="font-primary-semibold-14">+971 9956789432</div>
      </div>

      <div className="Footer-links d-flex align-items-center">
        <div className="Footer-links-whatsapp mr-20 d-flex align-items-center justify-content-center">
          <img src={displayImage('whatsapp.svg')} alt="Whatsapp Icon" />
        </div>
        <div className="Footer-links-facebook mr-20 d-flex align-items-center justify-content-center">
          <img src={displayImage('facebook.svg')} alt="Facebook Icon" />
        </div>
        <div className="Footer-links-youtube mr-20 d-flex align-items-center justify-content-center">
          <img src={displayImage('youtube.svg')} alt="Youtube Icon" />
        </div>
        <div className="Footer-links-twitter mr-20 d-flex align-items-center justify-content-center">
          <img src={displayImage('twitter.svg')} alt="Twitter Icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
