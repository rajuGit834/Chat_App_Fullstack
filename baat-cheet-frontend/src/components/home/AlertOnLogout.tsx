import { Button, PopconfirmProps, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

interface AlertMessageProps {
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AlertOnLogout: React.FC<AlertMessageProps> = ({ setAlertMessage }) => {
  const navigate = useNavigate();
  const confirm: PopconfirmProps["onConfirm"] = () => {
    setAlertMessage("You Loged Out Successfully!");
    setTimeout(() => {
      setAlertMessage(null);
      navigate("/login");
    }, 500);
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    setAlertMessage("😊 Thank You!  Keep Chatting...");
    setTimeout(() => {
      setAlertMessage(null);
    }, 1000);
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
