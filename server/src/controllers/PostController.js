const Post = require('../models/Post');

const { success, error } = require('../utils/responseApi');

module.exports = {
	async getAll(req, res, next) {
		try {
			const posts = await Post.find({})
				.populate({
					path: 'author',
					select: 'userName fullName',
				})
				.sort({ createdAt: 'desc' })
				.limit(20);
			return res.status(200).json(success(posts, 'OK', res.statusCode));
		} catch (err) {
			next(err);
		}
	},
	async get(req, res, next) {
		const { postId } = req.params;
		try {
			const post = await Post.findById(postId).populate({
				path: 'author',
				select: 'userName fullName',
			});
			return res.status(200).json(success(post, 'OK', res.statusCode));
		} catch (err) {
			return next(err);
		}
	},
	//authorize
	async create(req, res, next) {
		const author = req.user;

		const { content, title, summary } = req.body;
		const post = new Post({ author, content, title, summary });
		post.save((err, doc) => {
			if (err) next(err);
			return res.status(200).json(success(doc, 'OK', res.statusCode));
		});
	},
	//authorize
	async delete(req, res, next) {
		const postId = req.params.postId || '';
		Post.findOneAndDelete({ _id: postId }, function (err, docs) {
			if (!docs) return res.status(400).json(error('Post không tồn tại', res.statusCode));
			return res.status(200).json(success(docs, 'OK', res.statusCode));
		});
	},
};
