import routes from 'Constants/routes';
import { utils } from 'Helpers';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'Widgets/Avatar';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint';
import { securityOptionConstant } from 'Constants';

import { useDispatch, useSelector } from 'react-redux';

const UserCreditLimit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signOut = () => {
    utils.removeItemFromStorage('userToken');
    utils.removeItemFromStorage('userId');
    utils.removeItemFromStorage('officeId');
    utils.removeItemFromStorage('userData');

    dispatch(commonActionWithoutApi(endpoint.user.login, null));
    handleClose();
    setShowDrawer(false);
  };

  const handleManageProfile = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.manageProfile
    );
    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }
    utils.removeItemFromStorage('selectedUser');

    history.push(routes.office.manageUserProfile);
    handleClose();
  };

  const handleChangePassword = () => {
    const securityMessage = utils.checkSecurityGroup(
      securityOptionConstant.office.changePassword
    );
    if (securityMessage !== '') {
      dispatch(utils.showErrorBox(securityMessage));
      return;
    }

    history.push(routes.office.changePassword);
    handleClose();
  };

  const {
    creditLimitDetails,
    officeDto,
    fullName,
    handleClose,
    setShowDrawer,
    emailId
  } = props;
  return (
    <div className="HeaderPopover br-6">
      <div className="HeaderPopover-head">
        <Avatar className="font-primary-medium-32" size="60px">
          {utils.getShortName(fullName)}
        </Avatar>
        <div className="HeaderPopover-head__detail pl-24 d-flex flex-direction-column">
          <span className=" HeaderPopover-head__detail-name font-primary-medium-24">
            {fullName}
          </span>
          <span className="HeaderPopover-head__detail-email font-primary-semibold-16">
            {emailId}{' '}
          </span>
        </div>
      </div>
      <div className="HeaderPopover-body font-primary-semibold-18 p-12">
        <div className="HeaderPopover-body-creditDetails  pb-4">
          <span name="office-name">{officeDto?.officeName}</span>{' '}
          <span name="office-id">[{officeDto?.officeId}]</span>
        </div>
        <div className="HeaderPopover-body-creditLimit">
          <span>Credit Limit Balance :</span>{' '}
          <span>{creditLimitDetails?.currencyCode}</span>{' '}
          <span>{creditLimitDetails?.balanceAmount}</span>
        </div>
      </div>

      <div className="horizontal-grey-divider"></div>

      <div className="HeaderPopover-foot font-primary-medium-18 d-flex flex-direction-column cursor-pointer my-6">
        <div className="pb-12" onClick={handleManageProfile}>
          Manage Profile
        </div>
        <div onClick={handleChangePassword}>Change Password</div>
        <Link to="/" onClick={() => signOut()}>
          Signout
        </Link>
      </div>
    </div>
  );
};

export default UserCreditLimit;
