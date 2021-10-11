import { useState } from "react";
import { useLocation, Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const SignInPage = (values) => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const SignIn = () => {
		const isSuccess = true; //Đăng nhập thành công hay không?!
		console.log("Received values of form: ", values);
		if (isSuccess) setRedirectToReferrer(true);
	};
	const { state } = useLocation();
	if (redirectToReferrer) return <Redirect to={state?.from || "/public"} />;

	const LogoHeader = () => {
		return (
			<Link to="/public">
				<img
					style={{ width: "100%" }}
					src="https://logonoid.com/images/codingame-logo.png"
					alt=""
				/>
			</Link>
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
					name="username"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Tên đăng nhập"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Mật khẩu"
					/>
				</Form.Item>
				<Form.Item>
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
						Đăng nhập
					</Button>
				</Form.Item>
				<div style={{ float: "left" }}>
					Hoặc <Link to="/identity/sign-up">đăng ký ngay!</Link>
				</div>
			</Form>
		</Card>
	);
};
