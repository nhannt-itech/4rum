import { Input, Col, Row, Typography } from "antd";
import CourseItem from "./course-item";
import "./course.styles.scss";
import { Link } from "react-router-dom";

export const CoursePage = () => {
	const course = {
		ImageUrl:
			"https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/c6b8d5cfe9ff4b56887e8751d37a1c61.png",
		Title: "Tiêu đề",
		Summary: "Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ...",
		Rating: 4,
		CreateBy: "Rynoz",
	};

	return (
		<div className="course-page">
			<div className="header">
				<Typography.Title className="title" level={4}>
					Tự học lập trình trực tuyến. Hãy bắt đầu với khoá học đầu tiên của bạn!
				</Typography.Title>
				<Row gutter={[16, 20]}>
					<Col xs={24} sm={{ offset: 12, span: 12 }} md={{ offset: 14, span: 10 }}>
						<Input.Group compact>
							<Input.Search
								style={{ width: "100%" }}
								placeholder="Tìm kiếm khóa học..."
								enterButton
							/>
						</Input.Group>
					</Col>
				</Row>
			</div>

			<Row gutter={[16, 20]}>
				{[...Array(8)].map((item, index) => (
					<Col key={index} xs={24} sm={12} md={8} lg={6}>
						<Link to="/course/detail">
							<CourseItem course={course} />
						</Link>
					</Col>
				))}
			</Row>
		</div>
	);
};
