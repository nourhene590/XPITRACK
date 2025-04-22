module.exports = {
  // Configuration générale de l'application
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "xpitrack_secret_key",
    jwtExpire: process.env.JWT_EXPIRE || "30d",

    jwtSecret: "your_jwt_secret_key", // Change this to a more secure secret
    jwtExpire: "30d", // JWT expiration time
  },

  // Configuration de la base de données
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/xpitrack",
  },

  // Configuration des emails (pour les notifications futures)
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || "noreply@xpitrack.com",
  },

  // Configuration des limites et des seuils
  limits: {
    lowStockThreshold: 5, // Seuil pour considérer un produit en stock bas
    nearExpiryDays: 7, // Nombre de jours avant expiration pour alerte
  },
};
