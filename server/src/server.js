const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(morgan('tiny'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));
app.use(routes);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

try {
	mongoose.connect(process.env.MONGO_DB_SECRET, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('MongoDb connected successfully!');
} catch (error) {
	console.log(error);
}

/**
 * Any error handler middleware must be added AFTER you define your routes.
 */

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
