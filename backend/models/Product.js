const mongoose = require("mongoose");

const config = require("../config/config");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez ajouter un nom de produit"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Veuillez ajouter une catégorie"],
  },
  quantity: {
    type: Number,
    required: [true, "Veuillez ajouter une quantité"],
    min: 0,
  },
  expiryDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock", "Near Expiry", "Expired"],
    default: "In Stock",
  },
  snag: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update status based on quantity and expiry date
ProductSchema.pre("save", function (next) {
  // Update status based on quantity
  if (this.quantity === 0) {
    this.status = "Out of Stock";
  } else if (this.quantity <= config.limits.lowStockThreshold) {
    this.status = "Low Stock";
  } else {
    this.status = "In Stock";
  }

  // Check expiry date
  if (this.expiryDate) {
    const now = new Date();
    const expiryDate = new Date(this.expiryDate);
    const daysUntilExpiry = Math.ceil(
      (expiryDate - now) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry <= 0) {
      this.status = "Expired";
    } else if (daysUntilExpiry <= config.limits.nearExpiryDays) {
      this.status = "Near Expiry";
    }
  }

  this.updatedAt = Date.now();
  next();
});

// Check if the model already exists to prevent overwriting
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
