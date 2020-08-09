import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Home,
  OfficeRegistration,
  SearchUser,
  UserProfile,
  Search,
  Availability,
  CreateUser,
  ChangePassword,
  SearchOffice,
  OfficeProfile,
  OfficeCredit,
  CreditLimitBreakup,
} from 'Views/';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import routes from 'Constants/routes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path={routes.user.resetPassword} component={Home} />

    <PrivateRoute exact path={routes.flight.search} component={Search} />
    <PrivateRoute
      exact
      path={routes.office.searchOfficeUser}
      component={SearchUser}
    />

    <PrivateRoute
      exact
      path={routes.office.createOfficeUser}
      component={CreateUser}
    />

    <PrivateRoute
      exact
      path={routes.office.viewOfficeUser}
      component={UserProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.updateOfficeUser}
      component={UserProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.manageUserProfile}
      component={UserProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.changePassword}
      component={ChangePassword}
    />

    <PrivateRoute
      exact
      path={routes.office.searchOffice}
      component={SearchOffice}
    />

    <PrivateRoute
      exact
      path={routes.office.createOffice}
      component={OfficeProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.viewOffice}
      component={OfficeProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.updateOffice}
      component={OfficeProfile}
    />

    <PrivateRoute
      exact
      path={routes.office.manageCreditLimit}
      component={OfficeCredit}
    />

    <PrivateRoute
      exact
      path={routes.office.creditLimitBreakup}
      component={CreditLimitBreakup}
    />

    <PrivateRoute
      exact
      path={routes.flight.availability}
      component={Availability}
    />
    <PrivateRoute exact path="/private" component={() => <div>private</div>} />
    <PublicRoute
      exact
      path="/public"
      restricted={true}
      component={() => <div>public</div>}
    />
    <PublicRoute exact path="/public1" component={() => <div>public</div>} />
    <PublicRoute
      exact
      path={routes.office.registration}
      component={OfficeRegistration}
    />
  </Switch>
);

export default Routes;
