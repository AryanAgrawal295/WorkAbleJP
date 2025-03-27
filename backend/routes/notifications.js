import express from "express";
import { getNotifications, createNotification, markAsRead, deleteNotification } from "../controllers/notification.controller.js"; // Ensure this path is correct
import authMiddleware from "../middlewares/isAuthenticated.js"; // Ensure user authentication

const router = express.Router();

// GET: Fetch user notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await getNotifications.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// POST: Add a new notification
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message, type } = req.body;

    const newNotification = new createNotification({
      user: req.user._id,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json({ success: true, notification: newNotification });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// PATCH: Mark a notification as read
router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notification = await markAsRead.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();
    
    res.json({ success: true, message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// DELETE: Remove a notification
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await deleteNotification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await notification.deleteOne();
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

export default router;
