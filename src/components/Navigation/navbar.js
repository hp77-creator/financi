// src/components/Navbar.js

import React from "react";
import { Menu, Layout } from "antd";
import { HomeOutlined, QuestionOutlined } from "@ant-design/icons";
import Home from "../../views/Home";

const Navbar = () => {
  return (
    <Layout.Header
      style={{
        display: "flex",
        paddingInline: "0px",
        background: "#fff",
      }}
    >
      <div
        className="logo"
        style={{
          width: "150px",
          height: "100%",
          color: "#000",
          fontWeight: "600",
          display: "grid",
          placeContent: "center",
          fontSize: "24px",
        }}
      >
        financi
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: 1,
            label: "Home",
            icon: <HomeOutlined />,
            component: <Home />
          },
          {
            key: 2,
            label: "How to use",
            icon: <QuestionOutlined />,
          }
        ]}
      />
    </Layout.Header>
  );
};

export default Navbar;
