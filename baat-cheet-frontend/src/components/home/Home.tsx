import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  VideoCameraOutlined,
  SendOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UploadImage from "./UploadImage";
import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";
import Messages from "./Messages";

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
}

interface User {
  id: number;
  name: string;
  isActive: boolean;
  messages: Message[];
}

const users: User[] = [
  {
    id: 1,
    name: "raju kumar",
    isActive: true,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Raju",
      },
      {
        msgId: 6,
        type: "send",
        message: "I am fine.",
      },
      {
        msgId: 7,
        type: "send",
        message:
          "I am Rajunw dlvnewdv vjovj osvjo njove rnjov erfoi ovbroe  okvbnro obrobvoi nornvboi norkvbor nvorovr nornbor nvornvbojr nvrovbor bnrnbvorn joivbrobn nvronvor nbvkrnor nvkrnbojr nvorjv nvbronbb ",
      },
    ],
  },
  {
    id: 2,
    name: "abhishek kumar",
    isActive: false,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Abhishek",
      },
    ],
  },
  {
    id: 3,
    name: "kamal kumar",
    isActive: true,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Kamal",
      },
    ],
  },
  {
    id: 4,
    name: "anand",
    isActive: false,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Anand",
      },
    ],
  },
  {
    id: 5,
    name: "deepak kumar",
    isActive: false,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Deepak",
      },
    ],
  },
  {
    id: 6,
    name: "supriya kumari",
    isActive: true,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Supriya",
      },
    ],
  },
];

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getColor = (): string => {
    const randomNumber: number = Math.floor(Math.random() * 1000000);
    return `#${randomNumber.toString(16).padStart(6, "0")}`;
  };

  return (
    <Layout style={{ height: "100vh" }}>
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
          <div className="flex gap-5 items-center pl-2 pt-3">
            <Avatar
              style={{
                backgroundColor: "gray",
                verticalAlign: "middle",
              }}
              size="large"
              gap={20}
            >
              <UserOutlined className="text-[20px]" />
            </Avatar>
            <Text style={{ color: "white" }} className="truncate">
              {"Me"}
            </Text>
          </div>
        </div>
        <hr className="text-gray-600" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(e) => setSelectedUser(parseInt(e.key) - 1)}
          // items={items}
        >
          {users.map((user): any => (
            <Menu.Item
              key={user.id}
              style={{ height: "70px", position: "relative" }}
            >
              <div className="flex gap-5 items-center">
                <Avatar
                  style={{
                    backgroundColor: getColor(),
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={20}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Text style={{ color: "white" }} className="truncate">
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
          <div className="relative w-[50%]">
            <div className="flex gap-5 items-center">
              <Avatar
                style={{
                  backgroundColor: getColor(),
                  verticalAlign: "middle",
                }}
                size="large"
                gap={20}
              >
                {users[selectedUser].name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="flex flex-col justify-center items-start">
                <Text className="truncate font-bold">
                  {users[selectedUser].name}
                </Text>
                <Text>
                  {users[selectedUser].isActive ? "online" : "offline"}
                </Text>
              </div>
            </div>
          </div>
          <Link to="/login">
            <Tooltip
              title="logout"
              className="float-right text-[22px] p-2 hover:bg-gray-400/50 rounded-full cursor-pointer"
            >
              <LogoutOutlined />
            </Tooltip>
          </Link>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100%",
            }}
          >
            <Messages messages={users[selectedUser].messages} />
          </div>
        </Content>
        <Footer className="w-full bg-white p-4 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <textarea
              placeholder="message..."
              className="w-[80%] bg-gray-300 outline-blue-300 pl-5 pt-2 rounded-full"
              defaultValue=""
            ></textarea>

            <Tooltip title={"Upload Image"}>
              {/* <FileImageOutlined
                style={{ color: "gray" }}
                className="text-[20px] p-4 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
              /> */}
            </Tooltip>
              <UploadImage />
            <Tooltip title={"Send"}>
              <SendOutlined
                style={{ color: "gray" }}
                className="text-[20px] p-4 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
              />
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
