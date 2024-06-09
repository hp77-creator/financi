import { Button, Card, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  EditOutlined,
  InboxOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import AccountSummary from "./AccountSummary";
import HighchartsReact from "highcharts-react-official";
var Highcharts = require("highcharts");

const Transactions = () => {
  const [open, setOpen] = useState(false);
  let [chartState, setChartState] = useState({
    courseSelected: "Monthly Spends",
    marks: [0, 0, 0, 0],
  });
  useEffect(() => {}, []);
  let transactions = useSelector((state) => state.user.transaction);
  useEffect(() => {
    console.log(transactions);
    if (!transactions?.length) return;
    let balanceGraph = [];
    let debitGraph = [];
    let creditGraph = [];
    let xAxis = [];

    for (let i = 0; i < transactions.length; i++) {
      balanceGraph.push(Number(transactions[i]?.closing_balance));
      if (transactions[i].type === true) {
        creditGraph.push(Number(transactions[i]?.amount));
        debitGraph.push(0.0);
      } else {
        creditGraph.push(0.0);
        debitGraph.push(Number(transactions[i]?.amount));
      }
      xAxis.push(transactions[i]["date"]);
    }
    setChartState((prev) => {
      return { ...prev, balanceGraph, debitGraph, creditGraph, xAxis };
    });
  }, [transactions]);
  useEffect(() => {
    console.log(chartState);
  }, [chartState]);
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: chartState.courseSelected + " Chart",
    },
    xAxis: {
      categories: chartState.xAxis,
    },
    series: [
      {
        name: "Balanace v/s Date",
        data: chartState.balanceGraph,
      },
      {
        name: "Debit v/s Date",
        data: chartState.debitGraph,
      },
      {
        name: "Credit v/s Date",
        data: chartState.creditGraph,
      },
    ],
  };
  return (
    <div>
      <Typography.Title level={3} style={{ padding: "10px 0px 0px 10px" }}>
        Insights
      </Typography.Title>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card
          style={{
            width: "100%",
            marginTop: 16,
            height: "min-content",
            border: "1px solid #dedede",
            flex: "1 1 300px",
            margin: "16px",
          }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
          title={
            <Typography.Title
              level={4}
              style={{ padding: "10px 0px 0px 10px" }}
            >
              Account Summary
            </Typography.Title>
          }
        >
          <AccountSummary />
        </Card>
        <div
          style={{
            width: "100%",
            marginTop: 16,
            flex: "1 1 300px",
            margin: "16px",
            padding: "0 0 5px 0",
          }}
        >
          <Card
            style={{
              height: "50%",
              borer: "1px solid #dedede",
              margin: "0 0 5px 0 ",
            }}
            title={
              <Typography.Title
                level={4}
                style={{ padding: "10px 0px 0px 10px" }}
              >
                Online Transactions
              </Typography.Title>
            }
          ></Card>
          <Card
            style={{
              height: "50%",
              borer: "1px solid #dedede",
              margin: "5px 0 0 0",
            }}
            title={
              <Typography.Title
                level={4}
                style={{ padding: "10px 0px 0px 10px" }}
              >
                SBI Bank Details
              </Typography.Title>
            }
          ></Card>
        </div>
        <br />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card
          style={{
            width: "100%",
            marginTop: 16,
            height: "min-content",
            border: "1px solid #dedede",
            flex: "1 1 300px",
            margin: "16px",
          }}
          title={
            <Typography.Title
              level={4}
              style={{ padding: "10px 0px 0px 10px" }}
            >
              Monthly Spends Charts
            </Typography.Title>
          }
        >
          <div onClick={() => setOpen(true)}>
            <Button>Open Main Graph</Button>
          </div>
        </Card>
      </div>
      <Modal
        title="Online Summary"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Modal>
    </div>
  );
};

export default Transactions;
