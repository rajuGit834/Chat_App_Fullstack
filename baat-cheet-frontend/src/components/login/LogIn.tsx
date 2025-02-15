import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
import loginImage from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/usersApi";

// new
import { useDispatch } from "react-redux";
import { setCurrentUserId } from "../../redux/slices/usersSlice";

const { Title } = Typography;

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values: any) => {
    try {
      const response = await loginUser(values);

      if (response.data.success) {
        toast.success("Login Successfull!", {
          position: "top-center",
          autoClose: 2000,
        });

        dispatch(setCurrentUserId(response.data.user._id));
        navigate("/");
      } else {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const onFinish = (values: any) => {
    handleLogin(values);
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={10}
          xl={10}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={loginImage}
            alt="login"
            className="w-[100%] max-h-[100vh] object-cover"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={6} style={{ padding: "20px" }}>
          <div className="text-center mb-[20px]">
            <Title level={2} style={{ color: "#1268a4" }}>
              Login
            </Title>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "The input is not a valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Log in
              </Button>
              <div className="text-center mt-[10px]">
                Or <Link to="/signup">Register now!</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
        <ToastContainer />
      </Row>
    </>
  );
};

export default LogIn;
