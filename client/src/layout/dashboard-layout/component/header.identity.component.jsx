import { Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { IdentityMenuData, UserMenuData } from '../dashboard-layout.data';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../redux/user.slice';

const HeaderIdentityArea = () => {
	const dispatch = useDispatch();

	const isSignIn = useSelector((state) => state.user.isSignIn);

	const onSignOut = () => {
		dispatch(signOut());
	};

	return (
		<>
			{isSignIn ? (
				<>
					<Button shape='circle' icon={<BellOutlined />} />
					<Dropdown
						overlay={<UserMenuData onSignOut={onSignOut} />}
						trigger={['click']}
						placement='bottomRight'
					>
						<Avatar
							size={40}
							style={{ marginBottom: '3px', marginLeft: '20px' }}
							src='https://bookingmedtravel.com/img/userimage.png'
						/>
					</Dropdown>
				</>
			) : (
				<>
					<Dropdown
						overlay={<IdentityMenuData />}
						trigger={['click']}
						placement='bottomRight'
					>
						<Button type='primary' shape='round' icon={<UserOutlined />}>
							Tài khoản
						</Button>
					</Dropdown>
				</>
			)}
		</>
	);
};

export default HeaderIdentityArea;
