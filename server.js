const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middleware/error-handler");
const app = express();
const ChatController = require("./controllers/ChatController");
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) require("dotenv").config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
	origin: function (origin, callback) {
		if ([process.env.ALLOWED_ORIGINS].indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

isProduction ? app.use(cors()) : app.use(cors(corsOptions));
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

if (isProduction) {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

var server = app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});

var io;
!isProduction
	? (io = io =
			require("socket.io")(server, {
				cors: corsOptions,
			}))
	: (io = require("socket.io")(server));

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
