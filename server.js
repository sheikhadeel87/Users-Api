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
// CORS configuration - allow frontend origin
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ...existing code...
app.get('/hello', (req, res) => {
  res.send('Hello from controller');
});
// ...existing code...


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