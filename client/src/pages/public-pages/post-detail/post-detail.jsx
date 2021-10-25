/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Avatar, Skeleton } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import CommentArea from "./comment-area";
import { useState, useEffect } from "react";
import "./post-detail.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readOnePost } from "../../../redux/post.slice";
import { Redirect } from "react-router-dom";
import { resetPostStore } from "../../../redux/post.slice";

export const PostDetailPage = () => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const currentPost = useSelector((state) => state.post.currentObj) || null;
	const isAvailablePost = useSelector((state) => state.post.isAvailable);

	useEffect(() => {
		const params = { _id: postId };
		dispatch(readOnePost({ params }));
		return () => dispatch(resetPostStore());
	}, []);

	const [vote, setVote] = useState(0);

	const handleVote = (type) => {
		if (type === "upVote") {
			vote === 1 ? setVote(0) : setVote(1);
		} else {
			vote === -1 ? setVote(0) : setVote(-1);
		}
	};

	if (!isAvailablePost) return <Redirect to="/" />;

	return (
		<div className="post-detail-page">
			<Card className="content-area">
				<Skeleton loading={!currentPost} avatar active>
					{currentPost && (
						<Card.Meta
							avatar={
								<div className="panel">
									<Avatar className="avatar" src="https://bookingmedtravel.com/img/userimage.png" />
									<div hidden className="post-vote">
										<CaretUpOutlined
											onClick={() => handleVote("upVote")}
											style={vote === 1 ? { color: "#648afc" } : null}
											className="vote-button"
										/>
										<br />
										<div className="vote-number">100</div>
										<CaretDownOutlined
											onClick={() => handleVote("downVote")}
											style={vote === -1 ? { color: "#F64D4D" } : null}
											className="vote-button"
										/>
									</div>
								</div>
							}
							description={
								<div className="post-content" style={{ textAlign: "justify" }}>
									<h2>{currentPost.title}</h2>
									<div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
								</div>
							}
						/>
					)}
				</Skeleton>
			</Card>
			{currentPost && <CommentArea postId={currentPost._id} />}
		</div>
	);
};
