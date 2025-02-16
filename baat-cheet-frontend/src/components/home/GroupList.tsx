import { useEffect } from "react";
import { Menu, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAllGroups } from "../../api/groupsApi";
import {
  setGroupMessages,
  setGroups,
  setSelectedGroup,
} from "../../redux/slices/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupSelector from "./GroupSelector";
import { setMessage, setSelectedUser } from "../../redux/slices/usersSlice";
import { getGroupMessageById } from "../../api/groupMessagesApi";

const { Text } = Typography;

const GroupList: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);
  const selectedGroupId = useSelector(
    (state: any) => state.groups.selectedGroupId
  );

  //fetching groups details
  useEffect(() => {
    const fetchAllGroups = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await getAllGroups(currentUser?._id);

        if (response.data.success) {
          dispatch(setGroups(response.data.groups));
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllGroups();
  }, []);

  useEffect(() => {
    if (!selectedGroupId) return;
    const fetchGroupMessages = async () => {
      try {
        const response = await getGroupMessageById(selectedGroupId);
        if (response.data.success) {
          console.log("grp msg", response.data.groupMessages);
          dispatch(setGroupMessages(response.data.groupMessages));
          dispatch(setMessage([]));
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupMessages();
  }, [selectedGroupId]);

  const groups = useSelector((state: any) => state.groups.groups);

  return (
    <>
      <GroupSelector />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedGroupId ? [selectedGroupId] : []}
        onSelect={(e) => {
          dispatch(setSelectedGroup(e.selectedKeys[0]));
          dispatch(setSelectedUser(null));
          //   const socket = getSocket();
          //   socket.emit("deleteNotification", {
          //     currentUser: currentUser?._id,
          //     selectedUser: e.selectedKeys[0],
          //   });
        }}
      >
        {groups.map((group: any) => (
          <Menu.Item
            key={group._id}
            style={{ height: "70px", position: "relative" }}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                size="large"
                src={
                  group.profilePic || (
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
                  {group.name}
                </Text>

                {/* Handling the notification */}
                {/* {handleNotifications(user).length > 0 && (
                <div className="flex gap-1">
                  <p className="h-[25px] w-[25px] bg-red-400 rounded-full align-middle flex items-center justify-center font-bold">
                    {handleNotifications(user).length}
                  </p>

                  <p className="truncate">
                    {getLastMessageOfNotification(user)}
                  </p>
                </div>
              )} */}
                {/* <p>{allMessages.filter((msg) => msg.status === "sent" && msg.sender ===  user._id).length}</p> */}
              </div>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default GroupList;
