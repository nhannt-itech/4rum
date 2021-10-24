/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readManyPost } from "../../../redux/post.slice";
import "./post.styles.scss";
import { Input, Col, Row, Button, Spin, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import PostItem from "./post-item";
import Cookies from "js-cookies";

export const PostPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = Cookies.getItem("auth");

	const postArr = useSelector((state) => state.post.arr);
	const isRequesting = useSelector((state) => state.post.requesting);

	useEffect(() => {
		dispatch(readManyPost());
	}, []);

	const responsive = {
		post: {
			xs: 24,
			md: 24,
			lg: 12,
		},
		search: {
			xs: 24,
			sm: {
				offset: 4,
				span: 20,
			},
			md: {
				offset: 12,
				span: 12,
			},
		},
	};

	return (
		<div>
			{auth && (
				<Row className="post-page-search">
					<Col {...responsive.search}>
						<Input.Group compact>
							<Input.Search
								disabled
								className="input"
								placeholder="Tìm kiếm bài viết..."
								enterButton
							/>
							<Button
								onClick={() => history.push("/create-post")}
								className="button"
								icon={<EditOutlined />}
							>
								Viết bài
							</Button>
						</Input.Group>
					</Col>
				</Row>
			)}
			<Row gutter={[16, 20]}>
				{isRequesting ? (
					<Card loading={{ isRequesting }} style={{ width: "100%" }} />
				) : (
					postArr.map((item, index) => (
						<Col key={index} {...responsive.post}>
							<PostItem post={item}></PostItem>
						</Col>
					))
				)}
			</Row>
		</div>
	);
};
