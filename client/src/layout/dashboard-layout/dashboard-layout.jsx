import { Layout } from "antd";
import "./dashboard-layout.styles.scss";
import { DashboardFooter, DashboardHeader, SignInSignUpModal } from "./component";

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
	return (
		<Layout>
			<DashboardHeader />
			<Content className="dashboard-layout">
				<div className="content">
					<SignInSignUpModal />
					{children}
				</div>
			</Content>
			<DashboardFooter />
		</Layout>
	);
};

export default DashboardLayout;
