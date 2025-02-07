interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
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
          className={`flex justify-between w-[45%] relative p-3 rounded-lg ${
            msg.type === "send" ? "ml-auto bg-blue-300" : "mr-auto bg-gray-200"
          }`}
        >
          <p className="pl-2">{msg.message}</p>
          <p className="text-[11px] text-gray-500 absolute bottom-0.5 right-5">
            10:01
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
