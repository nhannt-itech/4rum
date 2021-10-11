import { Button, Dropdown, Avatar, Modal } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { IdentityMenuData, UserMenuData } from "../dashboard-layout.data";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../redux/user.slice";
import { setIdentityModalVisible } from "../../../redux/settings.slice";

const HeaderIdentityArea = () => {
	const dispatch = useDispatch();

	const isLogin = useSelector((state) => state.user.isLogin);

	const onSignOut = () => {
		dispatch(signOut());
	};

	const onOpenIdentityModal = () => {
		dispatch(setIdentityModalVisible(true));
	};

	return (
		<>
			{isLogin ? (
				<>
					<Button shape="circle" icon={<BellOutlined />} />
					<Dropdown
						overlay={<UserMenuData onSignOut={onSignOut} />}
						trigger={["click"]}
						placement="bottomRight"
					>
						<Avatar
							size={40}
							style={{ marginBottom: "3px", marginLeft: "20px" }}
							src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7-TTNLDjmkEAX8zVwVa&_nc_ht=scontent.fsgn2-3.fna&oh=aa8a0050026faf0fcc1aaaff12fd039e&oe=615BB71A"
						/>
					</Dropdown>
				</>
			) : (
				<>
					{/* <Button
						type="primary"
						onClick={onOpenIdentityModal}
						shape="round"
						icon={<UserOutlined />}
					>
						Tài khoản
					</Button> */}
					<Dropdown
						overlay={<IdentityMenuData />}
						trigger={["click"]}
						placement="bottomRight"
					>
						<Button type="primary" shape="round" icon={<UserOutlined />}>
							Tài khoản
						</Button>
					</Dropdown>
				</>
			)}
		</>
	);
};

export default HeaderIdentityArea;
