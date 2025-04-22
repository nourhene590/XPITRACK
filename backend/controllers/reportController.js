const Product = require("../models/Product");
const Report = require("../models/Report");
const { validationResult } = require("express-validator");

// @desc    Générer un rapport de stock
// @route   POST /api/reports/stock
// @access  Private
exports.generateStockReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startDate, endDate, category } = req.body;

    // Construire la requête
    let query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (category) {
      query.category = category;
    }

    // Récupérer les produits
    const products = await Product.find(query);

    // Calculer les statistiques
    const totalProducts = products.length;
    const totalQuantity = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    const outOfStock = products.filter(
      (product) => product.quantity <= 0
    ).length;
    const lowStock = products.filter(
      (product) => product.quantity > 0 && product.quantity <= 5
    ).length;
    const nearExpiry = products.filter((product) => {
      if (!product.expiryDate) return false;
      const today = new Date();
      const expiryDate = new Date(product.expiryDate);
      const daysUntilExpiry = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
    }).length;

    // Créer le rapport
    const report = await Report.create({
      type: "stock",
      generatedBy: req.user.id,
      data: {
        totalProducts,
        totalQuantity,
        outOfStock,
        lowStock,
        nearExpiry,
        products: products.map((product) => ({
          id: product._id,
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          status: product.status,
          expiryDate: product.expiryDate,
        })),
      },
      filters: {
        startDate,
        endDate,
        category,
      },
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir tous les rapports
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res, next) => {
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

    // Trouver les rapports
    query = Report.find(JSON.parse(queryStr)).populate({
      path: "generatedBy",
      select: "name email",
    });

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
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Report.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Exécuter la requête
    const reports = await query;

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
      count: reports.length,
      pagination,
      data: reports,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtenir un rapport par ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id).populate({
      path: "generatedBy",
      select: "name email",
    });

    if (!report) {
      return res.status(404).json({ message: "Rapport non trouvé" });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprimer un rapport
// @route   DELETE /api/reports/:id
// @access  Private/Admin
exports.deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Rapport non trouvé" });
    }

    // Vérifier si l'utilisateur est le créateur du rapport ou un admin
    if (
      report.generatedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ message: "Non autorisé à supprimer ce rapport" });
    }

    await report.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
