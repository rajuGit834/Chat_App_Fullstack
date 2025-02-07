import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SendOutlined,
  FileImageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Typography, Tooltip } from "antd";

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const users: User[] = [
  {
    id: 1,
    name: "raju kumar",
    isActive: true,
  },
  {
    id: 2,
    name: "abhishek kumar",
    isActive: false,
  },
  {
    id: 3,
    name: "kamal kumar",
    isActive: true,
  },
  {
    id: 4,
    name: "anand",
    isActive: false,
  },
  {
    id: 5,
    name: "deepak kumar",
    isActive: false,
  },
  {
    id: 6,
    name: "supriya kumari",
    isActive: true,
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
      >
        <div className="demo-logo-vertical" />
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
                <Text className="truncate font-bold">{users[selectedUser].name}</Text>
                <Text>{users[selectedUser].isActive ? "online" : "ofline"}</Text>
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
            content
          </div>
        </Content>
        <Footer className="fixed bottom-0 w-[100%]">
          <div className="flex gap-5">
            <textarea
              placeholder="message..."
              className="w-[70%] bg-gray-300 outline-blue-300 pl-5 pt-2 rounded-full"
              defaultValue=""
            ></textarea>

            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => console.log(e.target.files)}
            /> */}

            <Tooltip title={"Upload Image"}>
              <FileImageOutlined
                style={{ color: "gray" }}
                className="text-[20px] p-2 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
              />
            </Tooltip>
            <Tooltip title={"Send"}>
              <SendOutlined
                style={{ color: "gray" }}
                className="text-[20px] p-2 pl-4 pr-4 hover:bg-gray-300 rounded-full cursor-pointer text-center"
              />
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
