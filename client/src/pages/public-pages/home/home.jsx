import { Progress, Card, Col, Row, Tabs, Empty, Avatar, Typography } from "antd";
import CardProgress from "./card-progress";
import CourseItem from "../course/course-item";
import "./home.styles.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

const course = {
	ImageUrl:
		"https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/c6b8d5cfe9ff4b56887e8751d37a1c61.png",
	Title: "Tiêu đề",
	Summary: "Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ...",
	Rating: 4,
	CreateBy: "Rynoz",
};

export const HomePage = () => {
	return (
		<div class="user-home-page">
			<div className="header">
				<Title level={4}>
					Xin chào "User". Chào mừng bạn đã đến với CodeLearn. Hãy khám phá nhé!
				</Title>
				<Row gutter={[16, 20]} className="info">
					<Col lg={12} sm={24}>
						<Card className="level-card">
							<Card.Meta
								avatar={
									<Avatar src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lDTeuL6g4zkAX_pXMnn&tn=LXhXtC0BU470u6iT&_nc_ht=scontent.fsgn2-3.fna&oh=e3a77658a48c4fa1d729b3980add6485&oe=616F7D9A" />
								}
								title="Nguyễn Thanh Nhân"
								description="Công Nghệ Thông Tin - Đại Học Sư Phạm Kỹ Thuật"
							/>
							<Progress
								strokeColor={{
									from: "#108ee9",
									to: "#87d068",
								}}
								percent={99.9}
								status="active"
								className="progress-bar"
							/>
							<Row className="level-text">
								<Col span={8} className="item1">
									Cấp độ 2
								</Col>
								<Col span={8} className="item2">
									13.4/100
								</Col>
								<Col span={8} className="item3">
									Cấp độ 3
								</Col>
							</Row>
						</Card>
					</Col>
					<Col lg={6} sm={12}>
						<CardProgress
							title="Khóa học"
							grade="1/19"
							progress={90}
							progressColor={null}
							additional="Hoàn thành"
						/>
					</Col>
					<Col lg={6} sm={12}>
						<CardProgress
							title="Thứ hạng"
							grade="1/19"
							progress={90}
							progressColor={null}
							additional="Hoàn thành"
						/>
					</Col>
				</Row>
			</div>
			<div>
				<Title>Khóa học</Title>
				<Tabs defaultActiveKey="1" type="card" size={"large"}>
					<TabPane tab="Khóa học gợi ý" key="1">
						<Row gutter={[16, 20]}>
							{[...Array(4)].map((item, index) => (
								<Col key={index} xs={24} sm={12} md={8} lg={6}>
									<CourseItem course={course} />
								</Col>
							))}
						</Row>
					</TabPane>
					<TabPane tab="Đang học" key="2">
						<Row gutter={[16, 20]}>
							{[...Array(4)].map((item, index) => (
								<Col key={index} xs={24} sm={12} md={8} lg={6}>
									<CourseItem course={course} />
								</Col>
							))}
						</Row>{" "}
					</TabPane>
					<TabPane tab="Đã hoàn thành" key="3">
						<Empty description="Hiện tại chưa có khóa học nào" />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};
