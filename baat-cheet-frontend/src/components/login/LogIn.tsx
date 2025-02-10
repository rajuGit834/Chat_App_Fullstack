import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
import loginImage from "../../assets/login.jpg";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LogIn: React.FC = () => {
  const handleLogin = (values: any): void => {
    fetch("http://localhost:5001", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values: any) => {
    handleLogin(values);
    console.log("Received values of form: ", values);
  };

  return (
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
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
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
    </Row>
  );
};

export default LogIn;
