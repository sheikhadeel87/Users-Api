import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.utils.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

// Load environment variables FIRST
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
console.log('*** registering /api/auth ***');
app.use('/api/auth', authRoutes);

console.log('*** registering /api/users ***');
app.use('/api/users', userRoutes);

console.log('*** registering /api/notes ***');
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('Users API is running...');
});

const Port = process.env.PORT || 5001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
export default app;