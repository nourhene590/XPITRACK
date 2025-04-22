const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Veuillez ajouter un nom"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Veuillez ajouter un email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez ajouter un email valide",
      ],
    },
    role: {
      type: String,
      required: [true, "Veuillez ajouter un rôle"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department: {
      type: String,
      default: "General",
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: [true, "Veuillez ajouter un mot de passe"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // Mongoose automatically adds createdAt and updatedAt
  }
);

// Middleware to hash the password before saving
EmployeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("Employee", EmployeeSchema);
