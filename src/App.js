import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { redirect } from "react-router-dom";

import "antd/dist/reset.css";
import Home from "./views/Home";
import Login from "./views/Login";
import { useSelector, useDispatch } from "react-redux";
import Register from "./views/Register";
import Redirect from "./views/Redirect";

function App({ children }) {
  let [state, setState] = useState({
    username: "abcde",
    email: "abcd@gmail.com",
    password: "googleuser",
  });

  const userState = useSelector((state) => state.user);

  return <div style={{ margin: "0 auto" }}>{children}</div>;
}

export default App;
