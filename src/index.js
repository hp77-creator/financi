import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./reducers/store";
import { Provider } from "react-redux";
import {
  HashRouter, Route, Routes
} from "react-router-dom";
import Home from "./views/Home";

const IndexComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <Home />
            </App>
          }
        />
      </Routes>
    </HashRouter>
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
