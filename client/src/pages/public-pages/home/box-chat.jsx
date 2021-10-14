import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import { CommentOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from './chat.slice';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8000';

const BoxChat = () => {
	const [chats, setChats] = useState([]);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const doChat = (values) => {
		if (values.content) {
			form.resetFields();
			dispatch(createChat(values));
		}
	};

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on('ChatRoom', (data) => {
			setChats(data);
		});
		return () => socket.disconnect();
	}, []);

	return (
		<div>
			<div style={{ marginTop: '15px' }}>
				<Card
					title={
						<div>
							<CommentOutlined />
							{' Phòng chat'}
						</div>
					}
				>
					<Comment
						avatar={
							<div className='comment-avatar-container'>
								<Avatar
									className='avatar'
									src='https://bookingmedtravel.com/img/userimage.png'
									alt='User'
								/>
							</div>
						}
						content={
							<Form
								style={{ marginBottom: '50px' }}
								form={form}
								name='chat'
								className='chat-form'
								onFinish={doChat}
							>
								<Form.Item name='content'>
									<Input autocomplete='off' />
								</Form.Item>
							</Form>
						}
					/>
					<List
						style={{ marginTop: '-40px' }}
						className='comment-list'
						itemLayout='horizontal'
						dataSource={chats}
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
		</div>
	);
};

export default BoxChat;
