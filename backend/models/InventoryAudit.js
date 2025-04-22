// backend/models/InventoryAudit.js
const mongoose = require("mongoose");

const inventoryAuditSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  systemQty: {
    type: Number,
    required: true,
  },
  physicalQty: {
    type: Number,
    required: true,
  },
  difference: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InventoryAudit", inventoryAuditSchema);
