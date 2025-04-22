const Employee = require('../models/Employee');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Obtenir tous les employés
// @route   GET /api/employees
// @access  Private/Admin
exports.getEmployees = async (req, res, next) => {
  try {
    // Construire la requête
    let query;
    
    // Copier req.query
    const reqQuery = { ...req.query };
    
    // Champs à exclure
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Supprimer les champs à exclure de reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Créer la chaîne de requête
    let queryStr = JSON.stringify(reqQuery);
    
    // Créer les opérateurs ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Trouver les employés
    query = Employee.find(JSON.parse(queryStr));
    
    // Sélection des champs
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Tri
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Employee.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Exécuter la requête
    const employees = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: employees.length,
      pagination,
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir un employé par ID
// @route   GET /api/employees/:id
// @access  Private/Admin
exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Créer un nouvel employé
// @route   POST /api/employees
// @access  Private/Admin
exports.createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, role, password } = req.body;
    
    // Vérifier si l'email existe déjà
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    // Créer d'abord un utilisateur
    const user = await User.create({
      name,
      email,
      password: password || 'password123', // Mot de passe par défaut
      role: role === 'Manager' ? 'manager' : 'user',
    });
    
    // Créer l'employé lié à cet utilisateur
    const employee = await Employee.create({
      name,
      email,
      role,
      userId: user._id,
    });
    
    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mettre à jour un employé
// @route   PUT /api/employees/:id
// @access  Private/Admin
exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    
    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    // Mettre à jour l'utilisateur associé si nécessaire
    if (employee.userId) {
      await User.findByIdAndUpdate(employee.userId, {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role === 'Manager' ? 'manager' : 'user',
      });
    }
    
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprimer un employé
// @route   DELETE /api/employees/:id
// @access  Private/Admin
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    
    // Supprimer l'utilisateur associé
    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId);
    }
    
    await employee.remove();
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir les employés par rôle
// @route   GET /api/employees/role/:role
// @access  Private/Admin
exports.getEmployeesByRole = async (req, res, next) => {
  try {
    const employees = await Employee.find({ role: req.params.role });
    
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};