import React from 'react';
import Avatar from 'Widgets/Avatar';
import { Link } from 'react-router-dom';

import './style.scss';

const UserCreditLimit = () => {
  return (
    <div className="HeaderPopover br-6">
      <div className="HeaderPopover-head">
        <Avatar className="font-primary-medium-32" size="60px">
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
        <div className="HeaderPopover-body-creditDetails  pb-4">
          <span name="office-name">Steady Biz</span>{' '}
          <span name="office-id">[DXBOKT0000]</span>
        </div>
        <div className="HeaderPopover-body-creditLimit">
          <span>Credit Limit Balance :</span> <span>$</span> <span>2000</span>
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
  );
};

export default UserCreditLimit;
