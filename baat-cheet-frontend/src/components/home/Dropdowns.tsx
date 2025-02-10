import { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Alert } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import AlertOnLogout from "./AlertOnLogout";
import ViewProfile from "./ViewProfile";

const Dropdowns: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <AlertOnLogout setAlertMessage={setAlertMessage} />,
    },
    {
      key: "2",
      label: <ViewProfile />,
    },
  ];

  return (
    <>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type="success"
          className="fixed top-0 right-[0%]"
        />
      )}
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
    </>
  );
};

export default Dropdowns;
