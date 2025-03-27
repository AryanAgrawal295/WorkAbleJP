import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification


} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/get-notifications",isAuthenticated,getNotifications)

export default router;
