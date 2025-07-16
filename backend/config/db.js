const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connection with the DB is succesful");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Connection with the DB is successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;