import React from 'react';
import loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Home,
  OfficeRegistration,
  SearchUser,
  UserProfile,
  Search,
  Availability,
  SearchSecurityGroup,
  CreateSecurityGroup,
  CreateUser,
  ChangePassword,
  SearchOffice,
  OfficeProfile,
  AgencyProfile,
  OfficeCredit,
  CreditLimitBreakup,
  PassengerInformation,
  Transaction,
  SearchOrder,
  CreateDeal,
  BookingReport,
  AgencyRegistration,
  SearchRegion,
  CreateRegion,
} from 'Views/';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import routes from 'Constants/routes';
import { LinearLoaderSecondary } from 'Widgets/';
//const LoadingComponent = () => <h3>please wait...</h3>;
const AsyncSearchDeals = loadable({
  loader: () => import('Views/agency/manageDeals/searchDeals'),
  loading: LinearLoaderSecondary,
});

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
      path={routes.office.searchSecurityGroup}
      component={SearchSecurityGroup}
    />

    <PrivateRoute
      exact
      path={routes.office.createSecurityGroup}
      component={CreateSecurityGroup}
    />

    <PrivateRoute
      exact
      path={routes.office.updateSecurityGroup}
      component={CreateSecurityGroup}
    />
    <PrivateRoute
      exact
      path={routes.office.viewSecurityGroup}
      component={CreateSecurityGroup}
    />

    <PrivateRoute
      exact
      path={routes.office.creditLimitBreakup}
      component={CreditLimitBreakup}
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
      path={routes.agency.searchAgency}
      component={SearchOffice}
    />

    <PrivateRoute
      exact
      path={routes.agency.createAgency}
      component={AgencyProfile}
    />

    <PrivateRoute
      exact
      path={routes.agency.viewAgency}
      component={AgencyProfile}
    />

    <PrivateRoute
      exact
      path={routes.agency.updateAgency}
      component={AgencyProfile}
    />

    <PrivateRoute
      exact
      path={routes.agency.registration}
      component={AgencyRegistration}
    />

    <PrivateRoute
      exact
      path={routes.agency.manageCreditLimit}
      component={OfficeCredit}
    />

    <PrivateRoute
      exact
      path={routes.agency.creditLimitBreakup}
      component={CreditLimitBreakup}
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
    <PrivateRoute
      exact
      path={routes.common.passengerInformation}
      component={PassengerInformation}
    />

    <PrivateRoute
      exact
      path={routes.agency.searchDeals}
      component={AsyncSearchDeals}
    />

    <PrivateRoute
      exact
      path={routes.agency.createDeal}
      component={CreateDeal}
    />

    <PrivateRoute
      exact
      path={routes.agency.modifyDeal}
      component={CreateDeal}
    />

    <PrivateRoute exact path={routes.agency.viewDeal} component={CreateDeal} />

    <PrivateRoute
      exact
      path={routes.agency.dealHistory}
      component={CreateDeal}
    />

    <PrivateRoute
      exact
      path={routes.transaction.viewPNR}
      component={Transaction}
    />
    <PrivateRoute
      exact
      path={routes.transaction.viewBooking}
      component={Transaction}
    />
    <PrivateRoute
      exact
      path={routes.transaction.issueTicket}
      component={Transaction}
    />

    <PrivateRoute
      exact
      path={routes.transaction.searchOrder}
      component={SearchOrder}
    />
    <PrivateRoute
      exact
      path={routes.transaction.bookingReport}
      component={BookingReport}
    />

    <PrivateRoute
      exact
      path={routes.master.searchRegion}
      component={SearchRegion}
    />

    <PrivateRoute
      exact
      path={routes.master.createRegion}
      component={CreateRegion}
    />
    <PrivateRoute
      exact
      path={routes.master.updateRegion}
      component={CreateRegion}
    />
    <PrivateRoute
      exact
      path={routes.master.viewRegion}
      component={CreateRegion}
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
