const { Comment, Post } = require("../models");
const { success } = require("../utils/responseApi");
const mongoose = require("mongoose");

module.exports = {
	async create(req, res, next) {
		const reqData = {
			...({ post, content } = req.body),
			author: req.user,
		};
		try {
			const doc = await Comment.create(new Comment(reqData));
			await Post.updateOne({ _id: doc.post }, { $push: { comments: doc } });
			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	async readMany(req, res, next) {
		const offset = parseInt(req.query.offset) || 0,
			pagesize = parseInt(req.query.pagesize) || 10,
			post = req.query.post,
			sort = { createdAt: "desc" },
			select = "-comments",
			populate = {
				path: "author",
				select: "userName fullName",
			};

		try {
			const docs = await Comment.find({ post })
				.limit(pagesize)
				.skip(offset)
				.populate(populate)
				.select(select)
				.sort(sort);
			return res.status(200).json(success(docs, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},

	//readOne

	async update(req, res, next) {
		const _id = req.query._id,
			reqData = ({ content } = req.body),
			user = req.user;
		try {
			const condition = user.Role === "User" ? { _id, author: user._id } : { _id };
			const doc = await Comment.findOneAndUpdate(condition, reqData);
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
			const doc = await Comment.findOneAndDelete(condition);
			Post.updateOne(
				{ _id: doc.post },
				{
					$pull: {
						comments: _id,
					},
				}
			);
			return res.status(200).json(success(doc, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	},
};
