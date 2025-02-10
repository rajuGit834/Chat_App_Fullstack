import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, addMessage } from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";

import UploadImage from "./UploadImage";
import Messages from "./Messages";
import Dropdowns from "./Dropdowns";

import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const handleSubmitUserMessage = (): void => {
    if (!userMessage.trim() && !image) return;

    const user = users.find((user) => user.id === selectedUser);
    let userMsgId: number = 1;

    if (user) {
      const msgArray = user.messages;
      userMsgId =
        msgArray.length > 0 ? msgArray[msgArray.length - 1].msgId + 1 : 1;
    }

    dispatch(
      addMessage({
        userId: selectedUser,
        message: {
          msgId: userMsgId,
          type: "send",
          message: userMessage,
          imagePath: image || "",
        },
      })
    );

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
              Me
            </Text>
          </div>
        </div>
        <hr className="text-gray-600" />
        {/* all contacts */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(e) => {
            dispatch(setSelectedUser(parseInt(e.selectedKeys[0])));
          }}
        >
          {users.map((user): any => (
            <Menu.Item
              key={user.id}
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
                  {user.name}
                </Text>
              </div>
              <div className="flex items-center absolute gap-2 left-[50px] bottom-4">
                <div
                  className={`h-[11px] w-[11px] rounded-full bg-red ${
                    user.isActive ? "bg-green-500" : "bg-gray-500"
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
                  users.find((user) => user.id === selectedUser)
                    ?.profilePic || (
                    <UserOutlined style={{ color: "gray", fontSize: "20px" }} />
                  )
                }
              />

              <div className="flex flex-col justify-center items-start">
                <Text className="truncate font-bold">
                  {users.find((user) => user.id === selectedUser)?.name}
                </Text>
                <Text>
                  {users.find((user) => user.id === selectedUser)?.isActive
                    ? "online"
                    : "offline"}
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
            <Messages
              messages={
                users.find((user) => user.id === selectedUser)?.messages || []
              }
            />
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
