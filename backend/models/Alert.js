// models/Alert.js

const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  alertType: {
    type: String,
    required: true,
    enum: ["out of stock", "near expiry", "low stock"],
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
