// === === === creating === === === //
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 443;
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// === === === connecting with data base === === === //

require("./Database/connection");

// === === === routers === === === //

const userout = require("./Routers/userouter");
const { Socket } = require("socket.io");

app.use(bodyParser.json());
app.use(fileUpload());
app.use("/api", userout);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`listing to this ${PORT} `);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData.userid);
    socket.emit(`connected with ${userData.userid}`);
    console.log(`connected with ${userData.userid}`);
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined chat with " + room);
  });
});
