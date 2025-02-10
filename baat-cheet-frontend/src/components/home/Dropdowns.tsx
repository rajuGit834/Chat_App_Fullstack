import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import AlertOnLogout from "./AlertOnLogout";
import ViewProfile from "./ViewProfile";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <AlertOnLogout />,
  },
  {
    key: "2",
    label: <ViewProfile />,
  },
];

const Dropdowns: React.FC = () => (
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

export default Dropdowns;
