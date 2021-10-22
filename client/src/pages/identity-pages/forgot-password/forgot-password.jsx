import { useState } from "react";
import { useLocation, Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";

export const ForgotPasswordPage = (values) => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const SignIn = () => {
		const isSuccess = true; //Đăng nhập thành công hay không?!
		if (isSuccess) setRedirectToReferrer(true);
	};
	const { state } = useLocation();
	if (redirectToReferrer) return <Redirect to={state?.from || "/"} />;

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
						size="large"
						prefix={<MailOutlined className="site-form-item-icon" />}
						placeholder="Email hoặc tên đăng nhập"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						size="large"
						htmlType="submit"
						className="login-form-button"
						style={{ width: "100%" }}
					>
						Lấy mật khẩu mới
					</Button>
				</Form.Item>
				<div style={{ float: "left" }}>
					Bạn đã có tài khoản?
					<Link to="/identity/sign-in"> Đăng nhập ngay!</Link>
				</div>
				<br />
				<div style={{ float: "left" }}>
					<Link to="/identity/sign-up">Đăng ký tài khoản mới</Link>
				</div>
			</Form>
		</Card>
	);
};
