// routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getCurrentUser
} from '../controllers/userControllers.js';

const router = express.Router();

// All routes are protected (require authentication)
router.get('/me', protect, getCurrentUser); // Get current user profile
router.get('/', protect, getAllUsers); // Get all users
router.get('/:id', protect, getUserById); // Get user by ID
router.put('/:id', protect, updateUser); // Update user
router.delete('/:id', protect, deleteUser); // Delete user

export default router;

