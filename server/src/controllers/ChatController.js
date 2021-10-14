const Chat = require('../models/chat');
const User = require('../models/user');

const { success, error } = require('../utils/responseApi');

module.exports = {
	async getAll(req, res, next) {
		try {
			const chats = await Chat.find({})
				.populate({
					path: 'author',
					select: 'userName fullName',
				})
				.sort({ createdAt: 'desc' })
				.limit(20);
			return res.status(200).json(success(chats, 'OK', res.statusCode));
		} catch (err) {
			next(err);
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
	async delete(req, res, next) {
		const chatId = req.params.chatId || '';
		Chat.findOneAndDelete({ _id: chatId }, function (err, docs) {
			if (!docs) return res.status(400).json(error('Chat không tồn tại', res.statusCode));
			return res.status(200).json(success(docs, 'OK', res.statusCode));
		});
	},
};
