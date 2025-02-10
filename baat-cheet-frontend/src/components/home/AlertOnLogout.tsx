import { Button, PopconfirmProps, message, Popconfirm } from "antd";

import { useNavigate } from "react-router-dom";

const AlertOnLogout: React.FC = () => {
  const navigate = useNavigate();
  const confirm: PopconfirmProps["onConfirm"] = () => {
    message.success("You Loged Out Successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Logout"
      description="Are you sure, you want to logout?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      style={{ marginRight: "100px" }}
    >
      <Button
        type="text"
        style={{
          background: "none",
        }}
      >
        Logout
      </Button>
    </Popconfirm>
  );
};

export default AlertOnLogout;
