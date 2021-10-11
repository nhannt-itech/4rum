import { Divider, Card, Rate, Badge, Popover, Avatar, Typography } from "antd";
import {
	UsergroupAddOutlined,
	StarOutlined,
	FieldTimeOutlined,
	SafetyCertificateOutlined,
} from "@ant-design/icons";

const CourseItem = ({ course }) => {
	const content = (
			<div className="course-popover-content">
				<UsergroupAddOutlined className="icon" />
				<Typography.Text className="label" type="default">
					{" 123456 Học viên"}
				</Typography.Text>
				<br />
				<StarOutlined className="icon" />
				<Typography.Text className="label" type="default">
					{" 777 Lượt đánh giá"}
				</Typography.Text>
				<br />
				<FieldTimeOutlined className="icon" />
				<Typography.Text className="label" type="default">
					{" Tổng thời gian học 77h"}
				</Typography.Text>
				<br />
				<SafetyCertificateOutlined className="icon" />
				<Typography.Text className="label" type="default">
					{" Đạt giấy chứng nhận sau khi hoàn thành"}
				</Typography.Text>
				<br />
			</div>
	);

	const response = () => {
		if (window.innerWidth > 576) return "hover";
		return "null";
	};

	return (
		<div className="course-card">
			<Badge.Ribbon text="Khóa học mới">
				<Popover
					className="popover"
					placement="right"
					title={
						<div>
							<Avatar
								size="small"
								src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fVJANVWcI3wAX9QsrfD&_nc_ht=scontent.fsgn13-2.fna&oh=2b4c71c99591c4c9a0eccd0199b5705e&oe=6167949A"
							/>
							<Typography.Text style={{ marginLeft: "10px" }} type="default">
								{course.CreateBy}
							</Typography.Text>
						</div>
					}
					content={content}
					trigger={response()}
				>
					<Card cover={<img alt="" src={course.ImageUrl}></img>} hoverable bordered={false}>
						<Card.Meta
							title={
								<div>
									<Rate className="rating" allowHalf disabled defaultValue={course.Rating} />
									<br />
									{course.Title}
								</div>
							}
							description={course.Summary}
						/>
						<Divider />
						Miễn phí
					</Card>
				</Popover>
			</Badge.Ribbon>
		</div>
	);
};

export default CourseItem;
