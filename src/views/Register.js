import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import { useDispatch } from "react-redux";
import { FirebaseAuth } from "./../firebase/index";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { login } from "../reducers/users/userSlice";
import { HOST } from "../constants";
const Context = React.createContext({
  name: "Default",
});
const Register = () => {
  const [state, setState] = useState({
    user_name: "pushpendrahpx",
    email:
      "pushpendra.h" +
      Math.floor(Math.random() * (999 - 100 + 1) + 100) +
      "px2001@gmail.com",
    password: "googleuser",
    remember: false,
  });
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    console.log("Success:", values);

    createUserWithEmailAndPassword(FirebaseAuth, values.email, values.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        let response = await fetch(HOST + "api/customers", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            uid: user.uid,
            user_name: values.user_name,
          }),
        });
        if (response.ok) {
          let resdata = await response.json();
          let obj = {
            email: user.email,
            user_name: values.user_name,
            uid: user.uid,
            user_id: resdata.user_id,
            ...user,
          };
          localStorage.setItem("obj", JSON.stringify(obj));
          dispatch(login(obj));
          api.info({
            message: `User Created`,
            description: (
              <Context.Consumer>
                {({ name }) => `Hello, ${values.email}!`}
              </Context.Consumer>
            ),
            placement: "topRight",
          });
        } else {
          console.error("Failed Sign Up");

          api.error({
            message: `Failed Sign U`,
            description: (
              <Context.Consumer>
                {({ name }) => `Signup Failed for ${values.email}!`}
              </Context.Consumer>
            ),
            placement: "topRight",
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        // ..
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Title } = Typography;
  return (
    <div style={{ padding: "10px" }}>
      {contextHolder}
      <Title style={{ textAlign: "center" }} level={2}>
        Sign Up
      </Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          user_name: "psid",
          remember: state.remember,
          email: state.email,
          password: state.password,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="user_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
