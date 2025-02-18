import { useEffect, useState } from "react";
import { getSocket } from "../../../services/socket";
import { setSelectedUser } from "../../redux/slices/usersSlice";
import { Menu, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/slices/usersSlice";
import { getAllNotifications } from "../../api/notificationApi";
import { getContactOfUser } from "../../api/usersApi";
import { setSelectedGroup } from "../../redux/slices/groupSlice";
import AddContact from "./AddContact";

const { Text } = Typography;

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const notifications = useSelector((state: any) => state.users.notifications);
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);
  const selectedUser = useSelector((state: any) => state.users.selectedUser);

  const handleNotifications = (user: any) => {
    return notifications.filter(
      (notification: any) =>
        user._id === notification.sender &&
        notification.messageType === "personal"
    );
  };

  const getLastMessageOfNotification = (user: any) => {
    const filtredMessages = handleNotifications(user);
    if (filtredMessages.length > 0) {
      return filtredMessages[filtredMessages.length - 1].message;
    }
    return "";
  };

  // fetching notification
  useEffect(() => {
      // fetching notification
    const fetchAllNotification = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await getAllNotifications(currentUser._id);
        if (response.data.success) {
          console.log("fetching noti", response.data.notifications);
          dispatch(setNotification(response.data.notifications));
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

      // fetching notification
    const fetchAllContactOfCurrentUser = async () => {
      try {
        const response = await getContactOfUser();
        if (response.data.success) {
          setContacts(response.data.contacts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContactOfCurrentUser();
    fetchAllNotification();
  }, []);

  if (loading) {
    return <p>fetching your contacts...</p>;
  }

  return (
    <>
      <AddContact contacts={contacts} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedUser ? [selectedUser] : []}
        onSelect={(e) => {
          dispatch(setSelectedUser(e.selectedKeys[0]));
          dispatch(setSelectedGroup(null));
          const socket = getSocket();
          socket.emit("deleteNotification", {
            currentUser: currentUser?._id,
            selectedUser: e.selectedKeys[0],
          });
        }}
      >
        {/* {users
          .filter((user: any) => {
            return user._id !== currentUser?._id;
          }) */}
        {contacts.map((user: any) => {
          return (
            <Menu.Item
              key={user._id}
              style={{ height: "70px", position: "relative" }}
            >
              <div className="flex gap-2 items-center">
                <Avatar
                  size="large"
                  src={
                    user.profilePic || (
                      <UserOutlined
                        style={{
                          color: "gray",
                          fontSize: "20px",
                          background: "white",
                          padding: "9px",
                        }}
                      />
                    )
                  }
                />
                <div className="flex flex-col">
                  <Text
                    style={{ color: "white" }}
                    className="hidden sm:block truncate align-bottom"
                  >
                    {user.firstName + " " + user.lastName}
                  </Text>

                  {/* Handling the notification */}
                  {handleNotifications(user).length > 0 && (
                    <div className="flex gap-1">
                      <p className="h-[25px] w-[25px] bg-red-400 rounded-full align-middle flex items-center justify-center font-bold">
                        {handleNotifications(user).length}
                      </p>

                      <p className="truncate">
                        {getLastMessageOfNotification(user)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center absolute gap-2 left-[50px] bottom-4">
                <div
                  className={`h-[11px] w-[11px] rounded-full bg-red ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default UserList;
