import { Drawer, Button, Menu, Row, Col } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HeaderMenuData } from "../dashboard-layout.data";

const DashboardDrawSider = () => {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<Button
				id="side-menu-btn"
				type="primary"
				icon={<MenuOutlined />}
				onClick={() => setVisible(true)}
			/>

			<Drawer
				title="Chức năng"
				placement="right"
				onClick={() => setVisible(false)}
				onClose={() => setVisible(false)}
				visible={visible}
			>
				<Menu theme="light" mode="inline" defaultSelectedKeys={["0"]}>
					{HeaderMenuData.map((item, index) => (
						<Menu.Item key={index} icon={<item.icon />}>
							<Link to={item.url}>{item.title}</Link>
						</Menu.Item>
					))}
				</Menu>
				<Row className="optional-dashboard-sider">
					<Col span={12}>
						<img src="/images/icons/vn.png" alt="" />
						Tiếng Việt
					</Col>
					<Col span={12}>
						<img src="/images/icons/en.png" alt="" />
						Tiếng Anh
					</Col>
				</Row>
			</Drawer>
		</div>
	);
};

export default DashboardDrawSider;
