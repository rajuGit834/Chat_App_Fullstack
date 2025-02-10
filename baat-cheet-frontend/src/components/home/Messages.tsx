interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
  imagePath: string;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-3 w-full overflow-y-auto h-[100%]">
      {messages.map((msg) => (
        <div
          key={msg.msgId}
          className={`flex justify-between min-w-[100px] max-w-[45%] break-all relative p-3 rounded-lg ${
            msg.type === "send" ? "ml-auto bg-blue-300" : "mr-auto bg-gray-200"
          }`}
        >
          <div className="flex flex-col gap-2">
            {msg.imagePath && (
              <img
                className="h-[200px] w-[200px] bg-cover"
                src={msg.imagePath}
                alt=""
              />
            )}
            <p className="pl-2">{msg.message}</p>
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
