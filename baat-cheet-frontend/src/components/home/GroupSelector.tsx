import { Select, Space, Button, Input } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  status: "online" | "offline";
}

const GroupSelector: React.FC<{ users: UserProps[] }> = ({ users }) => {
  const [onAddGroupButtonClicked, setOnAddGroupButtonClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);

  const handleOnAddGroupButtonClicked = () => {
    setOnAddGroupButtonClicked((prev) => !prev);
  };

  const handleChange = (selectedMembers: string[]) => {
    const updatedMembers = [...new Set([...selectedMembers, currentUser._id])];
    setMembers(updatedMembers);
  };

  const handleCreate = async () => {
    if (!groupName.trim() || members.length <= 1) {
      console.log("Group name is required and at least 2 members needed.");
      return;
    }
    // name, members, createdBy, admins, profilePic
    try {
      const response = await fetch(
        "http://localhost:4005/api/group/create-group",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: groupName,
            members,
            createdBy: currentUser._id,
            profilePic: "",
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("Group Created:", result.group);
        setOnAddGroupButtonClicked((prev) => !prev);
      } else {
        console.log("Failed to create group.");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const userOptions = users.map((user) => ({
    label: `${
      user._id === currentUser._id
        ? "You"
        : user.firstName + " " + user.lastName
    }`,
    value: user._id,
  }));

  return (
    <Space style={{ width: "100%", marginTop: "10px" }} direction="vertical">
      {!onAddGroupButtonClicked ? (
        <Button
          className="float-end mr-[5px] bg-transparent"
          onClick={handleOnAddGroupButtonClicked}
        >
          <PlusOutlined /> Group
        </Button>
      ) : (
        <div>
          <div className="flex gap-5 justify-around">
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e: any) => setGroupName(e.target.value)}
            />
            <CloseOutlined
              style={{ color: "white" }}
              onClick={handleOnAddGroupButtonClicked}
              className="float-end hover:bg-gray-400 rounded-full cursor-pointer p-1"
            />
          </div>
          <div className="flex gap-1">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select your friends"
              defaultValue={[currentUser._id]} // Store ID, show name
              onChange={handleChange}
              options={userOptions}
            />
            <Button
              onClick={handleCreate}
              disabled={!groupName.trim() || members.length <= 1}
            >
              Create
            </Button>
          </div>
        </div>
      )}
    </Space>
  );
};

export default GroupSelector;
