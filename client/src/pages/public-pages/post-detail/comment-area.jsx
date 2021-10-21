import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from './comment.slice';
import { getPost } from '../../../redux/post.slice';

const CommentArea = ({ comments, postId }) => {
	const dispatch = useDispatch();
	const requesting = useSelector((state) => state.comment.request);

	const onFinish = async (values) => {
		await dispatch(createComment({ content: values.content, postId }));
		await dispatch(getPost({ postId }));
	};

	const Editor = () => (
		<Form onFinish={onFinish}>
			<Form.Item name='content'>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item style={{ textAlign: 'right' }}>
				<Button htmlType='submit' type='primary'>
					Bình luận
				</Button>
			</Form.Item>
		</Form>
	);

	return (
		<div>
			<Card className='comment-area'>
				<Comment
					avatar={
						<div style={{ paddingBottom: '0px' }} className='comment-avatar-container'>
							<Avatar
								className='avatar'
								src='https://bookingmedtravel.com/img/userimage.png'
								alt='Han Solo'
							/>
						</div>
					}
					content={<Editor />}
				/>
				<List
					loading={requesting}
					className='comment-list'
					header={`${comments.length} lượt bình luận`}
					itemLayout='horizontal'
					dataSource={comments}
					renderItem={(item) => (
						<li>
							<Comment
								// actions={item.actions}
								author={item.author.userName}
								avatar='https://bookingmedtravel.com/img/userimage.png'
								content={item.content}
								datetime={
									<Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
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
