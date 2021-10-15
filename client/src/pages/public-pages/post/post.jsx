import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPost, deletePost } from '../../../redux/post.slice';
import './post.styles.scss';
import { Input, Col, Row, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import PostItem from './post-item';

export const PostPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const posts = useSelector((state) => state.post.posts);

	useEffect(() => {
		dispatch(getAllPost());
	}, []);

	const post = {
		ImageUrl: 'https://bookingmedtravel.com/img/userimage.png',
		Title: 'Đây là một bài viết vui',
		UpVote: 10,
		DownVote: 100,
		Summary:
			'Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ rất là tuyệt vời và thú vị, khiến bạn sẽ không buồn chán trong việc học lập trình',
		CreateAt: '10 giờ trước',
		CreateBy: 'Nguyễn Thanh Nhân',
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
			<Row className='post-page-search'>
				<Col {...responsive.search}>
					<Input.Group compact>
						<Input.Search
							className='input'
							placeholder='Tìm kiếm bài viết...'
							enterButton
						/>
						<Button
							onClick={() => history.push('/create-post')}
							className='button'
							icon={<EditOutlined />}
						>
							Viết bài
						</Button>
					</Input.Group>
				</Col>
			</Row>
			<Row gutter={[16, 20]}>
				{posts.map((item, index) => (
					<Col key={index} {...responsive.post}>
						<PostItem post={item}></PostItem>
					</Col>
				))}
			</Row>
		</div>
	);
};
