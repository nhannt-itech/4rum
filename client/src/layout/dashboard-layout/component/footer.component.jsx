import { Layout, Row, Col, Typography } from "antd";
const { Footer } = Layout;
const { Text, Title } = Typography;

export const DashboardFooter = () => {
	return (
		<div className="dashboard-footer">
			<Footer className="primary">
				<Row gutter={[20, 20]}>
					<Col md={24} lg={12}>
						<Title>4rum</Title>
						<Text>Social for you</Text>
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>LINKS</Title>
						<Text>Learning</Text> <br />
						<Text>Game</Text>
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>INFORMATION</Title>
						<Text>Sharing</Text> <br />
						<Text>Terms</Text> <br />
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>HELP</Title>
						<Text>Discussion</Text> <br />
						<Text>Contact</Text> <br />
					</Col>
				</Row>
			</Footer>
			<Footer style={{ padding: "10px 0px" }} className="secondary">
				4rum @2021 Created by Nhan Nguyen
			</Footer>
		</div>
	);
};
