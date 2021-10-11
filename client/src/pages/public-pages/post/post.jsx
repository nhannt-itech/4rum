import React from "react";
import { Input, Col, Row, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PostItem from "./post-item";
import "./post.styles.scss";
import { useHistory } from "react-router-dom";

export const PostPage = () => {
	const history = useHistory();

	const post = {
		ImageUrl:
			"https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7-TTNLDjmkEAX-WVuL5&_nc_ht=scontent.fsgn13-2.fna&oh=f7ae3e325ba2161b7208a3bb1511e37a&oe=6157C29A",
		Title: "Đây là một bài viết vui",
		UpVote: 10,
		DownVote: 100,
		Summary:
			"Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ rất là tuyệt vời và thú vị, khiến bạn sẽ không buồn chán trong việc học lập trình",
		CreateAt: "10 giờ trước",
		CreateBy: "Nguyễn Thanh Nhân",
		TotalComment: 100,
	};

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
			<Row className="post-page-search">
				<Col {...responsive.search}>
					<Input.Group compact>
						<Input.Search className="input" placeholder="Tìm kiếm bài viết..." enterButton />
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
			<Row gutter={[16, 20]}>
				{[...Array(8)].map((item, index) => (
					<Col key={index} {...responsive.post}>
						<PostItem post={post}></PostItem>
					</Col>
				))}
			</Row>
		</div>
	);
};
