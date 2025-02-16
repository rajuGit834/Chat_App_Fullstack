import { useEffect, useState } from "react";
import { Menu, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAllGroups } from "../../api/groupsApi";
import { setGroups } from "../../redux/slices/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupSelector from "./GroupSelector";

const { Text } = Typography;

const GroupList: React.FC = () => {
  const [selectedGroup, setSelectedGroup]: any = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);

  //fetching groups details
  useEffect(() => {
    const fetchAllGroups = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await getAllGroups(currentUser?._id);

        if (response.data.success) {
          dispatch(setGroups(response.data.groups));
          console.log("All groups", response.data.groups);
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllGroups();
  }, []);

  const groups = useSelector((state: any) => state.groups.groups);

  return (
    <>
      <GroupSelector />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[""]}
        onSelect={(e) => {
          setSelectedGroup(e.selectedKeys[0]);
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
