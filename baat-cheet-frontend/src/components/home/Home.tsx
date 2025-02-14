import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUser,
  addMessage,
  addNewNotification,
  setMessage,
  setNotification,
  removeNotification,
  // selAllMessages,
} from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";
import { socket } from "../../socket";

import UploadImage from "./UploadImage";
import Messages from "./Messages";
import Dropdowns from "./Dropdowns";

import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

interface MessageType {
  _id: string;
  sender?: string;
  receiver?: string;
  message?: string;
  imageUrl?: string;
  status: "sent" | "delivered" | "seen";
}

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  // const [isMessageReceived, setIsMessageReceived] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.users);

  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const currentUser = useSelector(
    (state: RootState) => state.users.getCurrentUser
  );
  const user = selectedUser && users.find((user) => user._id === selectedUser);

  const notifications = useSelector(
    (state: RootState) => state.users.notifications
  );

  // sockets
  useEffect(() => {
    console.log("Connecting to WebSocket...");

    if (currentUser?._id) {
      // Register user socket ID on connect
      socket.emit("register", currentUser._id);
    }

    const handleMessage = (data: MessageType) => {
      console.log("Received message:", data);
      // setIsMessageReceived((prev) => !prev);
      // Ensure message is for the selected user
      if (
        (data.sender === currentUser?._id && data.receiver === selectedUser) ||
        (data.sender === selectedUser && data.receiver === currentUser?._id)
      ) {
        dispatch(addMessage({ message: data }));
      }

      if (data.sender !== selectedUser && currentUser?._id !== data.sender) {
        socket.emit("notification", data);
      }
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
    };
  }, [dispatch, currentUser?._id, selectedUser]);

  // updating message status
  // useEffect(() => {
  //   fetch(`http://localhost:4005/api/message/all/${currentUser?._id}`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.success) {
  //         console.log("All Messages:", result.messages);
  //         dispatch(selAllMessages(result.messages));
  //       } else {
  //         console.log("Unexpected API response format:", result);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [isMessageReceived]);

  const messages = useSelector((state: RootState) => state.users.messages);
  // const allMessages = useSelector(
  //   (state: RootState) => state.users.allMessages
  // );

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

  useEffect(() => {
    if (!selectedUser) return;
    console.log("Fetching messages for:", selectedUser);

    fetch(`http://localhost:4005/api/message/${selectedUser}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response:", result);

        if (result.success && Array.isArray(result.messages)) {
          console.log("Dispatching messages:", result.messages);
          dispatch(setMessage(result.messages));
        } else {
          console.warn("Unexpected API response format:", result);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [selectedUser, dispatch]);

  useEffect(() => {
    fetch(`http://localhost:4005/api/notification/${currentUser?._id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response:", result);

        if (result.success) {
          console.log("Dispatching Notification:", result.notifications);
          dispatch(setNotification(result.notifications));
        } else {
          console.warn("Unexpected API response format:", result);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleNotifications = (user: any) => {
    return notifications.filter(
      (notification: any) => user._id === notification.sender
    );
  };

  const getLastMessageOfNotification = (user: any) => {
    const filtredMessages = handleNotifications(user);
    if (filtredMessages.length > 0) {
      return filtredMessages[filtredMessages.length - 1].message;
    }
    return "";
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
            socket.emit("deleteNotification", {
              currentUser: currentUser?._id,
              selectedUser: e.selectedKeys[0],
            });
          }}
        >
          {users
            .filter((user) => {
              return user._id !== currentUser?._id;
            })
            .map((user): any => {
              return (
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
                    <div className="flex flex-col">
                      <Text
                        style={{ color: "white" }}
                        className="hidden sm:block truncate align-bottom"
                      >
                        {user.firstName + " " + user.lastName}
                      </Text>

                      {/* Handling the notification */}
                      {handleNotifications(user).length > 0 && (
                        <div className="flex gap-1">
                          <p className="h-[25px] w-[25px] bg-red-400 rounded-full align-middle flex items-center justify-center font-bold">
                            {handleNotifications(user).length}
                          </p>

                          <p className="truncate">
                            {getLastMessageOfNotification(user)}
                          </p>
                        </div>
                      )}
                      {/* <p>{allMessages.filter((msg) => msg.status === "sent" && msg.sender ===  user._id).length}</p> */}
                    </div>
                  </div>

                  <div className="flex items-center absolute gap-2 left-[50px] bottom-4">
                    <div
                      className={`h-[11px] w-[11px] rounded-full bg-red ${
                        user.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                  </div>
                </Menu.Item>
              );
            })}
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
                  (user && user?.profilePic) || (
                    <UserOutlined style={{ color: "gray", fontSize: "20px" }} />
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
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
