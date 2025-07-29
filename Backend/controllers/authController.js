import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1min" });
};

// Register user
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            message: "User registered successfully!",
            id: newUser._id,
            newUser,
            token: generateToken(newUser._id),
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json({ message: "Ivalid credentials" });
        }

        res.status(200).json({
            message: "User logged in successfully!",
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
        });
    }
};

// Get user info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error getting user info",
            error: error.message,
        });
    }
};
