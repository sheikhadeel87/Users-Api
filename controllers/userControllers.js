import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { updateSchema } from '../validations/userValidation.js';

// GET /api/users - Get all users (protected)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        
        res.json({
            message: 'Users retrieved successfully',
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/users/:id - Get user by ID (protected)
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User retrieved successfully',
            user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/users/:id - Update user (protected - can only update own profile)
export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.params.id;

        const { error } = updateSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((detail) => detail.message).join(', ')
            });
        }

        // Check if user is trying to update their own profile
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (name) user.name = name;
        if (email) {
            // Check if email is already taken by another user
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = email;
        }
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        // Save updated user
        const updatedUser = await user.save();

        // Remove password from response
        const userResponse = {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        };

        res.json({
            message: 'User updated successfully',
            user: userResponse
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ error: error.message });
    }
};

// DELETE /api/users/:id - Delete user (protected - can only delete own profile)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user is trying to delete their own profile
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this user' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ error: error.message });
    }
};

// GET /api/users/me - Get current user profile (protected)
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        res.json({
            message: 'User profile retrieved successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

