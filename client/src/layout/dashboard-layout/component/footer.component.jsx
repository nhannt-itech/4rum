import { Layout, Row, Col, Typography } from 'antd';
const { Footer } = Layout;
const { Text, Title } = Typography;

export const DashboardFooter = () => {
	return (
		<div className='dashboard-footer'>
			<Footer className='primary'>
				<Row gutter={[20, 20]}>
					<Col md={24} lg={12}>
						<Title>4rum</Title>
						<Text>4rum là một mạng xã hội giải trí dành cho các bạn trẻ</Text>
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
			<Footer style={{ padding: '10px 0px' }} className='secondary'>
				4rum @2021 Created by Nhan Nguyen
			</Footer>
		</div>
	);
};
