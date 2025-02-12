import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
import loginImage from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";

// new
import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../redux/slices/usersSlice";

const { Title } = Typography;

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // new

  const handleLogin = (values: any): void => {
    fetch("http://localhost:4005/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json().then((result) => {
          console.log(result);
          if (result.message === "Login Successful") {
            toast.success("Login Successfull!", {
              position: "top-center",
              autoClose: 500,
            });
            console.log(" current user", result.user)
            // dispatch(setCurrentUser(result.user)); //new

            // localStorage.setItem("baat-cheet-webToken", result.token);
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            toast.error(result.error, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
        });
        console.log(error);
      });
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
