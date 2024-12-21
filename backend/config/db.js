require("dotenv").config();
const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const mongoUri = process.env.DB_URI;
  if (!mongoUri) {
    throw new Error("MongoDB URI is undefined. Check your .env file.");
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
