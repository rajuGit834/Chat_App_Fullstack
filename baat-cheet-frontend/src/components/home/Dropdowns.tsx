import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import ViewProfile from "./ViewProfile";

const Dropdowns: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button onClick={handleLogout}>Logout</button>,
    },
    // {
    //   key: "2",
    //   label: <ViewProfile />,
    // },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button style={{ border: "none", boxShadow: "none" }}>
            <MoreOutlined className=" text-gray-600 font-bold text-xl hover:bg-gray-200 rounded-full p-2" />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default Dropdowns;
