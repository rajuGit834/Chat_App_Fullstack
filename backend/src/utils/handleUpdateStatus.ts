import User from "../models/usersModel";

export const updateStatusOfUser = async (userId: string, status: string) => {
  try {
    await User.updateOne({ _id: userId }, { $set: { status: status } });
  } catch (error) {
    console.log("Failed to update status of user", error);
  }
};
