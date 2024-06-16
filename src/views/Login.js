import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users/userSlice";
import { HOST } from "../constants";
const Context = React.createContext({
  name: "Default",
});
const Login = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [api, contextHolder] = notification.useNotification();

  const [state, setState] = useState({
    email: "pushpendravhpx@gmail.com",
    password: "googleuser",
    remember: false,
  });
  const onFinish = (values) => {
    console.log("Success:", values);

    signInWithEmailAndPassword(FirebaseAuth, values.email, values.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        let response = await fetch(HOST + "api/customers/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: user.uid,
          }),
        });
        if (response.ok) {
          let resdata = await response.json();
          console.log(resdata);
          let obj = {
            email: user.email,
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
          console.log(user);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Title } = Typography;
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      {contextHolder}
      <Title style={{ textAlign: "center" }} level={2}>
        Login
      </Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          remember: state.remember,
          email: state.email,
          password: state.password,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{ span: 16, offset: 4 }}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 16, offset: 4 }}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item valuePropName="checked" wrapperCol={{ span: 16, offset: 4 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
