import { Request, Response } from "express";
import Message from "../models/messageModel";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const sendMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { receiver, message, imageUrl } = req.body;

    if (!receiver || (!message && !imageUrl)) {
      res.status(400).json({ error: "Message or Image is required" });
      return;
    }

    const newMessage = new Message({
      sender: req.user?.id,
      receiver,
      message,
      imageUrl,
      status: "sent",
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { receiverId } = req.params;

    if (!receiverId) {
      res.status(400).json({ error: "Receiver ID is required" });
      return;
    }

    const messages = await Message.find({
      $or: [
        { sender: req.user?.id, receiver: receiverId },
        { sender: receiverId, receiver: req.user?.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

