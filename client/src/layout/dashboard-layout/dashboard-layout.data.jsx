import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
	UserOutlined,
	UserAddOutlined,
	HomeOutlined,
	SolutionOutlined,
	NotificationOutlined,
	EditOutlined,
} from "@ant-design/icons";

export const HeaderMenuData = [
	{
		title: "Trang chủ",
		url: "/home",
		icon: HomeOutlined,
	},
	{
		title: "Khóa học",
		url: "/course",
		icon: SolutionOutlined,
	},
	{
		title: "Thảo luận",
		url: "/post",
		icon: EditOutlined,
	},
	{
		title: "Tin tức",
		url: "/news",
		icon: NotificationOutlined,
	},
];

export const IdentityMenuData = () => (
	<Menu>
		<Menu.Item>
			<Link to="/identity/sign-in">
				<UserOutlined /> Đăng nhập
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/identity/sign-up">
				<UserAddOutlined /> Đăng ký
			</Link>
		</Menu.Item>
	</Menu>
);

export const UserMenuData = ({ onSignOut }) => (
	<Menu style={{ width: "200px" }}>
		<Menu.Item>
			<Link to="/home">Thông tin của tôi</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/home">Hồ sơ của tôi</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/home">Lớp học của tôi</Link>
		</Menu.Item>
		<Menu.Item onClick={onSignOut}>Đăng xuất</Menu.Item>
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
