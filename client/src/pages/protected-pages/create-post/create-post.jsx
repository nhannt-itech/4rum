import { Card, Button, Col, Form, Input, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import { NotifyHelper } from '../../../helpers';
import { createPost } from '../../../redux/post.slice';
import { useDispatch } from 'react-redux';

export const CreatePostPage = () => {
	const [editor, setEditor] = useState(EditorState.createEmpty());
	const dispatch = useDispatch();

	const submitPost = (values) => {
		const summary = convertToRaw(editor.getCurrentContent())
			.blocks.map((block) => (!block.text.trim() && '\n') || block.text)
			.join('');

		if (summary.length < 50) {
			NotifyHelper.error('Bài viết phải trên 50 ký tự');
		} else {
			const content = JSON.stringify(convertToRaw(editor.getCurrentContent()));
			console.log(content);
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
					<Form.Item
						name='title'
						label='Tiêu đề'
						rules={[{ required: true, message: 'Bạn phải nhập tiêu đề' }]}
					>
						<Input />
					</Form.Item>
					<Editor onEditorStateChange={setEditor} placeholder='Bạn đang nghĩ gì...' />
					<Col md={{ span: 6, offset: 18 }} xs={24}>
						<Button
							style={{ width: '100%' }}
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
