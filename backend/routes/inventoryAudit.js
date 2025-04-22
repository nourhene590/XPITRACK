// backend/routes/inventoryAudit.js
const express = require("express");
const router = express.Router();
const InventoryAudit = require("../models/InventoryAudit");

// Get all audit entries
router.get("/", async (req, res) => {
  const audits = await InventoryAudit.find().sort({ createdAt: -1 });
  res.json(audits);
});

// Add new audit
router.post("/", async (req, res) => {
  const { product, systemQty, physicalQty } = req.body;
  const difference = physicalQty - systemQty;

  try {
    const newAudit = new InventoryAudit({
      product,
      systemQty,
      physicalQty,
      difference,
    });

    const savedAudit = await newAudit.save();
    res.status(201).json(savedAudit);
  } catch (error) {
    res.status(400).json({ message: "Error saving audit", error });
  }
});

// Delete audit entry
router.delete("/:id", async (req, res) => {
  try {
    await InventoryAudit.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting audit", error });
  }
});

module.exports = router;
