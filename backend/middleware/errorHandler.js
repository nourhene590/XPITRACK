const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    // Log pour le développeur
    console.error(err);
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Ressource non trouvée avec l'id ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = 'Valeur en doublon entrée';
      error = new Error(message);
      error.statusCode = 400;
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message);
      error.statusCode = 400;
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Erreur serveur'
    });
  };
  
  module.exports = errorHandler;