// import mongoose, { Document } from "mongoose";

// // Define the IUser interface
// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string; // Assuming you're storing the password in plain text, ideally use encryption
// }

// // Define the user schema
// const UserSchema = new mongoose.Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// // Define the model
// const UserModel = mongoose.model<IUser>("User", UserSchema, "cluster-baatcheet");

// export default UserModel;
