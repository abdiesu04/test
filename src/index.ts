import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Bonus Claim API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 