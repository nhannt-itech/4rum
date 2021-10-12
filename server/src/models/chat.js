const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	createAt: {
		type: Date,
		default: Date.Now,
	},
});

module.exports = mongoose.model('Chat', chatSchema);
