const mongoose = require("mongoose");
require("dotenv").config();

// Suppress warning (optional but recommended)
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    // Use the MONGO_URI from .env file, if not fallback to a default URI (for development purposes only).
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("❌ MongoDB URI is not set in the .env file");
      process.exit(1); // Exit if URI is not found
    }

    // Connect to MongoDB using mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1); // Exit with failure if the connection fails
  }
};

module.exports = connectDB;
