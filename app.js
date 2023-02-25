// === === === creating === === === //
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 443;
const app = express();
const path = require("path");
var bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")

// === === === connecting with data base === === === //

require("./Database/connection");

// === === === routers === === === //

const userout = require("./Routers/userouter");

app.use(bodyParser.json())
app.use(fileUpload())
app.use("/api", userout);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`listing to this ${PORT} `);
});
