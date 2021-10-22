import { Card, Comment, Avatar, List, Input, Tooltip } from "antd";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createChat } from "./chat.slice";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookies";
const isDevelop = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const BoxChat = () => {
	const auth = Cookies.getItem("auth");
	const dispatch = useDispatch();
	const [chats, setChats] = useState([]);
	const [chat, setChat] = useState("");

	const onChatChange = (e) => {
		setChat(e.target.value);
	};

	const onSubmitChat = (e) => {
		let content = e.target.value;
		if (content) {
			dispatch(createChat({ content }));
			setChat("");
		}
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

	const chatItem = (item) => {
		return (
			<li>
				<Comment
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
