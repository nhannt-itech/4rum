import { Input, Col, Row } from "antd";
import NewsItem from "./news-item";
import "./news.styles.scss";

const news = {
	Title: "Tiêu đề",
	ImageUrl:
		"https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/c6b8d5cfe9ff4b56887e8751d37a1c61.png",
	Rating: 5,
	Summary: "Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ...",
	CreateBy: "Rynoz",
	CreateAt: "21/05/2000",
	ViewCount: 100,
};

const responsive = {
	news: {
		xs: 24,
		sm: 12,
		md: 8,
	},
	search: {
		xs: 24,
		sm: {
			offset: 12,
			span: 12,
		},
		md: {
			offset: 14,
			span: 10,
		},
	},
};

export const NewsPage = () => {
	return (
		<div>
			<Row gutter={[16, 20]} className="news-page-search">
				<Col {...responsive.search}>
					<Input.Group compact>
						<Input.Search placeholder="Tìm kiếm bài viết..." enterButton />
					</Input.Group>
				</Col>
			</Row>
			<Row gutter={[16, 20]}>
				{[...Array(9)].map((item, index) => (
					<Col {...responsive.news} key={index}>
						<NewsItem news={news}></NewsItem>
					</Col>
				))}
			</Row>
		</div>
	);
};
