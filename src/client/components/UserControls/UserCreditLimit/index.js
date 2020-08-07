import React, { useEffect } from 'react';
import Avatar from 'Widgets/Avatar';
import { Link } from 'react-router-dom';
import routes from 'Constants/routes';
import { getItemFromStorage, showError } from 'Helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'Actions/index';
import endpoint from 'Config/endpoint';

import './style.scss';

const UserCreditLimit = (props) => {
  const { creditLimitDetails, officeDto, fullName } = props;
  return (
    <div className="HeaderPopover br-6">
      <div className="HeaderPopover-head">
        <Avatar className="font-primary-medium-32" size="60px">
          OT
        </Avatar>
        <div className="HeaderPopover-head__detail pl-24 d-flex flex-direction-column">
          <span className=" HeaderPopover-head__detail-name font-primary-medium-24">
            {fullName}
          </span>
          <span className="HeaderPopover-head__detail-email font-primary-semibold-16">
            {officeDto.officeEmail}{' '}
          </span>
        </div>
      </div>
      <div className="HeaderPopover-body font-primary-semibold-18 p-12">
        <div className="HeaderPopover-body-creditDetails  pb-4">
          <span name="office-name">{officeDto.officeName}</span>{' '}
          <span name="office-id">[{officeDto.officeId}]</span>
        </div>
        <div className="HeaderPopover-body-creditLimit">
          <span>Credit Limit Balance :</span>{' '}
          <span>{creditLimitDetails?.currencyCode}</span>{' '}
          <span>{creditLimitDetails?.balanceAmount}</span>
        </div>
      </div>

      <div className="horizontal-grey-divider"></div>

      <div className="HeaderPopover-foot font-primary-medium-18 d-flex flex-direction-column cursor-pointer my-6">
        <Link className="pb-12" to={routes.office.manageUserProfile}>
          Manage Profile
        </Link>
        <Link to={routes.office.changePassword}>Change Password</Link>
        <Link to="#">Signout</Link>
      </div>
    </div>
  );
};

export default UserCreditLimit;
