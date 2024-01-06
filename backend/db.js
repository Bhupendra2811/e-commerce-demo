// db.js
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.set("strictQuery", true);
const DBConnection = async () => {
  mongoose
    .connect(
      "mongodb+srv://9898913180:9898913180@cluster0.viwzi.mongodb.net/node-setup"
      )
      .then((a) => {
        console.log("Connected to MongoDB!");
      })
      .catch((error) => {
        console.log("Database Error: " + error);
    });
} 
  
  module.exports = DBConnection