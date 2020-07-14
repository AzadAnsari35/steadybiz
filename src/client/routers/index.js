import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { home } from "Views/";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import OfficeRegisteration from "Views/office/officeRegisteration";

const Routers = () => (
  <Switch>
    <Route exact path="/" component={home} />
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
      path="/office/officeRegistration"
      component={OfficeRegisteration}
    />
  </Switch>
);

export default Routers;
