const express = require("express");
const router = express.Router();
const AlertSettings = require("../models/AlertSettings"); // Ensure this model exists

// Route to get alert settings
router.get("/settings", async (req, res) => {
  try {
    const settings = await AlertSettings.findOne();
    if (settings) {
      res.status(200).json(settings);
    } else {
      res.status(404).json({ message: "Alert settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching alert settings" });
  }
});

// Route to update alert settings
router.post("/settings", async (req, res) => {
  const { expirationAlertDays } = req.body;
  try {
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
