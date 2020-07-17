import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home, OfficeRegistration } from "Views/";
import Search from "Views/search";
import Availability from "Views/availability";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import routes from "Constants/routes";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path={routes.flight.search} component={Search} />
    <PrivateRoute exact path={routes.flight.availability} component={Availability} />
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
