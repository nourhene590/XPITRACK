const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const config = require("../config/config");

// @desc    Obtenir tous les produits
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res, next) => {
  try {
    // Construire la requête
    let query;

    // Copier req.query
    const reqQuery = { ...req.query };

    // Champs à exclure
    const removeFields = ["select", "sort", "page", "limit"];

    // Supprimer les champs à exclure de reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Créer la chaîne de requête
    let queryStr = JSON.stringify(reqQuery);

    // Créer les opérateurs ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Trouver les produits
    query = Product.find(JSON.parse(queryStr));

    // Sélection des champs
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Tri
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Exécuter la requête
    const products = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir un produit par ID
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ajouter l'utilisateur à req.body
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Vérifier si l'utilisateur est le propriétaire du produit ou un admin
    if (
      product.user &&
      product.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ message: "Non autorisé à mettre à jour ce produit" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Vérifier si l'utilisateur est le propriétaire du produit ou un admin
    if (
      product.user &&
      product.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ message: "Non autorisé à supprimer ce produit" });
    }

    await product.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir les produits par catégorie
// @route   GET /api/products/category/:category
// @access  Private
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir les produits près d'expiration
// @route   GET /api/products/near-expiry
// @access  Private
exports.getNearExpiryProducts = async (req, res, next) => {
  try {
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + config.limits.nearExpiryDays);

    const products = await Product.find({
      expiryDate: { $lte: expiryDate, $gt: today },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir les produits en rupture de stock
// @route   GET /api/products/out-of-stock
// @access  Private
exports.getOutOfStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ quantity: { $lte: 0 } });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir les produits en stock bas
// @route   GET /api/products/low-stock
// @access  Private
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      quantity: { $gt: 0, $lte: config.limits.lowStockThreshold },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
