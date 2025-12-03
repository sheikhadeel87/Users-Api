import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { updateSchema } from '../validations/userValidation.js';

// GET /api/users - Get all users (protected) with pagination, sorting, and basic filtering
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-createdAt', search } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .sort(sort)
            .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
            .limit(parseInt(limit, 10));

        const total = await User.countDocuments(query);

        res.json({
            message: 'Users retrieved successfully',
            count: users.length,
            total,
            page: parseInt(page, 10),
            pages: Math.ceil(total / parseInt(limit, 10)),
            users,
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
        const { name, email, password, profile } = req.body;
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

        if (profile) {
            // Merge incoming profile with existing profile (shallow merge)
            user.profile = {
                ...(user.profile || {}),
                ...profile,
            };
        }

        // Save updated user
        const updatedUser = await user.save();

        // Remove password from response
        const userResponse = {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profile: updatedUser.profile,
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

