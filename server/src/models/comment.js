const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.Now,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
