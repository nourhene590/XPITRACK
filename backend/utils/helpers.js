const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Servir les fichiers statiques en production
if (process.env.NODE_ENV === 'production') {
  // Définir le dossier statique
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Toute route non-API renvoie vers l'index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Middleware de gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});