const { Chat } = require('../models');

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
				.limit(50);
			socket.emit('ChatRoom', chats);
		} catch (err) {
			socket.emit('ChatRoom', []);
		}
	},

	async create(req, res, next) {
		const reqData = {
			content: req.body.content,
			author: req.user,
		};
		try {
			const doc = await Chat.create(new Chat(reqData));
			return res.status(200).json(success(doc, 'OK', res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		const _id = req.query._id,
			user = req.user;
		try {
			const condition = user.Role === 'User' ? { _id, author: user._id } : { _id };
			const doc = await Chat.findOneAndDelete(condition);
			return res.status(200).json(success(doc, 'OK', res.statusCode));
		} catch (err) {
			next(err);
		}
	},
};
