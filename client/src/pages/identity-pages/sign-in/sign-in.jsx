import { useLocation, Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignUp, setIsSignIn, signIn } from "../../../redux/user.slice";
import Cookies from "js-cookies";

export const SignInPage = (values) => {
	const dispatch = useDispatch();
	const isSignIn = useSelector((state) => state.user.isSignIn);
	const auth = Cookies.getItem("auth");
	const { state } = useLocation();

	useEffect(() => {
		dispatch(setIsSignUp(false));
		return () => dispatch(setIsSignIn(false));
	}, [dispatch]);

	const SignIn = (values) => {
		dispatch(signIn(values));
	};
	if (isSignIn || auth) return <Redirect to={state?.from || "/"} />;

	const LogoHeader = () => {
		return (
			<div style={{ width: "100%", textAlign: "center" }}>
				<Link to="/">
					<img src={`${process.env.PUBLIC_URL}/Logo.png`} alt="" />
				</Link>
			</div>
		);
	};

	return (
		<Card title={<LogoHeader />} style={{ width: 400 }}>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={SignIn}
			>
				<Form.Item
					name="userName"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
				<Form.Item hidden>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Ghi nhớ</Checkbox>
					</Form.Item>

					<Link style={{ float: "right" }} to="/identity/forgot-password">
						Quên mật khẩu
					</Link>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						style={{ width: "100%" }}
					>
						Sign In
					</Button>
				</Form.Item>
				<div style={{ float: "left" }}>
					Or <Link to="/identity/sign-up"> Sign Up Now!</Link>
				</div>
			</Form>
		</Card>
	);
};
