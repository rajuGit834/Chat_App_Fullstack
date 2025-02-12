// import { useState } from "react";
// import { Button, Dropdown, Space } from "antd";
// import type { MenuProps } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// // import { deleteMessage } from "../../redux/slices/usersSlice";
// import UpdateMessageModal from "./UpdateMessageModal";

// interface Message {
//   msgId: number;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   imagePath: string;
// }

// interface MessagesProps {
//   messages: Message[];
// }

// interface ListProps {
//   msg: Message;
// }

// const List: React.FC<ListProps> = ({ msg }) => {
//   const dispatch = useDispatch();
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );
//   const currentUser = useSelector(
//     (state: RootState) => state.users.currentUser
//   );

//   const handleDeleteMessage = (): void => {
//     // dispatch(deleteMessage({ userId: selectedUser, messageId: msg.msgId }));
//   };

//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: <p onClick={handleDeleteMessage}>Delete</p>,
//     },
//     // {
//     //   key: "2",
//     //   label: msg.senderId === currentUser && (
//     //     // <UpdateMessageModal message={msg} />
//     //   ),
//     // },
//   ];

//   return (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown
//           menu={{ items }}
//           placement="bottomLeft"
//           arrow={{ pointAtCenter: true }}
//         >
//           <Button
//             style={{ border: "none", boxShadow: "none", padding: 0, height: 0 }}
//             className="absolute right-0 cursor-pointer"
//           >
//             <MoreOutlined className="text-gray-600" />
//           </Button>
//         </Dropdown>
//       </Space>
//     </Space>
//   );
// };

// const Messages: React.FC<MessagesProps> = ({ messages }) => {
//   const [onHover, setOnHover] = useState<number | null>(null);
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );
//   const currentUser = useSelector(
//     (state: RootState) => state.users.currentUser
//   );

//   // ✅ Filter only messages between current user and selected user
//   const filteredMessages = messages.filter(
//     (msg) =>
//       (msg.senderId === currentUser && msg.receiverId === selectedUser) ||
//       (msg.senderId === selectedUser && msg.receiverId === currentUser)
//   );

//   return (
//     <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
//       {filteredMessages.map((msg) => (
//         <div
//           key={msg.msgId}
//           className={`flex justify-between min-w-[150px] max-w-[45%] break-all relative p-3 rounded-lg ${
//             msg.senderId === currentUser
//               ? "ml-auto bg-blue-300"
//               : "mr-auto bg-gray-200"
//           }`}
//         >
//           <div
//             className="flex justify-between gap-2 w-full relative"
//             onMouseEnter={() => setOnHover(msg.msgId)}
//           >
//             {msg.imagePath && (
//               <img
//                 className="h-[200px] w-[200px] bg-cover"
//                 src={msg.imagePath}
//                 alt="msgImage"
//               />
//             )}
//             <p className="pl-2">{msg.message}</p>

//             {msg.msgId === onHover && <List msg={msg} />}
//           </div>
//           <p className="text-[11px] text-gray-500 absolute bottom-0 right-5">
//             10:01
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;

import { useState, useEffect } from "react";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../redux/slices/usersSlice";
import UpdateMessageModal from "./UpdateMessageModal";
import { RootState } from "../../redux/store";

// const messages = [
//   {
//     sender: "67abaa4930a7deef3d2dc365",
//     receiver: "67abb2bc3d6b758f6200081c",
//     message: "Hey Supriya, how are you?",
//     imageUrl: "",
//     status: "delivered",
//     // createdAt: "2025-02-12T08:00:00.000Z",
//     // updatedAt: "2025-02-12T08:00:01.000Z",
//   },
//   {
//     sender: "67abb2bc3d6b758f6200081c",
//     receiver: "67abaa4930a7deef3d2dc365",
//     message: "Hi Raju! I'm good, how about you?",
//     imageUrl: "",
//     status: "seen",
//     // createdAt: "2025-02-12T08:01:00.000Z",
//     // updatedAt: "2025-02-12T08:01:30.000Z",
//   },
//   {
//     sender: "67abb2d03d6b758f62000820",
//     receiver: "67abb82d9880ba7ee46b566d",
//     message: "Hello! Did you complete the task?",
//     imageUrl: "",
//     status: "sent",
//     createdAt: "2025-02-12T08:05:00.000Z",
//     updatedAt: "2025-02-12T08:05:00.000Z",
//   },
//   {
//     sender: "67abb82d9880ba7ee46b566d",
//     receiver: "67abb2d03d6b758f62000820",
//     message: "Not yet, I'll finish it by evening.",
//     imageUrl: "",
//     status: "delivered",
//     createdAt: "2025-02-12T08:10:00.000Z",
//     updatedAt: "2025-02-12T08:10:05.000Z",
//   },
//   {
//     sender: "67ac4640e54d0fcbabc17c26",
//     receiver: "67ac47cde54d0fcbabc17c41",
//     message: "Hey XYZ, are you coming to the meeting?",
//     imageUrl: "",
//     status: "sent",
//     createdAt: "2025-02-12T08:15:00.000Z",
//     updatedAt: "2025-02-12T08:15:01.000Z",
//   },
//   {
//     sender: "67ac47cde54d0fcbabc17c41",
//     receiver: "67ac4640e54d0fcbabc17c26",
//     message: "Yes, I’ll be there in 10 minutes.",
//     imageUrl: "",
//     status: "seen",
//     createdAt: "2025-02-12T08:16:00.000Z",
//     updatedAt: "2025-02-12T08:16:30.000Z",
//   },
//   {
//     sender: "67ac48c1e54d0fcbabc17c4b",
//     receiver: "67abaa4930a7deef3d2dc365",
//     message: "Raju, can you send me the report?",
//     imageUrl: "",
//     status: "sent",
//     createdAt: "2025-02-12T08:20:00.000Z",
//     updatedAt: "2025-02-12T08:20:00.000Z",
//   },
//   {
//     sender: "67abaa4930a7deef3d2dc365",
//     receiver: "67ac48c1e54d0fcbabc17c4b",
//     message: "Sure, I'll send it in 5 minutes.",
//     imageUrl: "",
//     status: "delivered",
//     createdAt: "2025-02-12T08:22:00.000Z",
//     updatedAt: "2025-02-12T08:22:10.000Z",
//   },
//   {
//     sender: "67abb2bc3d6b758f6200081c",
//     receiver: "67ac47cde54d0fcbabc17c41",
//     message: "Hey XYZ, let's catch up later.",
//     imageUrl: "",
//     status: "seen",
//     createdAt: "2025-02-12T08:30:00.000Z",
//     updatedAt: "2025-02-12T08:30:05.000Z",
//   },
//   {
//     sender: "67ac47cde54d0fcbabc17c41",
//     receiver: "67abb2bc3d6b758f6200081c",
//     message: "Sure! Let's plan something.",
//     imageUrl: "",
//     status: "sent",
//     createdAt: "2025-02-12T08:31:00.000Z",
//     updatedAt: "2025-02-12T08:31:00.000Z",
//   },
// ];

