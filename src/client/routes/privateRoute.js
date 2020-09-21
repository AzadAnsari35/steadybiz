import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'Helpers/utils';
import { connect } from 'react-redux';
import routes from 'Constants/routes';
import { refreshRoutes } from 'Constants/refreshRoutes';
const PrivateRoute = ({
  component: Component,
  isDataAvailable: isDataAvailable,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          isDataAvailable.items ? (
            <Component {...props} />
          ) : (
            <Redirect to={refreshRoutes(location.pathname)} />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  isDataAvailable: state.usersSignIn,
});
export default connect(mapStateToProps)(PrivateRoute);
//export default PrivateRoute;
