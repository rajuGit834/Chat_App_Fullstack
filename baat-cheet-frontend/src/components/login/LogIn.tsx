import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import loginImage from "../../assets/login.jpg";

const LogIn: React.FC = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[50%] bg-cover">
        <img src={loginImage} alt="login" />
      </div>

      <div className="flex flex-col items-center h-screen gap-10 w-[50%] pt-60 p-5">
        <h1 className="text-[25px] font-bold underline text-[#1268a4]">
          Login
        </h1>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "60%" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Flex justify={"space-between"}>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <p className="text-blue-500 cursor-pointer hover:text-blue-700">Forgot password?</p>
            </Form.Item>
          </Flex>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            <p className="text-blue-500 cursor-pointer hover:text-blue-700">Register now!</p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
