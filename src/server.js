const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./interfaces/routes/userRoutes');
const errorHandler = require('./interfaces/middlewares/errorHandler');
const bonusRoutes = require('./interfaces/routes/bonusRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Database connection
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api', bonusRoutes);
console.log('Registered routes:');
app._router.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Bonus Claim API' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 