import { Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, UserAddOutlined, HomeOutlined, EditOutlined } from "@ant-design/icons";

export const HeaderMenuData = [
	{
		title: "Home",
		url: "/",
		icon: HomeOutlined,
	},
	{
		title: "Share",
		url: "/post",
		icon: EditOutlined,
	},
];

export const IdentityMenuData = () => (
	<Menu>
		<Menu.Item>
			<Link to="/identity/sign-in">
				<UserOutlined /> Sign In
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/identity/sign-up">
				<UserAddOutlined /> Sign Up
			</Link>
		</Menu.Item>
	</Menu>
);

export const UserMenuData = ({ onSignOut }) => (
	<Menu style={{ width: "200px" }}>
		<Menu.Item onClick={onSignOut}>Sign Out</Menu.Item>
	</Menu>
);

export const LanguageMenuData = (
	<Menu className="language-menu-items">
		<Menu.Item>
			<img src="/images/icons/vn.png" alt="" />
			Việt Nam
		</Menu.Item>
		<Menu.Item>
			<img src="/images/icons/en.png" alt="" />
			Tiếng Anh
		</Menu.Item>
	</Menu>
);
