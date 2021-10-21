import { useLocation, Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signUp } from "../../../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";

export const SignUpPage = () => {
	const isSignUp = useSelector((state) => state.user.isSignUp);
	const isSignIn = useSelector((state) => state.user.isSignIn);

	const dispatch = useDispatch();

	const SignUp = (values) => {
		dispatch(signUp(values));
	};
	const { state } = useLocation();
	if (isSignUp) return <Redirect to="/identity/sign-in" />;
	if (isSignIn) return <Redirect to={state?.from || "/"} />;

	const LogoHeader = () => {
		return (
			<Link to="/">
				<div style={{ width: "100%", textAlign: "center" }}>
					<Link to="/">
						<img src={`${process.env.PUBLIC_URL}/Logo.png`} alt="" />
					</Link>
				</div>
			</Link>
		);
	};

	return (
		<Card title={<LogoHeader />} style={{ width: 400 }}>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={SignUp}
			>
				<Form.Item
					name="userName"
					rules={[
						{ required: true, message: "Please input your Username!" },
						{ min: 6, message: "Must be at least 6 characters!" },
					]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
				</Form.Item>
				<Form.Item
					name="fullName"
					rules={[{ required: true, message: "Please input your Full Name!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Full Name"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						style={{ width: "100%" }}
					>
						Sign Up
					</Button>
				</Form.Item>
				<div style={{ float: "left" }}>
					Already have account? <Link to="/identity/sign-in">Sign In Now!</Link>
				</div>
				<Link hidden style={{ float: "left" }} to="/identity/forgot-password">
					Quên mật khẩu
				</Link>
			</Form>
		</Card>
	);
};
