import { Card, Col, Row, Avatar } from "antd";
import { CaretUpOutlined, CaretDownOutlined, CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const PostItem = ({ post }) => {
	return (
		<Link to="/post/post-detail">
			<Card hoverable bordered={false}>
				<Card.Meta
					title={post.Title}
					avatar={
						<div className="post-vote-avatar">
							<Avatar src={post.ImageUrl} />
							<div className="post-vote">
								<Row>
									<Col>
										<CaretUpOutlined />
									</Col>
									<Col>{post.UpVote}</Col>
								</Row>
								<Row>
									<Col>
										<CaretDownOutlined />
									</Col>
									<Col>{post.DownVote}</Col>
								</Row>
							</div>
						</div>
					}
					description={
						<div>
							<div className="post-summary">{post.Summary}</div>

							<Row className="post-additional-info">
								<Col span={16}>bởi: {post.CreateBy}</Col>
								<Col className="total-comment" span={4}>
									{post.TotalComment} <CommentOutlined />
								</Col>
								<Col className="create-at" span={4}>
									{post.CreateAt}
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
