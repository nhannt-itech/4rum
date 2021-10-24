const { Post, Comment } = require("../models");
const { success, error } = require("../utils/responseApi");

module.exports = {
	async create(req, res, next) {
		const reqData = {
			...({ title, content, summary } = req.body),
			author: req.user,
		};
		try {
			const doc = await Post.create(new Post(reqData));
			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	async readMany(req, res, next) {
		const offset = parseInt(req.query.offset) || 0,
			pagesize = parseInt(req.query.pagesize) || 10,
			sort = { createdAt: "desc" },
			// select = "-comments",
			populate = {
				path: "author",
				select: "userName fullName",
			};

		try {
			const docs = await Post.find({})
				.limit(pagesize)
				.skip(offset)
				.populate(populate)
				// .select(select)
				.sort(sort);
			return res.status(200).json(success(docs, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	async readOne(req, res, next) {
		const _id = req.query._id,
			populate = {
				path: "author",
				select: "userName fullName",
			},
			select = "-comments";
		try {
			const doc = await Post.findById(_id).populate(populate).select(select);
			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			return res.status(400).json(error("Post is undefined", res.statusCode));
		}
	},

	async update(req, res, next) {
		const _id = req.query._id,
			reqData = ({ title, content, summary } = req.body),
			user = req.user;
		try {
			const condition = user.Role === "User" ? { _id, author: user._id } : { _id };
			const doc = await Post.findOneAndUpdate(condition, reqData);
			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		const _id = req.query._id,
			user = req.user;
		try {
			const condition = user.Role === "User" ? { _id, author: user._id } : { _id };

			const doc = await Post.findOneAndDelete(condition);
			await Comment.deleteMany({ post: _id });

			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},
};
