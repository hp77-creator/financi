import { Card, Typography } from "antd";
import React from "react";
const AccountSummary = ({openingBalance, closingBalance}) => {
  return (
    <div>
      <Typography.Title
        level={4}
        style={{ padding: "10px 0px 0px 10px", fontWeight: "600" }}
      >
        Balance
      </Typography.Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            Opening -
          </Typography.Title>{" "}
        </div>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            ₹ {openingBalance} 
          </Typography.Title>{" "}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            Closing -
          </Typography.Title>{" "}
        </div>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            ₹ {closingBalance} 
          </Typography.Title>{" "}
        </div>
      </div>
      <Typography.Title level={4} style={{ padding: "10px 0px 0px 10px" }}>
        Overall
      </Typography.Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            Opening -
          </Typography.Title>{" "}
        </div>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            ₹ 5,38,231.24
          </Typography.Title>{" "}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            Closing -
          </Typography.Title>{" "}
        </div>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            ₹ 5,42,145.45
          </Typography.Title>{" "}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            Total -
          </Typography.Title>{" "}
        </div>
        <div>
          <Typography.Title level={5} style={{ padding: "10px 0px 0px 10px" }}>
            ₹ 42,145.45
          </Typography.Title>{" "}
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
