import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { home } from "Views/";
import Search from "Views/search/index";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import OfficeRegistration from "Views/office/officeRegistration";
import routes from "Constants/routes";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={home} />
    <PrivateRoute exact path={routes.flight.search} component={Search} />
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
