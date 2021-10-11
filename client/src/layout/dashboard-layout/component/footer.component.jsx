import { Layout, Row, Col, Typography } from "antd";
const { Footer } = Layout;
const { Text, Title, Link } = Typography;

export const DashboardFooter = () => {
	return (
		<div className="dashboard-footer">
			<Footer className="primary">
				<Row gutter={[20, 20]}>
					<Col md={24} lg={12}>
						<Title>CODE-EDU</Title>
						<Text>
							CodeEdu là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, thực hành, thi đấu
							và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.
						</Text>
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>LIÊN KẾT</Title>
						<Text>Học tập</Text> <br />
						<Text>Luyện tập</Text> <br />
						<Text>Cuộc thi</Text> <br />
						<Text>Trò chơi</Text>
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>THÔNG TIN</Title>
						<Text>Chia sẻ</Text> <br />
						<Text>Về chúng tôi</Text> <br />
						<Text>Điều khoản sử dụng</Text> <br />
					</Col>
					<Col lg={4} md={8}>
						<Title level={4}>TRỢ GIÚP</Title>
						<Text>Hồ trợ</Text> <br />
						<Text>Thảo luận</Text> <br />
						<Text>Liên hệ với chúng tôi</Text> <br />
					</Col>
				</Row>
			</Footer>
			<Footer style={{ padding: "10px 0px" }} className="secondary">
				CodeLearn ©2018 Created by Tsae & Rynoz
			</Footer>
		</div>
	);
};
