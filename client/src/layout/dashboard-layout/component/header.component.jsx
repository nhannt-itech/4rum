import DashboardDrawSider from "./draw-sider.component";
import HeaderIdentityArea from "./header.identity.component";
import { Layout, Menu, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { HeaderMenuData } from "../dashboard-layout.data";

const { Header } = Layout;

export const DashboardHeader = () => {
	return (
		<Header id="dashboard-header" style={{ backgroundColor: "white" }}>
			<Row>
				<Col span={12} lg={3}>
					<Link to="/">
						<div style={{ width: "100%", textAlign: "center" }}>
							<img
								style={{ width: "90px" }}
								src={`${process.env.PUBLIC_URL}/Logo.png`}
								alt="Logo"
							/>
						</div>
					</Link>
				</Col>
				{/* Menu for Header */}
				<Col span={0} lg={13}>
					<Menu
						id="dashboard-header-menu"
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={["0"]}
					>
						{HeaderMenuData.map((item, index) => (
							<Menu.Item className="dashboard-header-menu-item" key={index}>
								<Link to={item.url}>
									{<item.icon />} {item.title}
								</Link>
							</Menu.Item>
						))}
					</Menu>
				</Col>
				<Col span={12} lg={8} style={{ textAlign: "right" }}>
					<Space>
						{/* Menu for Language */}
						{/* <Dropdown
							hidden
							id="language-menu"
							trigger={["click"]}
							overlay={LanguageMenuData}
							placement="bottomRight"
						>
							<img id="language-menu-img" src="/images/icons/vn.png" alt="" />
						</Dropdown> */}
						<HeaderIdentityArea />
						<DashboardDrawSider id="dashboard-sider" />
					</Space>
				</Col>
			</Row>
		</Header>
	);
};
