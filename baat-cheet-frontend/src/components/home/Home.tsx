import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  addNewNotification,
  removeNotification,
} from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";
import { getSocket } from "../../../services/socket";

import UploadImage from "./UploadImage";
import Messages from "./Messages";
import Dropdowns from "./Dropdowns";
import UserList from "./UserList";
import GroupList from "./GroupList";

import { Layout, theme, Avatar, Typography, Tooltip } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

interface MessageType {
  _id: string;
  sender?: string;
  receiver: string;
  message: string;
  imageUrl: string;
  status: "sent" | "delivered" | "seen";
}

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  const socket = getSocket();

  const users = useSelector((state: RootState) => state.users.users);

  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const currentUser = useSelector(
    (state: RootState) => state.users.getCurrentUser
  );

  const user = selectedUser && users.find((user) => user._id === selectedUser);

  // sockets
  // useEffect(() => {
  //   console.log("Connecting to WebSocket...");

  //   if (currentUser?._id) {
  //     console.log(`Registering user: ${currentUser._id}`);
  //     socket.emit("register", currentUser._id);
  //   }

  //   return () => {
  //     console.log(`Unregistering user: ${currentUser?._id}`);
  //     socket.emit("user_active_chat", { userId: currentUser?._id, chattingWith: null });
  //   };
  // }, [currentUser?._id]);

  // useEffect(() => {
  //   console.log("Connecting to WebSocket...");

  //   if (currentUser?._id) {
  //     // Register user socket ID on connect
  //     socket.emit("register", currentUser._id);
  //   }

  //   const handleMessage = (data: MessageType) => {
  //     console.log("Received message:", data);
  //     // Ensure message is for the selected user
  //     if (
  //       (data.sender === currentUser?._id && data.receiver === selectedUser) ||
  //       (data.sender === selectedUser && data.receiver === currentUser?._id)
  //     ) {
  //       dispatch(addMessage({ message: data }));
  //     }

  //     socket.emit("notification", data);
  //   };

  //   const handleNotification = (data: any) => {
  //     if (data.sender !== selectedUser && currentUser?._id !== data.sender) {
  //       dispatch(addNewNotification(data));
  //     }
  //   };

  //   const handleDeleteNotification = (selectedUser: string) => {
  //     dispatch(removeNotification(selectedUser));
  //   };

  //   socket.on("message", handleMessage);
  //   socket.on("notification", handleNotification);
  //   socket.on("deleteNotification", handleDeleteNotification);

  //   return () => {
  //     socket.off("message", handleMessage);
  //     socket.off("notification", handleNotification);
  //     socket.off("deleteNotification", handleDeleteNotification);
  //   };
  // }, [currentUser?._id, selectedUser]);

  // useEffect(() => {
  //   const socket = getSocket();
  //   if (selectedUser) {
  //     socket.emit("user_active_chat", {
  //       userId: currentUser?._id,
  //       chattingWith: selectedUser,
  //     });
  //   }

  //   return () => {
  //     socket.emit("user_active_chat", {
  //       userId: currentUser?._id,
  //       chattingWith: null, // Reset when chat is closed
  //     });
  //   };
  // }, [selectedUser]);

  // const messages = useSelector((state: RootState) => state.users.messages);

  // const handleSubmitUserMessage = (): void => {
  //   if (!userMessage.trim() && !image) return;
  //   const socket = getSocket();

  //   // New message object
  //   const newMessage: MessageType = {
  //     _id: "",
  //     sender: currentUser?._id,
  //     receiver: String(selectedUser),
  //     message: userMessage,
  //     imageUrl: image || "",
  //     status: "sent",
  //   };

  //   socket.emit("message", newMessage);

  //   setUserMessage("");
  //   setImage(null);
  // };

  useEffect(() => {
    console.log("Connecting to WebSocket...");

    if (currentUser?._id) {
      console.log(`Registering user: ${currentUser._id}`);
      socket.emit("register", currentUser._id);
    }

    return () => {
      console.log(`Unregistering user: ${currentUser?._id}`);
      socket.emit("user_active_chat", {
        userId: currentUser?._id,
        chattingWith: null,
      });
    };
  }, [currentUser?._id]);

  useEffect(() => {
    const handleMessage = (data: MessageType) => {
      console.log("Received message:", data);
      // Ensure message is for the selected user
      if (
        (data.sender === currentUser?._id && data.receiver === selectedUser) ||
        (data.sender === selectedUser && data.receiver === currentUser?._id)
      ) {
        dispatch(addMessage({ message: data }));
      }

      socket.emit("notification", data);
    };

    const handleNotification = (data: any) => {
      if (data.sender !== selectedUser && currentUser?._id !== data.sender) {
        dispatch(addNewNotification(data));
      }
    };

    const handleDeleteNotification = (selectedUser: string) => {
      dispatch(removeNotification(selectedUser));
    };

    socket.on("message", handleMessage);
    socket.on("notification", handleNotification);
    socket.on("deleteNotification", handleDeleteNotification);

    return () => {
      socket.off("message", handleMessage);
      socket.off("notification", handleNotification);
      socket.off("deleteNotification", handleDeleteNotification);
    };
  }, [selectedUser]);

  const messages = useSelector((state: RootState) => state.users.messages);

  const handleSubmitUserMessage = (): void => {
    if (!userMessage.trim() && !image) return;

    // New message object
    const newMessage: MessageType = {
      _id: "",
      sender: currentUser?._id,
      receiver: String(selectedUser),
      message: userMessage,
      imageUrl: image || "",
      status: "sent",
    };

    socket.emit("message", newMessage);

    setUserMessage("");
    setImage(null);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      {/* sider */}
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
      >
        {/* user profile */}
        <div className="demo-logo-vertical h-[63px] bg-[#0e2d4b] text-white flex justify-between items-center">
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
        {/* all groups */}
        <GroupList />
        <hr className="text-gray-600" />
        {/* all contacts */}
        <UserList />
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
          {selectedUser && (
            <div className="relative">
              <div className="flex gap-5 items-center">
                <Avatar
                  size="large"
                  src={
                    (user && user?.profilePic) || (
                      <UserOutlined
                        style={{ color: "gray", fontSize: "20px" }}
                      />
                    )
                  }
                />

                <div className="flex flex-col justify-center items-start">
                  <Text className="truncate font-bold">
                    {user && user?.firstName + " " + user?.lastName}
                  </Text>
                  <Text>{user && user?.status}</Text>
                </div>
              </div>
            </div>
          )}
          <Tooltip
            title="logout"
            className="float-right text-[22px] p-2 hover:bg-gray-400/50 rounded-full cursor-pointer"
          >
            <Dropdowns />
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
          {selectedUser && (
            <div
              className="flex items-center justify-center gap-2 relative"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitUserMessage();
                }
              }}
            >
              <textarea
                placeholder="message..."
                className="w-[80%] sm:w-full bg-gray-300 outline-blue-300 pl-5 pt-2 rounded-full"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <UploadImage image={image} setImage={setImage} />

              <Tooltip title={"Send"}>
                <SendOutlined
                  style={{ color: "gray" }}
                  className="text-[20px] p-4 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
                  onClick={handleSubmitUserMessage}
                />
              </Tooltip>
            </div>
          )}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
