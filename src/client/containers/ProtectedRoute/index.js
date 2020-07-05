import React from "react";
import { Route, Redirect } from "react-router-dom";

import COMMON_ROUTES from "./../../constants/routes/routes.common";

import Layout from "./../layout";

const ProtectedRoute = (props) => {
	const { component: Component, ...rest } = props;
	const user = { token: "" };

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user && !!user.token) {
					return (
						<Layout>
							<Component {...props} />
						</Layout>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: COMMON_ROUTES.login,
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
