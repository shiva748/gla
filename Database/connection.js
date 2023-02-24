const mongoose = require("mongoose");
const url = process.env.DATABASE;
mongoose.set("strictQuery",false)
  .connect(url)
  .then(() => {
    console.log("Successfully connected to the Database");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.createConnection;
