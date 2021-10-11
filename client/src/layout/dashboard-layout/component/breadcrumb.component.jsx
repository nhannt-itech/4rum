import { Breadcrumb } from "antd";

export const DashboardBreadcrumb = () => {
	return (
		<Breadcrumb className="dashboard-breadcrumb">
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>List</Breadcrumb.Item>
			<Breadcrumb.Item>App</Breadcrumb.Item>
		</Breadcrumb>
	);
};
