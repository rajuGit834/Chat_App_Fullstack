import { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteMessage } from "../../redux/slices/usersSlice";
import UpdateMessageModal from "./UpdateMessageModal";

interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
  imagePath: string;
}

interface MessagesProps {
  messages: Message[];
}

interface ListProps {
  msg: Message;
}

const List: React.FC<ListProps> = ({ msg }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const handleDeleteMessage = (): void => {
    dispatch(deleteMessage({ userId: selectedUser, messageId: msg.msgId }));
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={handleDeleteMessage}>Delete</p>,
    },
    {
      key: "2",
      label: msg.type === "send" && <UpdateMessageModal message={msg} />,
    },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button
            style={{
              border: "none",
              boxShadow: "none",
              padding: 0,
              height: 0,
            }}
            className="absolute right-0 cursor-pointer"
          >
            <MoreOutlined className="text-gray-600" />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const [onHover, setOnHover] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
      {messages.map((msg) => (
        <div
          key={msg.msgId}
          className={`flex justify-between min-w-[150px] max-w-[45%] break-all relative p-3 rounded-lg ${
            msg.type === "send" ? "ml-auto bg-blue-300" : "mr-auto bg-gray-200"
          }`}
        >
          <div
            className="flex justify-between gap-2 w-full relative"
            onMouseEnter={() => setOnHover(msg.msgId)}
          >
            {msg.imagePath && (
              <img
                className="h-[200px] w-[200px] bg-cover"
                src={msg.imagePath}
                alt="msgImage"
              />
            )}
            <p className="pl-2">{msg.message}</p>

            {msg.msgId === onHover && <List msg={msg} />}
          </div>
          <p className="text-[11px] text-gray-500 absolute bottom-0 right-5">
            10:01
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
