const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const path = require("path");
const errorHandler = require("./middleware/error-handler");
const app = express();
const ChatController = require("./controllers/ChatController");

const PORT = process.env.PORT || 8000;

var corsOptions = {
	origin: function (origin, callback) {
		if ([process.env.ALLOWED_ORIGINS].indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(morgan("tiny"));
app.use(routes);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "client", "build")));
require("dotenv").config();

// if (process.env.NODE_ENV !== "production") {
// 	require("dotenv").config();
// }

try {
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("MongoDb connected successfully!");
} catch (error) {
	console.log(error);
}

/**
 * Any error handler middleware must be added AFTER you define your routes.
 */

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Right before your app.listen(), add this:
var server = app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});

// Socket.io
const io = require("socket.io")(server, {
	cors: corsOptions,
});

let interval;
io.on("connection", (socket) => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => {
		ChatController.getAll(socket);
	}, 1000);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});