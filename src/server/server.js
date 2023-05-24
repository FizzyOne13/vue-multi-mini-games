const dotenv = require("dotenv");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
//const roomStart = require("./room");
//const roomSetup = require("./backend");
//const genId = require("./backend.js");
const shortId = require("shortid");

dotenv.config();
const app = express();

const httpServer = createServer(app);
const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/rpc",
      "http://localhost:5173/rpc2",
    ],
  },
});

//const rooms = [];
let room = null;

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("ask-id", (data) => {
    console.log(data);
    const roomId = shortId.generate();
    io.emit("get-id", roomId);
    console.log(
      "Socket with id " + socket.id + " got random room id " + roomId
    );
    room = roomId;
  });

  socket.on("send-id", (yourId) => {
    console.log(
      "Socket with id" + socket.id + " joined room with id " + yourId
    );
    socket.join(yourId);
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});
