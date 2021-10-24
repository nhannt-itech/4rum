import moment from "moment";
import { Card, Col, Row, Avatar, Tooltip } from "antd";
import { CaretUpOutlined, CaretDownOutlined, CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const PostItem = ({ post }) => {
	return (
		<Link to={`/post/${post._id}`}>
			<Card hoverable bordered={false}>
				<Card.Meta
					title={post.title}
					avatar={
						<div className="post-vote-avatar">
							<Avatar src="https://bookingmedtravel.com/img/userimage.png" />
							<div hidden className="post-vote">
								<Row>
									<Col>
										<CaretUpOutlined />
									</Col>
									<Col>0</Col>
								</Row>
								<Row>
									<Col>
										<CaretDownOutlined />
									</Col>
									<Col>0</Col>
								</Row>
							</div>
						</div>
					}
					description={
						<div>
							<div className="post-summary">{post.summary}</div>

							<Row className="post-additional-info">
								<Col span={16}>bởi: {post.author.userName}</Col>
								<Col className="total-comment" span={4}>
									{post.comments.length} <CommentOutlined />
								</Col>
								<Col className="create-at" span={4}>
									<Tooltip
										title={moment(
											(<span>{moment(post.createdAt).fromNow()}</span>).createdAt
										).format("YYYY-MM-DD HH:mm:ss")}
									>
										<span>{moment(post.createdAt).fromNow()}</span>
									</Tooltip>
								</Col>
							</Row>
						</div>
					}
				/>
			</Card>
		</Link>
	);
};

export default PostItem;
