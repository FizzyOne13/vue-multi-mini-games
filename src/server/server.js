const dotenv = require("dotenv");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const roomStart = require("./room");
const roomSetup = require("./backend");

dotenv.config();
const app = express();

const httpServer = createServer(app);
const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:5173"] },
});

const rooms = [];

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  roomStart(io, socket, rooms);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});
