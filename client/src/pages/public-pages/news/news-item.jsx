import { Card, Rate, Tag } from "antd";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./news.styles.scss";

const NewsItem = ({ news }) => {
	return (
		<Card
			className="news-card"
			cover={<img className="avatar" alt="" src={news.ImageUrl} />}
			actions={[
				<Link to="/news">
					<UserOutlined /> {news.CreateBy}
				</Link>,
				<div>{news.CreateAt}</div>,
				<Link to="/news">
					<EyeOutlined /> {news.ViewCount}
				</Link>,
			]}
			hoverable
			bordered={false}
		>
			<Card.Meta
				title={
					<div>
						{news.Title}
						<br />
						<Rate className="title" allowHalf disabled defaultValue={news.Rating} />
					</div>
				}
				description={news.Summary}
			/>
			<br />
			<div className="tags-container">
				{[...Array(5)].map((item) => (
					<Tag className="tag" color="orange">
						example
					</Tag>
				))}
			</div>
		</Card>
	);
};

export default NewsItem;
