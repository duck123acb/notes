const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

let messages = [];

app.use(express.static(__dirname));

// create interface
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {

//	socket.on("chat message", msg => {
//		const message = `${name}: ${msg}`;
//		messages.push(message);
//		io.emit("recive message", message);
//	});

	socket.on('disconnect', () => {
		///console.log('user disconnected');
	});
});

// get input from interface
server.listen(port, () => {
	console.log(`listening on *:${port}`);
});
