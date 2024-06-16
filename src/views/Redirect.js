import React from "react";
import { Tabs } from "antd";
import { redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Redirect = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      You are at wrong place !<div></div>
    </div>
  );
};
export default Redirect;
