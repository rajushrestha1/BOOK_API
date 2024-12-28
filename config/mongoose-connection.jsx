const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
const config =require("config")

mongoose
  .connect(`${config.get("MONGODB_URI")}`)
  .then(() => {
    debug("Connected to database!");
  })
  .catch((err) => {
    debug("Connection failed!", err);
    console.error("Connection Error:", err);
  });

module.exports = mongoose.connection;
