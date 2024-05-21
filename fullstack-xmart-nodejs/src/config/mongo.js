const mongoose = require("mongoose");

const mongooseDb = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_URL);
    console.log("Connection to MongoDB has been established successfully.");
  } catch (err) {
    console.error("Error connect to MongoDB:", err);
  }
};

module.exports = mongooseDb;
