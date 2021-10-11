import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip } from "antd";
import moment from "moment";

const { TextArea } = Input;

const data = [
	{
		actions: [<span key="comment-list-reply-to-0">Trả lời</span>],
		author: "Tsae",
		avatar:
			"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-9/103104316_1339967976202004_5150679843833815155_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MJvb0O7LgiUAX8w8xP5&_nc_ht=scontent.fsgn2-2.fna&oh=8f30bf37733f499fab0b0e4e4b4a83ca&oe=617E301B",
		content: (
			<p>
				We supply a series of design principles, practical patterns and high quality design
				resources (Sketch and Axure), to help people create their product prototypes beautifully and
				efficiently.
			</p>
		),
		datetime: (
			<Tooltip title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}>
				<span>{moment().subtract(100, "days").fromNow()}</span>
			</Tooltip>
		),
	},
	{
		actions: [<span key="comment-list-reply-to-0">Trả lời</span>],
		author: "Tsae",
		avatar:
			"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-9/103104316_1339967976202004_5150679843833815155_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MJvb0O7LgiUAX8w8xP5&_nc_ht=scontent.fsgn2-2.fna&oh=8f30bf37733f499fab0b0e4e4b4a83ca&oe=617E301B",
		content: (
			<p>
				We supply a series of design principles, practical patterns and high quality design
				resources (Sketch and Axure), to help people create their product prototypes beautifully and
				efficiently.
			</p>
		),
		datetime: (
			<Tooltip title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}>
				<span>{moment().subtract(100, "days").fromNow()}</span>
			</Tooltip>
		),
	},
];

const Editor = () => (
	<>
		<Form.Item>
			<TextArea rows={4} />
		</Form.Item>
		<Form.Item style={{ textAlign: "right" }}>
			<Button htmlType="submit" type="primary">
				Bình luận
			</Button>
		</Form.Item>
	</>
);

const CommentArea = () => {
	return (
		<div>
			<Card className="comment-area">
				<Comment
					avatar={
						<div style={{ paddingBottom: "0px" }} className="comment-avatar-container">
							<Avatar
								className="avatar"
								src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kZ-sg--OiGMAX-MbHwk&_nc_ht=scontent.fsgn2-3.fna&oh=5528460743f3ba96785635495f77f07a&oe=617F4F9A"
								alt="Han Solo"
							/>
						</div>
					}
					content={<Editor />}
				/>
				<List
					className="comment-list"
					header={`${data.length} lượt bình luận`}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<li>
							<Comment
								actions={item.actions}
								author={item.author}
								avatar={item.avatar}
								content={item.content}
								datetime={item.datetime}
							/>
						</li>
					)}
				/>
			</Card>
		</div>
	);
};

export default CommentArea;
