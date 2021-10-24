import { Card, Comment, Avatar, List, Input, Tooltip, Popconfirm } from "antd";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import { createChat, deleteChat } from "../../../redux/chat.slice";
import Cookies from "js-cookies";
const isDevelop = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const BoxChat = () => {
	const auth = Cookies.getItem("auth");
	const role = Cookies.getItem("role");
	const dispatch = useDispatch();
	const [chats, setChats] = useState([]);
	const [chat, setChat] = useState("");

	const onChatChange = (e) => {
		setChat(e.target.value);
	};

	const onSubmitChat = (e) => {
		const body = {
			content: e.target.value,
		};
		if (body.content) {
			dispatch(createChat({ body }));
			setChat("");
		}
	};

	const onDeleteChat = (_id) => {
		const params = { _id };
		dispatch(deleteChat({ params }));
	};

	useEffect(() => {
		const socket = isDevelop
			? socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)
			: socketIOClient();
		socket.on("ChatRoom", (data) => {
			setChats(data);
		});
		return () => socket.disconnect();
	}, []);

	const actions = (_id) => {
		return [
			<Popconfirm
				placement="rightTop"
				title="Do you want to delete this chat?"
				onConfirm={() => onDeleteChat(_id)}
				okText="Yes"
				cancelText="No"
			>
				<span key="delete-chat">delete</span>
			</Popconfirm>,
		];
	};
	const chatItem = (item) => {
		return (
			<li>
				<Comment
					actions={role === "Admin" || "Mod" ? actions(item._id) : null}
					author={item.author.userName}
					avatar="https://bookingmedtravel.com/img/userimage.png"
					content={item.content}
					datetime={
						<Tooltip title={moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
							<span>{moment(item.createdAt).fromNow()}</span>
						</Tooltip>
					}
				/>
			</li>
		);
	};

	return (
		<div>
			<Card
				title={
					<>
						<CommentOutlined />
						{" BOX CHAT"}
					</>
				}
			>
				{auth && (
					<Comment
						avatar={
							<Avatar
								className="avatar"
								src="https://bookingmedtravel.com/img/userimage.png"
								alt="User"
							/>
						}
						content={
							<Input
								value={chat}
								onChange={onChatChange}
								onPressEnter={onSubmitChat}
								autoComplete="off"
							/>
						}
					/>
				)}
				<List
					loading={chats.length === 0}
					className="comment-list"
					itemLayout="horizontal"
					dataSource={chats}
					renderItem={chatItem}
				/>
			</Card>
		</div>
	);
};

export default BoxChat;
