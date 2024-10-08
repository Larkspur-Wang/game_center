import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('成功连接到 MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB 连接错误:', err);
      console.log('5秒后重试连接...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});