import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isSignIn = useSelector((state) => state.user.isSignIn);

	return (
		<Route
			{...rest}
			render={({ location }) => {
				return isSignIn ? (
					<Component />
				) : (
					<Redirect to={{ pathname: '/identity/sign-in', state: { from: location } }} />
				);
			}}
		/>
	);
};

export default PrivateRoute;
