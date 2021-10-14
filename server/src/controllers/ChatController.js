const Chat = require('../models/chat');

const { success, error } = require('../utils/responseApi');

module.exports = {
	async getAll(socket) {
		try {
			const chats = await Chat.find({})
				.populate({
					path: 'author',
					select: 'userName fullName',
				})
				.sort({ createdAt: 'desc' })
				.limit(20);
			socket.emit('ChatRoom', chats);
		} catch (err) {
			socket.emit('ChatRoom', []);
		}
	},
	//authorize
	async create(req, res, next) {
		const user = req.user;

		const chat = new Chat({ author: user, content: req.body.content });
		chat.save((err, doc) => {
			if (err) next(err);
			return res.status(200).json(success(doc, 'OK', res.statusCode));
		});
	},
	//authorize
	async delete(req, res, next) {
		const chatId = req.params.chatId || '';
		Chat.findOneAndDelete({ _id: chatId }, function (err, docs) {
			if (!docs) return res.status(400).json(error('Chat không tồn tại', res.statusCode));
			return res.status(200).json(success(docs, 'OK', res.statusCode));
		});
	},
};
