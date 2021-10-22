import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdentityModalVisible } from "../../../redux/settings.slice";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const SignInSignUpModal = () => {
	const dispatch = useDispatch();
	const isIdentityModalVisible = useSelector((state) => state.settings.isIdentityModalVisible);

	const handleOk = () => {
		dispatch(setIdentityModalVisible(false));
	};

	const handleCancel = () => {
		dispatch(setIdentityModalVisible(false));
	};

	return (
		<>
			<Modal
				visible={isIdentityModalVisible}
				title={null}
				footer={null}
				closable={false}
				onOk={handleOk}
				onCancel={handleCancel}
				size="small"
			>
				<Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: "Please input your Username!" }]}
					>
						<Input
							size="large"
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Tên đăng nhập"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: "Please input your Password!" }]}
					>
						<Input
							size="large"
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
							size="large"
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
			</Modal>
		</>
	);
};
