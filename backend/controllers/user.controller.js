// controllers/user.controller.js

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const createUser = async (req, res) => {
    try {
        const { fullname, email, password, role, phoneNumber } = req.body;

        // Validate inputs
        if (!fullname || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Use 10 as salt rounds

        const user = await User.create({ fullname, email, password: hashedPassword, role, phoneNumber });

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

// UPDATE USER (Email cannot be changed)
export const updateUser = async (req, res) => {
    console.log("Update API hit!");  
    console.log("Request Email:", req.body.email);  
    console.log("Request Body:", req.body);  

    try {
        const { email, fullname, password, role, bio, skills } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (fullname) user.fullname = fullname;
        if (role) user.role = role;
        if (bio) user.bio = bio;
        if (skills) user.skills = skills;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        console.log("User updated successfully");

        res.status(200).json({ message: "User updated successfully", success: true, user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Dummy functions (Replace with your actual implementations)
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
