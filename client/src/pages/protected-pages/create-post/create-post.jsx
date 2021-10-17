import { Card, Button, Col, Row, Form, Input, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { NotifyHelper, extractHTML } from '../../../helpers';
import { createPost } from '../../../redux/post.slice';
import { useDispatch } from 'react-redux';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

export const CreatePostPage = () => {
	const [editor, setEditor] = useState(BraftEditor.createEditorState(''));
	const dispatch = useDispatch();

	const submitPost = (values) => {
		const content = editor.toHTML();
		const summary = extractHTML(content);
		if (summary.length < 50) {
			NotifyHelper.warning('Bài viết phải trên 50 ký tự');
		} else if (summary > 1000) {
			NotifyHelper.warning('Bài viết của bạn hơn 1000 ký tự');
		} else {
			dispatch(createPost({ summary, content, ...values }));
		}
	};

	const children = [];
	for (let i = 10; i < 36; i++) {
		children.push(
			<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>
		);
	}

	const responsiveForm = {
		labelCol: {
			xs: 24,
			md: 24,
			lg: 2,
		},
		wrapperCol: {
			xs: 24,
			md: 24,
			lg: 22,
		},
	};

	return (
		<div>
			<Card>
				<Form onFinish={submitPost} {...responsiveForm}>
					<Col span={24}>
						<Form.Item
							label='Tiêu đề'
							rules={[{ required: true, message: 'Bạn phải nhập tiêu đề' }]}
							name='title'
						>
							<Input title='sas' />
						</Form.Item>
					</Col>
					<Col>
						<BraftEditor
							contentStyle={{ height: '250px' }}
							style={{ border: 'solid 1.5px #D3D4D8' }}
							className='my-editor'
							onChange={setEditor}
							language='vi-vn'
							placeholder={<div style={{ marginTop: '15px' }}>Bạn đang nghĩ gì...</div>}
						/>
					</Col>
					<Col md={{ span: 6, offset: 18 }} xs={24}>
						<Button
							style={{ width: '100%', marginTop: '20px' }}
							type='primary'
							htmlType='submit'
							className='button'
							icon={<SendOutlined />}
						>
							Đăng
						</Button>
					</Col>
				</Form>
			</Card>
		</div>
	);
};
