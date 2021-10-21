const express = require('express');
const auth = require('../middleware/auth');
const { success, error } = require('./responseApi');

module.exports = (Collection, auth) => {
	// ======
	// Create
	// ======
	const create = (req, res) => {
		const newEntry = req.body;
		Collection.create(newEntry, (e, newEntry) => {
			if (e) return res.status(400).json(error(e.message, res.statusCode));
			else return res.status(200).json(success(newEntry, 'OK', res.statusCode));
		});
	};

	// =========
	// Read many
	// =========
	const readMany = (req, res) => {
		let query = res.locals.query || {};
		console.log(Collection);
		Collection.find(query, (e, result) => {
			if (e) return res.status(400).json(error(e.message, res.statusCode));
			else return res.status(200).json(success(result, 'OK', res.statusCode));
		});
	};

	// ========
	// Read one
	// ========
	const readOne = (req, res) => {
		const { _id } = req.params;
		Collection.findById(_id, (e, result) => {
			if (e) return res.status(400).json(error(e.message, res.statusCode));
			else return res.status(200).json(success(result, 'OK', res.statusCode));
		});
	};

	// ======
	// Update
	// ======
	const update = (req, res) => {
		const changedEntry = req.body;
		Collection.update({ _id: req.params._id }, { $set: changedEntry }, (e, result) => {
			if (e) return res.status(400).json(error(e.message, res.statusCode));
			else return res.status(200).json(success(result, 'OK', res.statusCode));
		});
	};

	// ======
	// Remove
	// ======
	const remove = (req, res) => {
		Collection.remove({ _id: req.params._id }, (e) => {
			if (e) return res.status(400).json(error(e.message, res.statusCode));
			else res.sendStatus(200);
		});
	};

	// ======
	// Routes
	// ======

	let router = express.Router();

	if (auth?.create) router.post('/', auth.create, create);
	else router.post('/', create);
	if (auth?.readMany) router.get('/', auth.readMany, readMany);
	else router.get('/', readMany);
	if (auth?.readOne) router.post('/:_id', auth.readOne, readOne);
	else router.post('/:_id', readOne);
	if (auth?.update) router.post('/:_id', auth.update, update);
	else router.post('/:_id', update);
	if (auth?.remove) router.post('/:_id', auth.remove, remove);
	else router.post('/:_id', remove);

	router.get('/', readMany);
	router.get('/:_id', readOne);
	router.post('/:_id', update);
	router.post('/:_id', remove);

	return router;
};
