// routes/user.route.js

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    createUser,
    loginUser,
    logoutUser,
    getMyProfile,
    updateUser,
    getNotifications,
    deleteNotification,
    saveJob,
    getSavedJobs,
    unsaveJob
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/me", isAuthenticated, getMyProfile);
router.put("/update", isAuthenticated, updateUser);
router.get("/notifications", isAuthenticated, getNotifications);
router.delete("/notifications/:id", isAuthenticated, deleteNotification);
router.post("/save-job/:jobId", isAuthenticated, saveJob);
router.get("/saved-jobs", isAuthenticated, getSavedJobs);
router.delete("/unsave-job/:jobId", isAuthenticated, unsaveJob);

export default router;
