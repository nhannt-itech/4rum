import { useLocation, Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSignUp, signIn } from '../../../redux/user.slice';

export const SignInPage = (values) => {
	const dispatch = useDispatch();
	const isSignIn = useSelector((state) => state.user.isSignIn);

	dispatch(setIsSignUp(false));

	const SignIn = (values) => {
		dispatch(signIn(values));
	};
	const { state } = useLocation();
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
				onFinish={SignIn}
			>
				<Form.Item
					name='userName'
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Tên đăng nhập'
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
					<Form.Item name='remember' valuePropName='checked' noStyle>
						<Checkbox>Ghi nhớ</Checkbox>
					</Form.Item>

					<Link style={{ float: 'right' }} to='/identity/forgot-password'>
						Quên mật khẩu
					</Link>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						style={{ width: '100%' }}
					>
						Đăng nhập
					</Button>
				</Form.Item>
				<div style={{ float: 'left' }}>
					Hoặc <Link to='/identity/sign-up'>đăng ký ngay!</Link>
				</div>
			</Form>
		</Card>
	);
};
