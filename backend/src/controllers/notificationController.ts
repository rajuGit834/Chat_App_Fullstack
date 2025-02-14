import Notification from "../models/notificationModel";
import { Request, Response } from "express";

export const getAllNotification = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;

    if (!receiverId) {
      res.status(400).json({ error: "Receiver ID is required" });
      return;
    }

    const notifications = await Notification.find({
      receiver: receiverId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
