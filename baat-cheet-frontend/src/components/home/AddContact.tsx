import { useEffect, useState } from "react";
import { Avatar, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { getSocket } from "../../../services/socket";
import { updateUser } from "../../redux/slices/usersSlice";
import FriendRequest from "./FriendRequest";
import { ToastContainer, toast } from "react-toastify";

const AddContact: React.FC<{ contacts: any }> = ({ contacts }) => {
  const socket = getSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let users = useSelector((state: any) => state.users.users);
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);
  const contactIdList = contacts.map((contact: any) => contact._id);
  contactIdList.push(currentUser._id);

  //filtering non contact users
  users = users.filter((user: any) => !contactIdList.includes(user._id));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSendRequest = (data: any) => {
      console.log("i received a request", data);
      dispatch(updateUser(data));
    };

    const handleResponse = (data: any) => {
      const { name, status, updatedUser } = data;

      console.log("updatedUser", updatedUser, status);
      if (status === "confirm") {
        if (data.from === "receiver") {
          toast.success(`${name + " "} Accepted Your Request`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } else {
        dispatch(updateUser(updatedUser));
        if (data.from === "receiver") {
          toast.info(`${name + " "} Rejected Your Request`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    };

    socket.on("send-request", handleSendRequest);
    socket.on("response-on-request", handleResponse);

    return () => {
      socket.off("send-request", handleSendRequest);
      socket.off("response-on-request", handleResponse);
    };
  }, []);

  const handleAddContact = (userId: any) => {
    socket.emit("send-request", { userId, sender: currentUser._id });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="float-end mt-2">
      <Button type="primary" onClick={showModal}>
        Add Contact
      </Button>
      <Modal
        title="All Users"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <p className="text-[20px] font-bold">New Users</p>
          {users.length === 0 ? (
            <p>No any new user found</p>
          ) : (
            users.map((user: any) => {
              if (!contactIdList.includes(user._id)) {
                return (
                  <div
                    key={user._id}
                    className="flex justify-around items-start"
                  >
                    <div className="flex gap-2 justify-center">
                      <Avatar>{user.profilePic ? "" : <UserOutlined />}</Avatar>
                      <p className="min-w-[150px]">{`${
                        user.firstName + " " + user.lastName
                      } `}</p>
                    </div>
                    <Button
                      type={"primary"}
                      onClick={() => handleAddContact(user._id)}
                    >
                      Add
                    </Button>
                  </div>
                );
              }
            })
          )}
          <FriendRequest />
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AddContact;
