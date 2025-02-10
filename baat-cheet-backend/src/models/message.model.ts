// import mongoose, { Document, Schema } from "mongoose";

// // Define the Message interface to type the document
// interface IMessage extends Document {
//   senderId: mongoose.Types.ObjectId;
//   receiverId: mongoose.Types.ObjectId;
//   text?: string;
//   // image?: string;
// }

// // Define the message schema
// const messageSchema = new Schema<IMessage>(
//   {
//     senderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     receiverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     text: {
//       type: String,
//     },
//     // image: {
//     //   type: String,
//     // },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model<IMessage>("Message", messageSchema);

// export default Message;
