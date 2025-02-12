import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUser,
  addMessage,
  setUsers,
} from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";

import UploadImage from "./UploadImage";
import Messages from "./Messages";
// import Dropdowns from "./Dropdowns";

import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

import { io } from "socket.io-client";
const socket = io("http://localhost:4005", { withCredentials: true });

interface MessageType {
  msgId: string;
  sender?: string;
  receiver?: string;
  message?: string;
  imageUrl?: string;
  status: "sent" | "delivered" | "seen";
}

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   profilePic: string;
//   status: "online" | "offline";
//   // messages: MessageType[];
// }

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:4005/api/auth/", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log("API Response:", result);
        if (result && Array.isArray(result)) {
          // console.log("Dispatching setUsers with:", result);
          dispatch(setUsers(result));
        } else {
          console.warn("Expected an array but got:", result);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch]);

  //new
  const users = useSelector((state: RootState) => state.users.users);
  // console.log("users", users);
  const messages = useSelector((state: RootState) => state.users.messages);
  // const currentUser = useSelector(
  //   (state: RootState) => state.users.currentUser
  // );
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const currentUser = {
    _id: "67abb2bc3d6b758f6200081c",
    name: "supriya kumari",
    email: "sksingh@g.com",
  };

  // useEffect(() => {
  //   console.log("Connecting to WebSocket...");

  //   const newMessage: MessageType = {
  //     msgId: "1",
  //     sender: String(currentUser?._id),
  //     receiver: String(selectedUser),
  //     message: "",
  //     imageUrl: "",
  //     status: "sent",
  //   };

  //   socket.on("message", (data) => {
  //     dispatch(addMessage({ message: newMessage }));
  //   });

  //   return () => {
  //     socket.off("message"); // Clean up listener
  //   };
  // }, [dispatch]);

  const handleSubmitUserMessage = (): void => {
    if (!userMessage.trim() && !image) return;

    // Find the selected user in the user list
    const user = users.find((user) => user._id === selectedUser);

    // Generate message ID properly
    let userMsgId: string = "1";
    if (user && messages.length > 0) {
      userMsgId = (
        parseInt(messages[messages.length - 1].msgId) + 1
      ).toString();
    }

    // New message object
    const newMessage: MessageType = {
      msgId: userMsgId,
      sender: currentUser?._id,
      receiver: String(selectedUser),
      message: userMessage,
      imageUrl: image || "",
      status: "sent",
    };

    dispatch(
      addMessage({
        message: newMessage,
      })
    );

    // Emit message via WebSocket
    // socket.emit("message", { userId: selectedUser, message: newMessage });

    // Reset input fields
    console.log("calling........");
    setUserMessage("");
    setImage(null);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      {/* sideer */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={"20%"}
        // className="overflow-y-auto h-full"
      >
        {/* user profile */}
        <div className="demo-logo-vertical h-[63px] bg-[#0e2d4b] text-white">
          <div className="flex gap-2 items-center pl-2 pt-3">
            <Avatar
              style={{
                backgroundColor: "gray",
                verticalAlign: "middle",
              }}
              size="large"
            >
              <UserOutlined className="text-[20px]" />
            </Avatar>
            <Text style={{ color: "white" }} className="truncate">
              {currentUser?.name}
            </Text>
          </div>
        </div>
        <hr className="text-gray-600" />
        {/* all contacts */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onSelect={(e) => {
            dispatch(setSelectedUser(e.selectedKeys[0]));
          }}
        >
          {users.map((user): any => (
            <Menu.Item
              key={user._id}
              style={{ height: "70px", position: "relative" }}
            >
              <div className="flex gap-2 items-center">
                <Avatar
                  size="large"
                  src={
                    user.profilePic || (
                      <UserOutlined
                        style={{
                          color: "gray",
                          fontSize: "20px",
                          background: "white",
                          padding: "9px",
                        }}
                      />
                    )
                  }
                />
                <Text
                  style={{ color: "white" }}
                  className="hidden sm:block truncate"
                >
                  {user.firstName + " " + user.lastName}
                </Text>
              </div>
              <div className="flex items-center absolute gap-2 left-[50px] bottom-4">
                <div
                  className={`h-[11px] w-[11px] rounded-full bg-red ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "10px",
          }}
        >
          <div className="relative">
            <div className="flex gap-5 items-center">
              <Avatar
                size="large"
                src={
                  users.find((user) => user._id === selectedUser)
                    ?.profilePic || (
                    <UserOutlined style={{ color: "gray", fontSize: "20px" }} />
                  )
                }
              />

              <div className="flex flex-col justify-center items-start">
                <Text className="truncate font-bold">
                  {users.find((user) => user._id === selectedUser)?.firstName}
                </Text>
                <Text>
                  {users.find((user) => user._id === selectedUser)?.status}
                </Text>
              </div>
            </div>
          </div>
          {/* <div className="object-contain">
              <h1 className="text-[20px] font-bold bg-gradient-to-r from-[#2921b8] via-[#090979] to-[#00d4ff] text-transparent bg-clip-text">
                Baat-Cheet
              </h1>
            </div> */}

          <Tooltip
            title="logout"
            className="float-right text-[22px] p-2 hover:bg-gray-400/50 rounded-full cursor-pointer"
          >
            {/* <Dropdowns /> */}
          </Tooltip>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
            }}
          >
            <Messages messages={messages} />
          </div>
        </Content>
        <Footer className="w-full bg-white p-4 shadow-md">
          <div className="flex items-center justify-center gap-2 relative">
            <textarea
              placeholder="message..."
              className="w-[80%] sm:w-full bg-gray-300 outline-blue-300 pl-5 pt-2 rounded-full"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitUserMessage();
                }
              }}
            ></textarea>
            <UploadImage image={image} setImage={setImage} />

            <Tooltip title={"Send"}>
              <SendOutlined
                style={{ color: "gray" }}
                className="text-[20px] p-4 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
                onClick={handleSubmitUserMessage}
              />
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser, addMessage } from "../../redux/slices/usersSlice";
// import { RootState } from "../../redux/store";

// import UploadImage from "./UploadImage";
// import Messages from "./Messages";
// import Dropdowns from "./Dropdowns";

// import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";
// import { SendOutlined, UserOutlined } from "@ant-design/icons";
// const { Header, Content, Sider, Footer } = Layout;
// const { Text } = Typography;

// import { io } from "socket.io-client";
// const socket = io("http://localhost:4005", { withCredentials: true });

// const Home: React.FC = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [userMessage, setUserMessage] = useState("");
//   const dispatch = useDispatch();

//   //new
//   const users = useSelector((state: RootState) => state.users.users);
//   const messages = useSelector((state: RootState) => state.users.messages);
//   const currentUser = useSelector((state: RootState) => state.users.currentUser);

//   useEffect(() => {
//     console.log("Connecting to WebSocket...");
//     socket.on("message", (data) => {
//       dispatch(
//         addMessage({
//           userId: data.userId,
//           message: data.message,
//         })
//       );
//     });

//     return () => {
//       socket.off("message"); // Clean up listener
//     };
//   }, [dispatch]);

//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );

//   const handleSubmitUserMessage = (): void => {
//     if (!userMessage.trim() && !image) return;

//     const user = users.find((user) => user.id === selectedUser);
//     let userMsgId: number = 1;

//     if (user) {
//       const msgArray = user.messages;
//       userMsgId =
//         msgArray.length > 0 ? msgArray[msgArray.length - 1].msgId + 1 : 1;
//     }
//     const newMessage = {
//       msgId: userMsgId,
//       type: "send",
//       message: userMessage,
//       imagePath: image || "",
//     };

//     dispatch(
//       addMessage({
//         userId: selectedUser,
//         message: {
//           msgId: userMsgId,
//           type: "send",
//           message: userMessage,
//           imagePath: image || "",
//         },
//       })
//     );

//     socket.emit("message", { userId: selectedUser, message: newMessage });
//     setUserMessage("");
//     setImage(null);
//   };

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   return (
//     <Layout style={{ height: "100vh" }}>
//       {/* sideer */}
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         onBreakpoint={(broken) => {
//           console.log(broken);
//         }}
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//         width={"20%"}
//         // className="overflow-y-auto h-full"
//       >
//         {/* user profile */}
//         <div className="demo-logo-vertical h-[63px] bg-[#0e2d4b] text-white">
//           <div className="flex gap-2 items-center pl-2 pt-3">
//             <Avatar
//               style={{
//                 backgroundColor: "gray",
//                 verticalAlign: "middle",
//               }}
//               size="large"
//             >
//               <UserOutlined className="text-[20px]" />
//             </Avatar>
//             <Text style={{ color: "white" }} className="truncate">
//               Me
//             </Text>
//           </div>
//         </div>
//         <hr className="text-gray-600" />
//         {/* all contacts */}
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           onSelect={(e) => {
//             dispatch(setSelectedUser(parseInt(e.selectedKeys[0])));
//           }}
//         >
//           {users.map((user): any => (
//             <Menu.Item
//               key={user.id}
//               style={{ height: "70px", position: "relative" }}
//             >
//               <div className="flex gap-2 items-center">
//                 <Avatar
//                   size="large"
//                   src={
//                     user.profilePic || (
//                       <UserOutlined
//                         style={{
//                           color: "gray",
//                           fontSize: "20px",
//                           background: "white",
//                           padding: "9px",
//                         }}
//                       />
//                     )
//                   }
//                 />
//                 <Text
//                   style={{ color: "white" }}
//                   className="hidden sm:block truncate"
//                 >
//                   {user.name}
//                 </Text>
//               </div>
//               <div className="flex items-center absolute gap-2 left-[50px] bottom-4">
//                 <div
//                   className={`h-[11px] w-[11px] rounded-full bg-red ${
//                     user.isActive ? "bg-green-500" : "bg-gray-500"
//                   }`}
//                 ></div>
//               </div>
//             </Menu.Item>
//           ))}
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingLeft: "15px",
//             paddingRight: "10px",
//           }}
//         >
//           <div className="relative">
//             <div className="flex gap-5 items-center">
//               <Avatar
//                 size="large"
//                 src={
//                   users.find((user) => user.id === selectedUser)
//                     ?.profilePic || (
//                     <UserOutlined style={{ color: "gray", fontSize: "20px" }} />
//                   )
//                 }
//               />

//               <div className="flex flex-col justify-center items-start">
//                 <Text className="truncate font-bold">
//                   {users.find((user) => user.id === selectedUser)?.name}
//                 </Text>
//                 <Text>
//                   {users.find((user) => user.id === selectedUser)?.isActive
//                     ? "online"
//                     : "offline"}
//                 </Text>
//               </div>
//             </div>
//           </div>
//           {/* <div className="object-contain">
//               <h1 className="text-[20px] font-bold bg-gradient-to-r from-[#2921b8] via-[#090979] to-[#00d4ff] text-transparent bg-clip-text">
//                 Baat-Cheet
//               </h1>
//             </div> */}

//           <Tooltip
//             title="logout"
//             className="float-right text-[22px] p-2 hover:bg-gray-400/50 rounded-full cursor-pointer"
//           >
//             <Dropdowns />
//           </Tooltip>
//         </Header>
//         <Content style={{ margin: "24px 16px 0" }}>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               height: "100%",
//             }}
//           >
//             <Messages
//               messages={
//                 users.find((user) => user.id === selectedUser)?.messages || []
//               }
//             />
//           </div>
//         </Content>
//         <Footer className="w-full bg-white p-4 shadow-md">
//           <div className="flex items-center justify-center gap-2 relative">
//             <textarea
//               placeholder="message..."
//               className="w-[80%] sm:w-full bg-gray-300 outline-blue-300 pl-5 pt-2 rounded-full"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSubmitUserMessage();
//                 }
//               }}
//             ></textarea>
//             <UploadImage image={image} setImage={setImage} />

//             <Tooltip title={"Send"}>
//               <SendOutlined
//                 style={{ color: "gray" }}
//                 className="text-[20px] p-4 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
//                 onClick={handleSubmitUserMessage}
//               />
//             </Tooltip>
//           </div>
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Home;

// import { useState } from "react";
// import { Button, Dropdown, Space } from "antd";
// import type { MenuProps } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { deleteMessage } from "../../redux/slices/usersSlice";
// import UpdateMessageModal from "./UpdateMessageModal";

// interface Message {
//   _id: string;
//   sender: string;
//   receiver: string;
//   message: string;
//   imageUrl: string;
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
//     dispatch(deleteMessage({ userId: selectedUser, messageId: msg._id }));
//   };

//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: <p onClick={handleDeleteMessage}>Delete</p>,
//     },
//     {
//       key: "2",
//       label: msg.sender === currentUser && <UpdateMessageModal message={msg} />,
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
//   const [onHover, setOnHover] = useState<string | null>(null);
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );
//   const currentUser = useSelector(
//     (state: RootState) => state.users.currentUser
//   );

//   // ✅ Filter only messages between current user and selected user
//   const filteredMessages = messages.filter(
//     (msg) =>
//       (msg.sender === currentUser && msg.receiver === selectedUser) ||
//       (msg.sender === selectedUser && msg.receiver === currentUser)
//   );

//   return (
//     <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
//       {filteredMessages.map((msg) => (
//         <div
//           key={msg._id}
//           className={`flex justify-between min-w-[150px] max-w-[45%] break-all relative p-3 rounded-lg ${
//             msg.sender === currentUser
//               ? "ml-auto bg-blue-300"
//               : "mr-auto bg-gray-200"
//           }`}
//         >
//           <div
//             className="flex justify-between gap-2 w-full relative"
//             onMouseEnter={() => setOnHover(msg._id)}
//           >
//             {msg.imageUrl && (
//               <img
//                 className="h-[200px] w-[200px] bg-cover"
//                 src={msg.imageUrl}
//                 alt="msgImage"
//               />
//             )}
//             <p className="pl-2">{msg.message}</p>

//             {msg._id === onHover && <List msg={msg} />}
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
