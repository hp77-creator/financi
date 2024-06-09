import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./reducers/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./firebase";
import { login } from "./reducers/users/userSlice";

const IndexComponent = () => {
  let userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        let storage = JSON.parse(localStorage.getItem("obj"));

        dispatch(login({ ...user, user_id: storage.user_id }));
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: true ? (
        <App>
          {" "}
          <Home />
        </App>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/register",
      element:
        userState.isLoggedIn === false ? (
          <App>
            <Register />
          </App>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/login",
      element:
        userState.isLoggedIn === false ? (
          <App>
            <Login />
          </App>
        ) : (
          <Navigate to="/" replace />
        ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      {/* <App /> */}
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IndexComponent />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
