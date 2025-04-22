const express = require("express");
const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT and check if the user is an admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId; // You can use this to track admin's ID
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Add a new employee (admin only)
router.post("/add", authenticateAdmin, async (req, res) => {
  const { name, email, role, department, phoneNumber, address, password } =
    req.body;

  try {
    // Check if employee with the given email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Cet employé existe déjà" });
    }

    // Hash the password before saving the employee
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      name,
      email,
      role,
      department,
      phoneNumber,
      address,
      password: hashedPassword, // Store hashed password
    });

    await newEmployee.save();
    res.status(201).json({
      message: "Employé ajouté avec succès",
      employee: newEmployee,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erreur lors de l'ajout de l'employé",
        error: err.message,
      });
  }
});

module.exports = router;
