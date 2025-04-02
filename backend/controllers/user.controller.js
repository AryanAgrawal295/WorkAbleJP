// controllers/user.controller.js

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER


export const createUser = async (req, res) => {
    try {
        const { fullname,email, password, role } = req.body;

        // Validate inputs
         if (!fullname || !email || !password || !role) {
          return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Use 10 as salt rounds

        const user = await User.create({ fullname,email, password:hashedPassword , role });

        res.status(201).json({ message: "User created successfully", success: true, user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


// LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password", success: false });
        }

        const token = jwt.sign({ userId: user._id }, "abc", { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({ message: "Login successful", success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// LOGOUT
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful", success: true });
};

// GET PROFILE
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Dummy functions (Replace with your actual implementations)
export const updateUser = (req, res) => {
    res.send("updateUser controller not implemented yet");
};

export const getNotifications = (req, res) => {
    res.send("getNotifications controller not implemented yet");
};

export const deleteNotification = (req, res) => {
    res.send("deleteNotification controller not implemented yet");
};

export const saveJob = (req, res) => {
    res.send("saveJob controller not implemented yet");
};

export const getSavedJobs = (req, res) => {
    res.send("getSavedJobs controller not implemented yet");
};

export const unsaveJob = (req, res) => {
    res.send("unsaveJob controller not implemented yet");
};
