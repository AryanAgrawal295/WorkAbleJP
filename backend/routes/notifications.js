import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middlewares/isAuthenticated.js"; // Ensure user authentication

const router = express.Router();


// GET: Fetch user notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST: Add a new notification
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message, type } = req.body;

    const newNotification = new Notification({
      user: req.user.id,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Remove a notification
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await notification.deleteOne();
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
