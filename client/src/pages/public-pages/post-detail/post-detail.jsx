import { Card, Avatar } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import CommentArea from "./comment-area";
import { useState, useEffect } from "react";
import "./post-detail.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readOnePost } from "../../../redux/post.slice";

export const PostDetailPage = () => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const post = useSelector((state) => state.post.post) || null;

	useEffect(() => {
		const params = { _id: postId };
		dispatch(readOnePost({ params }));
	}, []);

	useEffect(() => {
		if (post) {
			console.log();
		}
	}, [post]);

	const [vote, setVote] = useState(0);

	const handleVote = (type) => {
		if (type === "upVote") {
			vote === 1 ? setVote(0) : setVote(1);
		} else {
			vote === -1 ? setVote(0) : setVote(-1);
		}
	};

	return (
		post && (
			<div className="post-detail-page">
				<Card className="content-area">
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
							<div style={{ textAlign: "justify" }}>
								<h2>{post.title}</h2>
								<td dangerouslySetInnerHTML={{ __html: post.content }} />
							</div>
						}
					/>
				</Card>
				<CommentArea postId={post._id} />
			</div>
		)
	);
};
