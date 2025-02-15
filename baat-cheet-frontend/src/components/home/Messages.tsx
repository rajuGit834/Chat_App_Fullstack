import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setMessage } from "../../redux/slices/usersSlice";
import { getMessages } from "../../api/messagesApi";

interface MessageType {
  _id: string;
  sender?: string;
  receiver?: string;
  message?: string;
  imageUrl?: string;
  status: "sent" | "delivered" | "seen";
}

interface MessagesProps {
  messages: MessageType[];
}

// interface ListProps {
//   msg: MessageType;
// }

// const List: React.FC<ListProps> = ({ msg }) => {
//   const dispatch = useDispatch();
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );

//   const handleDeleteMessage = (): void => {
//     dispatch(deleteMessage({ userId: selectedUser, messageId: msg.msgId }));
//   };

//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: <p onClick={handleDeleteMessage}>Delete</p>,
//     },
//     {
//       key: "2",
//       label: msg.type === "send" && <UpdateMessageModal message={msg} />,
//     },
//   ];

//   return (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown
//           menu={{ items }}
//           placement="bottomLeft"
//           arrow={{ pointAtCenter: true }}
//         >
//           <Button
//             style={{
//               border: "none",
//               boxShadow: "none",
//               padding: 0,
//               height: 0,
//             }}
//             className="absolute right-0 cursor-pointer"
//           >
//             <MoreOutlined className="text-gray-600" />
//           </Button>
//         </Dropdown>
//       </Space>
//     </Space>
//   );
// };

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  // const [onHover, setOnHover] = useState<String | null>(null);
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  //fetching messages
  useEffect(() => {
    if (!selectedUser) return;
    console.log("Fetching messages for:", selectedUser);

    const fetchMessageOfSelectedUser = async () => {
      try {
        const response = await getMessages(selectedUser);
        if (response.data.success) {
          console.log("all messages", response.data.messages);
          dispatch(setMessage(response.data.messages));
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessageOfSelectedUser();
  }, [selectedUser]);

  const currentUser = useSelector(
    (state: RootState) => state.users.getCurrentUser
  );

  return (
    <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
      {messages
        .filter(
          (msg) =>
            (msg.sender === currentUser?._id &&
              msg.receiver === selectedUser) ||
            (msg.sender === selectedUser && msg.receiver === currentUser?._id)
        )
        .map((msg) => (
          <div
            key={msg._id}
            className={`flex justify-between min-w-[150px] max-w-[45%] break-all relative p-3 rounded-lg ${
              msg.sender === currentUser?._id
                ? "ml-auto bg-blue-300"
                : "mr-auto bg-gray-200"
            }`}
          >
            <div
              className="flex justify-between gap-2 w-full relative"
              // onMouseEnter={() => setOnHover(msg.msgId)}
            >
              {msg.imageUrl && (
                <img
                  className="h-[200px] w-[200px] bg-cover"
                  src={msg.imageUrl}
                  alt="msgImage"
                />
              )}
              <p className="pl-2">{msg.message}</p>

              {/* {msg.msgId === onHover && <List msg={msg} />} */}
            </div>
            {/* <p className="text-[11px] text-gray-500 absolute bottom-0 right-5">
              {
                new Date(msg?.createdAt && msg?.createdAt).toTimeString().split(" ")[0]
              }
            </p> */}
          </div>
        ))}
    </div>
  );
};

export default Messages;
