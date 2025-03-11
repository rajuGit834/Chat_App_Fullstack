import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessage,
  addNewNotification,
  removeNotification,
} from "../../redux/slices/usersSlice";
import { getSocket } from "../../../services/socket";
import {
  addGroupMessage,
  setGroupMessages,
} from "../../redux/slices/groupSlice";

import UploadImage from "./UploadImage";
import Messages from "./Messages";
import Dropdowns from "./Dropdowns";
import UserList from "./UserList";
import GroupList from "./GroupList";

import { Layout, theme, Avatar, Typography, Tooltip } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

import { getMessages } from "../../api/messagesApi";

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

interface GroupMessage {
  _id: string;
  sender?: string;
  group: string;
  message: string;
  imageUrl: string;
  status: "sent" | "delivered" | "seen";
}

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  const socket = getSocket();

  const users = useSelector((state: any) => state.users.users);
  const groups = useSelector((state: any) => state.groups.groups);
  const messages = useSelector((state: any) => state.users.messages);
  const groupMessages = useSelector((state: any) => state.groups.groupMessages);
  const selectedUser = useSelector((state: any) => state.users.selectedUser);
  const selectedGroupId = useSelector(
    (state: any) => state.groups.selectedGroupId
  );

  const currentUser = useSelector((state: any) => state.users.getCurrentUser);
  const currentGroup = groups.filter(
    (group: any) => group._id === selectedGroupId
  )[0];
  const user =
    selectedUser && users.find((user: any) => user._id === selectedUser);

  // sockets
  useEffect(() => {
    console.log("Connecting to WebSocket...");

    if (currentUser?._id) {
      console.log(`Registering user: ${currentUser._id}`);
      socket.emit("register", currentUser._id);
    }

    return () => {
      console.log(`Unregistering user: ${currentUser?._id}`);
    };
  }, [currentUser?._id]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log("Received message:", data);
      // Ensure message is for the selected user and user should chat with sender
      if (
        (!data.isGroup && data.sender === selectedUser) ||
        selectedUser === data.receiver
      ) {
        dispatch(addMessage({ message: data }));
      } else if (data.isGroup) {
        dispatch(addMessage(data));
      }

      socket.emit("notification", { ...data, messageType: "personal" });
    };

    const handleNotification = (data: any) => {
      if (data.message === "group" && data.group !== selectedGroupId) {
        dispatch(addNewNotification(data));
        return;
      }
      if (data.sender !== selectedUser && currentUser?._id !== data.sender) {
        dispatch(addNewNotification(data));
      }
    };

    const handleDeleteNotification = (selectedUser: string) => {
      dispatch(removeNotification(selectedUser));
    };

    const handleGroupMessage = (newGroupMessage: any) => {
      if (
        newGroupMessage.group == String(selectedGroupId) ||
        newGroupMessage.sender === currentUser._id
      ) {
        dispatch(addGroupMessage(newGroupMessage));
      }
      socket.emit("notification", { ...newGroupMessage, messageType: "group" });
    };

    socket.on("message", handleMessage);
    socket.on("notification", handleNotification);
    socket.on("deleteNotification", handleDeleteNotification);
    socket.on("groupMessage", handleGroupMessage);

    return () => {
      socket.off("message", handleMessage);
      socket.off("notification", handleNotification);
      socket.off("deleteNotification", handleDeleteNotification);
      socket.off("groupMessage", handleGroupMessage);
    };
  }, [selectedUser, selectedGroupId]);

  //fetching messages
  useEffect(() => {
    if (!selectedUser && !selectedGroupId) return;

    const fetchMessageOfSelectedUser = async () => {
      try {
        const id = selectedUser || selectedGroupId;
        console.log("id", id);
        const response = await getMessages(id);
        if (response.data.success) {
          console.log("all messages", response.data.messages);
          dispatch(setMessage(response.data.messages));
          dispatch(setGroupMessages([]));
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessageOfSelectedUser();
  }, [selectedUser, selectedGroupId]);

  const handleSubmitUserMessage = () => {
    if (!userMessage.trim() && !image) return;

    // New message object

    const newGroupMessage = {
      _id: "",
      sender: currentUser?._id,
      receiver: selectedUser || selectedGroupId,
      message: userMessage,
      imageUrl: image || "",
      status: "sent",
      isGroup: selectedUser ? false : true,
    };
    socket.emit("message", newGroupMessage);

    // if (selectedUser) {
    //   const newMessage = {
    //     _id: "",
    //     sender: currentUser?._id,
    //     receiver: String(selectedUser),
    //     message: userMessage,
    //     imageUrl: image || "",
    //     status: "sent",
    //   };
    //   socket.emit("message", newMessage);
    // } else {

    // }

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
          {selectedGroupId && (
            <div className="relative">
              <div className="flex gap-5 items-center">
                <Avatar
                  size="large"
                  src={
                    (currentGroup && currentGroup?.profilePic) || (
                      <UserOutlined
                        style={{ color: "gray", fontSize: "20px" }}
                      />
                    )
                  }
                />

                <div className="flex flex-col justify-center items-start">
                  <Text className="truncate font-bold">
                    {currentGroup && currentGroup.name}
                  </Text>
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
            {/* {messages.length > 0 ? (
            ) : (
              groupMessages.length > 0 && <Messages messages={groupMessages} />
            )} */}
          </div>
        </Content>
        <Footer className="w-full bg-white p-4 shadow-md">
          {(selectedUser || selectedGroupId) && (
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
