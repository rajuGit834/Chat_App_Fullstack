import registerImage from "../../assets/register.jpg";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    toast.success("Registration Successful!", {
      position: "top-center",
      autoClose: 3000,
    });
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
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Last Name"
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
            <Input prefix={<MailOutlined />} size="large" placeholder="Email" />
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
            <div className="text-center mt-[10px]">
              Already a member? <Link to={"/login"}>Log in</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default SignUp;
