import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { home } from "Views/";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import SignIn from "Views/users/singIn";

const Router = () => (
  <Switch>
    <Route exact path="/xyz" component={home} />
    <PrivateRoute exact path="/private" component={() => <div>private</div>} />
    <PublicRoute
      exact
      path="/public"
      restricted={true}
      component={() => <div>public</div>}
    />
    <PublicRoute exact path="/public1" component={() => <div>public</div>} />
    <PublicRoute exact path="/signin" component={SignIn} />
  </Switch>
);

export default Router;
