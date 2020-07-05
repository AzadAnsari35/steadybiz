import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import COMMON_ROUTES from "./../constants/routes/routes.common";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./../views/home";

const App = () => {
  // NEED TO ADD LOGIC TO CHECK LOGIN WITH COOKIE

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={COMMON_ROUTES.home} component={Home} />
        <Route exact path={COMMON_ROUTES.login} component={() => <div>Login</div>} />
        <Route exact path={COMMON_ROUTES.signUp} component={() => <div>Sign Up</div>} />
        <ProtectedRoute exact path={COMMON_ROUTES.search} component={() => <div>Content based on Route goes here</div>} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
