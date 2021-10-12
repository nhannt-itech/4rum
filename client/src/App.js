import './App.less';
import { Route, Switch } from 'react-router-dom';
import DashboardLayout from './layout/dashboard-layout/dashboard-layout';
import IdentityLayout from './layout/identity-layout/identity-layout';
import PrivateRoute from './routes/privateRoute';
import { ForgotPasswordPage, SignUpPage, SignInPage } from './pages/identity-pages';

import { CreatePostPage } from './pages/protected-pages';
import {
	HomePage,
	PostPage,
	PostDetailPage,
	NewsPage,
	NewsDetailPage,
} from './pages/public-pages';

const App = () => {
	return (
		<Switch>
			{/* IdentityPage */}
			<Route path='/identity/:path?' exact>
				<IdentityLayout>
					<Route path='/identity/sign-in' component={SignInPage} />
					<Route path='/identity/sign-up' component={SignUpPage} />
					<Route path='/identity/forgot-password' component={ForgotPasswordPage} />
				</IdentityLayout>
			</Route>

			{/* AppPage */}
			<Route>
				<DashboardLayout>
					<Switch>
						<Route exact path='/' component={HomePage}></Route>
						<Route exact path='/post' component={PostPage}></Route>
						<Route exact path='/post/:id' component={PostDetailPage}></Route>
						<Route exact path='/news' component={NewsPage}></Route>
						<Route exact path='/news/:id' component={NewsDetailPage}></Route>
						<Route exact path='/create-post' component={CreatePostPage}></Route>
						{/* <PrivateRoute exact path="/course/:id" component={CourseDetailPage} /> */}
					</Switch>
				</DashboardLayout>
			</Route>
			{/* IdentityPage */}
		</Switch>
	);
};

export default App;
