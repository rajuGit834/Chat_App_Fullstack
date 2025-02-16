import GroupMessage from "../models/groupMessageModel";
import { Request, Response } from "express";

export const getGroupMessageById = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      res.status(400).json({ error: "Group ID is required" });
      return;
    }

    const groupMessages = await GroupMessage.find({ group: groupId });

    if (!groupMessages) {
      res.status(404).json({ error: "No message found" });
      return;
    }

    res.status(200).json({ success: true, groupMessages });
  } catch (error) {
    console.log("while fetching group messages", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
