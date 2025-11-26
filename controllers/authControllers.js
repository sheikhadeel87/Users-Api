import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validations/userValidation.js";

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { error } = registerSchema.validate(
            { name, email, password },
            { abortEarly: false }
        );
        if (error) {
            return res.status(400).json({
                message: error.details.map((detail) => detail.message).join(', ')
            });
        }
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Remove password from response
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        const { error } = loginSchema.validate(
            { email, password },
            { abortEarly: false }
        );
        if (error) {
            return res.status(400).json({
                message: error.details.map((detail) => detail.message).join(', ')
            });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Remove password from response
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.json({
            message: "Login successful",
            user: userResponse,
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
