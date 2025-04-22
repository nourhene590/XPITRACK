// models/AlertSettings.js
const mongoose = require("mongoose");

const alertSettingsSchema = new mongoose.Schema({
  expirationAlertDays: {
    type: Number,
    required: true,
    default: 7, // Default to 7 days before expiration
  },
});

module.exports = mongoose.model("AlertSettings", alertSettingsSchema);
