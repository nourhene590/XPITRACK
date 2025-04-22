const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate user data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create the new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
