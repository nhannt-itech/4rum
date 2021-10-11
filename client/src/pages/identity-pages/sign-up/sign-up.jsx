import { useState } from "react";
import { useLocation, Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

export const SignUpPage = (values) => {
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
					<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
				</Form.Item>
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
				<Form.Item
					name="repassword"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Nhập lại mật khẩu"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						style={{ width: "100%" }}
					>
						Đăng ký
					</Button>
				</Form.Item>
				<div style={{ float: "left" }}>
					Bạn đã có tài khoản? <Link to="/identity/sign-in">Đăng nhập!</Link>
				</div>{" "}
				<br />
				<Link style={{ float: "left" }} to="/identity/forgot-password">
					Quên mật khẩu
				</Link>
			</Form>
		</Card>
	);
};
