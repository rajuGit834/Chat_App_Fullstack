import registerImage from "../../assets/register.jpg";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
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
          src={registerImage}
          alt="register"
          className="w-full object-cover"
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={6} style={{ padding: "20px" }}>
        <div className="text-center mb-[20px]">
          <Title level={2} style={{ color: "#1268a4" }}>
            SignUp
          </Title>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                size="large"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                size="large"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" size="large">
                Register
              </Button>
              Already a member? <Link to={"/login"}>Log in</Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
