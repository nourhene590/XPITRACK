const express = require("express");
const Audit = require("../models/Audit");
const router = express.Router();

// Fetch all audit entries
router.get("/", async (req, res) => {
  try {
    const audits = await Audit.find();
    res.json(audits);
  } catch (err) {
    res.status(500).json({ message: "Error fetching audit data", error: err });
  }
});

// Add a new audit entry
router.post("/add", async (req, res) => {
  const { product, systemQty, physicalQty, difference } = req.body;

  try {
    const newAudit = new Audit({ product, systemQty, physicalQty, difference });
    await newAudit.save();
    res.status(201).json(newAudit);
  } catch (err) {
    res.status(400).json({ message: "Error adding audit data", error: err });
  }
});

// Delete an audit entry
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Audit.findByIdAndDelete(id);
    res.json({ message: "Audit entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting audit entry", error: err });
  }
});

module.exports = router;
