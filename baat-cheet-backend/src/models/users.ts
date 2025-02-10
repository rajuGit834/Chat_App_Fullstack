import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, // No hashing, just store plain-text (Not recommended for production)
      minlength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
