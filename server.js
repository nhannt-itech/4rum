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

if (process.env.NODE_ENV !== "production") require("dotenv").config;
const PORT = process.env.PORT || 5000;

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

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(routes);
app.use(errorHandler);

try {
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("MongoDb connected successfully!");
} catch (error) {
	console.log(error);
}

//build mode
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

var server = app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});

// Socket.io
const io = require("socket.io")(server);

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
