const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import Routes
const alertSettingsRoutes = require("./routes/alertSettingsRoutes");
const alertRoutes = require("./routes/alertRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const auditRoutes = require("./routes/auditRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

// ✅ Mount Routes
app.use("/api/alerts/settings", alertSettingsRoutes); // Mount alert settings route
app.use("/api/alerts", alertRoutes); // Mount regular alert routes
app.use("/api/users", userRoutes); // Mount user routes
app.use("/api/products", productRoutes); // Properly mount product routes
app.use("/api/audits", auditRoutes); // Mount audit routes

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
