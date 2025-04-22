// routes/alertSettingsRoutes.js
const express = require("express");
const router = express.Router(); // Create an instance of the Express Router
const AlertSettings = require("../models/AlertSettings");

// Route to fetch current alert settings
router.get("/", async (req, res) => {
  try {
    const settings = await AlertSettings.findOne();
    res.json(settings || { expirationAlertDays: 7 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching alert settings" });
  }
});

// Route to update alert settings
router.post("/", async (req, res) => {
  try {
    const { expirationAlertDays } = req.body;
    let settings = await AlertSettings.findOne();
    if (settings) {
      settings.expirationAlertDays = expirationAlertDays;
    } else {
      settings = new AlertSettings({ expirationAlertDays });
    }
    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error saving alert settings" });
  }
});

module.exports = router;
