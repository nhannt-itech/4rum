import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	//Gọi xác thực từ đây
	const isUserLogin = true;
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return isUserLogin ? (
					<Component />
				) : (
					<Redirect to={{ pathname: "/signin", state: { from: location } }} />
				);
			}}
		/>
	);
};

export default PrivateRoute;