interface MessageType {
  msgId: string;
  sender?: string;
  receiver?: string;
  message?: string;
  imageUrl?: string;
  status: "sent" | "delivered" | "seen";
}

interface MessagesProps {
  messages: MessageType[];
}

interface ListProps {
  msg: MessageType;
}

// const List: React.FC<ListProps> = ({ msg }) => {
//   const dispatch = useDispatch();
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );

//   const handleDeleteMessage = (): void => {
//     dispatch(deleteMessage({ userId: selectedUser, messageId: msg.msgId }));
//   };

//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: <p onClick={handleDeleteMessage}>Delete</p>,
//     },
//     {
//       key: "2",
//       label: msg.type === "send" && <UpdateMessageModal message={msg} />,
//     },
//   ];

//   return (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown
//           menu={{ items }}
//           placement="bottomLeft"
//           arrow={{ pointAtCenter: true }}
//         >
//           <Button
//             style={{
//               border: "none",
//               boxShadow: "none",
//               padding: 0,
//               height: 0,
//             }}
//             className="absolute right-0 cursor-pointer"
//           >
//             <MoreOutlined className="text-gray-600" />
//           </Button>
//         </Dropdown>
//       </Space>
//     </Space>
//   );
// };

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const [onHover, setOnHover] = useState<String | null>(null);
  // const currentUser = useSelector(
  //   (state: RootState) => state.users.currentUser
  // );
  const currentUser = useSelector(
    (state: RootState) => state.users.getCurrentUser
  );
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  // useEffect(() => {
  //   if (!selectedUser) return; // Prevent API call if no user is selected

  //   console.log("Fetching messages for:", selectedUser);

  //   fetch(`http://localhost:4005/api/message/${selectedUser}`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("API Response:", result);

  //       if (result.success && Array.isArray(result.messages)) {
  //         console.log("Dispatching messages:", result.messages);
  //         dispatch(setMessage(result.messages));
  //       } else {
  //         console.warn("Unexpected API response format:", result);
  //       }
  //     })
  //     .catch((error) => console.error("Fetch error:", error));
  // }, [selectedUser, dispatch]);

  console.log("All Messages:", messages);
  // console.log("Current User:", currentUser?._id);
  // console.log("Selected User:", selectedUser);

  return (
    <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
      {messages
        .filter(
          (msg) =>
            (msg.sender === currentUser?._id &&
              msg.receiver === selectedUser) ||
            (msg.sender === selectedUser && msg.receiver === currentUser?._id)
        )
        .map((msg, index) => (
          <div
            key={index}
            className={`flex justify-between min-w-[150px] max-w-[45%] break-all relative p-3 rounded-lg ${
              msg.sender === currentUser?._id
                ? "ml-auto bg-blue-300"
                : "mr-auto bg-gray-200"
            }`}
          >
            <div
              className="flex justify-between gap-2 w-full relative"
              onMouseEnter={() => setOnHover(msg.msgId)}
            >
              {msg.imageUrl && (
                <img
                  className="h-[200px] w-[200px] bg-cover"
                  src={msg.imageUrl}
                  alt="msgImage"
                />
              )}
              <p className="pl-2">{msg.message}</p>

              {/* {msg.msgId === onHover && <List msg={msg} />} */}
            </div>
            <p className="text-[11px] text-gray-500 absolute bottom-0 right-5">
              10:01
            </p>
          </div>
        ))}
    </div>
  );
};

export default Messages;
