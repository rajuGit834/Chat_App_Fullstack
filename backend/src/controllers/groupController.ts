import express, { Request, Response } from "express";
import Group from "../models/groupModel";
import User from "../models/usersModel";

interface AuthRequest extends Request {
  user?: any;
}

export const createGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, members, createdBy, profilePic } = req.body;
    if (members.length < 2) {
      res.status(400).json({ error: "At least two members are required" });
      return;
    }

    const newGroup = new Group({
      name,
      members,
      createdBy,
      admins: req.user?.id,
      profilePic,
    });

    const createdGroup = await newGroup.save();

    await User.updateMany(
      {
        _id: { $in: members },
      },
      { $push: { groups: createdGroup._id } }
    );

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: createdGroup,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
