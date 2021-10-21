import { Card, Comment, Avatar, List, Input, Tooltip } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { readManyComment, createComment } from "../../../redux/comment.slice";
import { useEffect, useState } from "react";
import Cookies from "js-cookies";

const CommentArea = ({ postId }) => {
	const auth = Cookies.getItem("auth");
	const dispatch = useDispatch();

	const requesting = useSelector((state) => state.comment.requesting);
	const comments = useSelector((state) => state.comment.comments);
	const commentIsChange = useSelector((state) => state.comment.isChange);
	const pagesize = useSelector((state) => state.comment.pagesize);

	const [contentComment, setContentComment] = useState("");
	const onChangeComment = (e) => {
		setContentComment(e.target.value);
	};
	const onSubmitComment = (e) => {
		const content = e.target.value;
		if (content) {
			const body = { content, post: postId };
			dispatch(createComment({ body }));
			setContentComment(null);
		}
	};

	useEffect(() => {
		const params = { post: postId, pagesize: 10 };
		dispatch(readManyComment({ params }));
	}, []);

	useEffect(() => {
		if (commentIsChange) {
			const params = { post: postId, pagesize: pagesize };
			dispatch(readManyComment({ params }));
		}
	}, [commentIsChange]);

	return (
		<div>
			<Card className="comment-area">
				{auth && (
					<Comment
						avatar={
							<div style={{ paddingBottom: "0px" }} className="comment-avatar-container">
								<Avatar
									className="avatar"
									src="https://bookingmedtravel.com/img/userimage.png"
									alt="Han Solo"
								/>
							</div>
						}
						content={
							<Input
								value={contentComment}
								onPressEnter={onSubmitComment}
								onChange={onChangeComment}
								style={{ marginBottom: "40px" }}
							/>
						}
					/>
				)}

				<List
					loading={requesting}
					className="comment-list"
					header={`${comments.length} Comments`}
					itemLayout="horizontal"
					dataSource={comments}
					renderItem={(item) => (
						<li>
							<Comment
								// actions={item.actions}
								author={item.author.userName}
								avatar="https://bookingmedtravel.com/img/userimage.png"
								content={item.content}
								datetime={
									<Tooltip title={moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
										<span>{moment(item.createdAt).fromNow()}</span>
									</Tooltip>
								}
							/>
						</li>
					)}
				/>
			</Card>
		</div>
	);
};

export default CommentArea;
