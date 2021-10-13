import { useLocation, Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signUp } from '../../../redux/user.slice';
import { useSelector, useDispatch } from 'react-redux';

export const SignUpPage = () => {
	const isSignUp = useSelector((state) => state.user.isSignUp);
	const isSignIn = useSelector((state) => state.user.isSignIn);

	const dispatch = useDispatch();

	const SignUp = (values) => {
		dispatch(signUp(values));
	};
	const { state } = useLocation();
	if (isSignUp) return <Redirect to='/identity/sign-in' />;
	if (isSignIn) return <Redirect to={state?.from || '/'} />;

	const LogoHeader = () => {
		return (
			<Link to='/public'>
				<img
					style={{ width: '100%' }}
					src='https://logonoid.com/images/codingame-logo.png'
					alt=''
				/>
			</Link>
		);
	};

	return (
		<Card title={<LogoHeader />} style={{ width: 400 }}>
			<Form
				name='normal_login'
				className='login-form'
				initialValues={{ remember: true }}
				onFinish={SignUp}
			>
				<Form.Item
					name='userName'
					rules={[{ required: true, message: 'Tên người dùng không được bỏ trống!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Tên người dùng'
					/>
				</Form.Item>
				<Form.Item
					name='fullName'
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Họ và tên'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Mật khẩu'
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						style={{ width: '100%' }}
					>
						Đăng ký
					</Button>
				</Form.Item>
				<div style={{ float: 'left' }}>
					Bạn đã có tài khoản? <Link to='/identity/sign-in'>Đăng nhập!</Link>
				</div>
				<br />
				<Link style={{ float: 'left' }} to='/identity/forgot-password'>
					Quên mật khẩu
				</Link>
			</Form>
		</Card>
	);
};
