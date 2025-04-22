const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez ajouter un nom"],
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
  password: {
    type: String,
    required: [true, "Veuillez ajouter un mot de passe"],
    minlength: 6,
    select: false, // Exclude password field by default
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to generate a JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.app.jwtSecret, {
    expiresIn: config.app.jwtExpire,
  });
};

// Method to check password validity
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
