const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Veuillez spécifier le type de rapport"],
    enum: ["stock", "sales", "employees", "custom"],
  },
  title: {
    type: String,
    default: function () {
      return `Rapport ${this.type} - ${new Date().toLocaleDateString()}`;
    },
  },
  description: {
    type: String,
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  filters: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
