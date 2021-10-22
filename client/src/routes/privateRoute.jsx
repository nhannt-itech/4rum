import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookies";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
	let auth = Cookies.getItem("auth");

	console.log(Cookies.getItem("auth"));
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return auth ? (
					<Component />
				) : (
					<Redirect to={{ pathname: "/identity/sign-in", state: { from: location } }} />
				);
			}}
		/>
	);
};

export default PrivateRoute;
