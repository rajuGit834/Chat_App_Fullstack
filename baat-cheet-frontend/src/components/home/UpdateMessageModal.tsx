import { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateMessage } from "../../redux/slices/usersSlice";

interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
  imagePath: string;
}

interface UpdateMessageProps {
  message: Message;
}

const updateMessageModal: React.FC<UpdateMessageProps> = ({ message }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(message.message);
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const handleUpdateMessage = (): void => {
    dispatch(
      updateMessage({
        userId: selectedUser,
        messageId: message.msgId,
        message: inputValue,
      })
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleUpdateMessage();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        onClick={showModal}
        style={{ background: "none", padding: 0 }}
      >
        Edit
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 outline-blue-500"
        />
      </Modal>
    </>
  );
};

export default updateMessageModal;
