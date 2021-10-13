import { Card, Button, Col, Form, Input, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Editor } from 'react-draft-wysiwyg';

export const CreatePostPage = () => {
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
				<Form {...responsiveForm}>
					<Form.Item name='title' label='Tiêu đề' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='select' label='Gắn thẻ'>
						<Select
							mode='multiple'
							placeholder='Please select'
							defaultValue={['a10', 'c12']}
							style={{ width: '100%' }}
						>
							{children}
						</Select>
					</Form.Item>
					<Editor
						editorStyle={{ height: '200px', margin: '20px 0 20px 10px' }}
						wrapperClassName='demo-wrapper'
						editorClassName='demo-editor'
						placeholder='Bạn đang nghĩ gì...'
					/>
					<Col md={{ span: 6, offset: 18 }} xs={24}>
						<Button
							style={{ width: '100%' }}
							type='primary'
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
