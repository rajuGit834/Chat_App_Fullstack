import { Select, Space, Button, Input } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createGroup } from "../../api/groupsApi";

const GroupSelector: React.FC = () => {
  const [onAddGroupButtonClicked, setOnAddGroupButtonClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const users = useSelector((state: any) => state.users.users);
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);

  const handleChange = (selectedMembers: string[]) => {
    const updatedMembers = [...new Set([...selectedMembers, currentUser._id])];
    setMembers(updatedMembers);
  };

  const handleCreateNewGroup = async () => {
    if (!groupName.trim() || members.length <= 1) {
      console.log("Group name is required and at least 2 members needed.");
      return;
    }
    try {
      const response = await createGroup(
        groupName,
        members,
        currentUser._id,
        ""
      );

      if (response.data.success) {
        console.log(response.data.message, response.data.group);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const userOptions = users.map((user: any) => ({
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
          onClick={() => setOnAddGroupButtonClicked(true)}
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
              onClick={() => setOnAddGroupButtonClicked(false)}
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
              onClick={handleCreateNewGroup}
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
