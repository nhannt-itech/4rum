import { Button, Dropdown, Avatar } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { IdentityMenuData, UserMenuData } from "../dashboard-layout.data";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/user.slice";
import Cookies from "js-cookies";

const HeaderIdentityArea = () => {
	let auth = Cookies.getItem("auth");

	const dispatch = useDispatch();

	const onSignOut = () => {
		dispatch(signOut());
	};

	return (
		<>
			{auth ? (
				<>
					<Button hidden shape="circle" icon={<BellOutlined />} />
					<Dropdown
						overlay={<UserMenuData onSignOut={onSignOut} />}
						trigger={["click"]}
						placement="bottomRight"
					>
						<Avatar
							size={40}
							style={{ marginBottom: "3px", marginLeft: "20px" }}
							src="https://bookingmedtravel.com/img/userimage.png"
						/>
					</Dropdown>
				</>
			) : (
				<>
					<Dropdown overlay={<IdentityMenuData />} trigger={["click"]} placement="bottomRight">
						<Button type="primary" shape="round" icon={<UserOutlined />}>
							Account
						</Button>
					</Dropdown>
				</>
			)}
		</>
	);
};

export default HeaderIdentityArea;
