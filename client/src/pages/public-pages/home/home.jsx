import { Progress, Card, Col, Row, Tabs, Empty, Avatar, Typography } from 'antd';
import './home.styles.scss';
import BoxChat from './box-chat';

const { Title } = Typography;
const { TabPane } = Tabs;

export const HomePage = () => {
	return (
		<div className='user-home-page'>
			<div hidden className='header' style={{ marginTop: '-25px' }}>
				<Title level={4}>
					Xin chào "User". Chào mừng bạn đã đến với 4rum. Hãy khám phá nhé!
				</Title>
				<Col span={24}>
					<Card className='level-card'>
						<Row>
							<Col lg={12} xs={24}>
								<Card.Meta
									avatar={
										<Avatar src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lDTeuL6g4zkAX_pXMnn&tn=LXhXtC0BU470u6iT&_nc_ht=scontent.fsgn2-3.fna&oh=e3a77658a48c4fa1d729b3980add6485&oe=616F7D9A' />
									}
									title='Nguyễn Thanh Nhân'
								/>
								<Progress
									strokeColor={{
										from: '#108ee9',
										to: '#87d068',
									}}
									percent={99.9}
									status='active'
									className='progress-bar'
								/>
								<Row className='level-text'>
									<Col span={12} className='item1'>
										Level 2
									</Col>
									<Col span={12} className='item3'>
										Level 3
									</Col>
								</Row>
							</Col>
							<Col lg={12} xs={24}></Col>
						</Row>
					</Card>
				</Col>
			</div>
			<div hidden>
				<Tabs defaultActiveKey='1' type='card' size={'large'}>
					<TabPane tab='Thành Phố' key='1'>
						<Empty description='Tính năng chưa phát triển' />
					</TabPane>
					<TabPane tab='Sự Kiện' key='2'>
						<Empty description='Tính năng chưa phát triển' />
					</TabPane>
					<TabPane tab='VIP' key='3'>
						<Empty description='Hiện tại bạn chưa đăng ký VIP' />
					</TabPane>
				</Tabs>
			</div>

			<BoxChat />
		</div>
	);
};
