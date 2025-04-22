const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

// Protéger les routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Récupérer le token
      token = req.headers.authorization.split(" ")[1];

      // Vérifier le token
      const decoded = jwt.verify(token, config.app.jwtSecret);

      // Récupérer l'utilisateur à partir du token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Non autorisé, pas de token" });
  }
};

// Middleware pour vérifier les rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Non autorisé, pas d'utilisateur" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`,
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
