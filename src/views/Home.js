import React, { useState } from "react";
import readXlsxFile from 'read-excel-file';
import { InboxOutlined} from "@ant-design/icons";
import {
  Button,
  Layout,
  Card,
  Avatar,
  Form,
  Upload,
  Divider,
  Typography,
  List,
  Tag,
  Modal,
} from "antd";
import "./home.css";
import Transactions from "../components/Transactions/Transactions";
import Navbar from "../components/Navigation/navbar";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [balanceData, setBalanceData] = useState({ openingBalance: 0, closingBalance: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputBox, setInputBox] = useState(true);
  const [modalItem, setModalItem] = useState({});
  const [recentTxn, setRecentTxn] = useState([]);

  const isValidDateFormat = (str) => /^\d{2}\/\d{2}\/\d{2}$/.test(str);
  const formatDate = (date) => `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
  const parseDate = (dateString) => {
    if (!dateString || !isValidDateFormat(dateString)) return new Date();
    const [day, month, year] = dateString.split('/');
    return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const handleUpload = async () => {
    setInputBox(false);
    if (files.length === 0) return;
    const file = files[0].originFileObj;
    try {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') throw new Error('Invalid file type. Please upload an Excel file.');
      const rows = await readXlsxFile(file);
      const processed = processData(rows);
      setRecentTxn(processed.latestNarrations);
      console.log("balanceData", processed.balanceData);
      setBalanceData(processed.balanceData);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const processNarration = (narration) => {
    let mode = '';
    let nameNarr = '';
    const parts = narration.split(/[-\s]+/);
    if (parts.length > 0) mode = parts[0].toUpperCase();
    const atIndex = narration.indexOf('@');
    if (atIndex !== -1) {
      const dashIndex = narration.lastIndexOf('-', atIndex);
      if (dashIndex !== -1) nameNarr = narration.substring(dashIndex + 1, atIndex).trim();
    } else {
      const lastDashIndex = narration.lastIndexOf('-');
      if (lastDashIndex !== -1) nameNarr = narration.substring(lastDashIndex + 1).trim();
    }
    return { mode, nameNarr };
  };

  const normFile = (e) => {
    setFiles(e?.fileList ?? []);
    return e?.fileList;
  };

  const showModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const processData = (data) => {
    const columns = data[0];
    const narrationIndex = columns.indexOf('Narration');
    const withdrawalAmtIndex = columns.indexOf('Withdrawal Amt.');
    const depositAmtIndex = columns.indexOf('Deposit Amt.');
    const dateIndex = columns.indexOf('Date');

    const transactionData = data.slice(1).map((row) => ({
      narration: row[narrationIndex],
      withdrawalAmt: parseFloat(row[withdrawalAmtIndex]) || 0,
      depositAmt: parseFloat(row[depositAmtIndex]) || 0,
      date: parseDate(row[dateIndex]),
    })).sort((a, b) => parseDate(b.date) - parseDate(a.date));

    const latestNarrations = transactionData.slice(0, 10).map(transaction => ({
      name: transaction.narration,
      amount: transaction.withdrawalAmt,
      date: formatDate(transaction.date),
    }));

    const balanceLabelsRow = data.find(row => row.includes('Opening Balance'));
    const balanceValuesRow = data[data.indexOf(balanceLabelsRow) + 1];
    const openingBalance = parseFloat(balanceValuesRow[0]) || 0;
    const closingBalance = parseFloat(balanceValuesRow[6]) || 0;

    return { transactionData, latestNarrations, balanceData: { openingBalance, closingBalance } };
  };

  return (
    <div>
      <Layout>
        <Navbar />
      </Layout>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            height: "calc(100vh - 64px)",
            width: "100%",
            display: "block",
            flexWrap: "wrap",
            overflow: "scroll",
          }}
        >
          <Card style={{ width: "100%", marginTop: 16, height: "min-content" }}>
            {!inputBox ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Card>
                  Thank you for loading your statement.
                  <br />
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      setInputBox(true);
                      setFiles([]);
                      setBalanceData({
                        openingBalance: 0,
                        closingBalance: 0,
                      });
                      setRecentTxn([]);
                    }}
                  >
                    Click here
                  </Button>
                  <br />
                  to view another statement.
                </Card>
              </div>
            ) : (
              <Form onFinish={() => { }}>
                <Form.Item>
                  <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger
                      name="files"
                      onRemove={() => {
                        setFiles([]);
                        return true;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Upload your Bank Statement Here</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }} shouldUpdate>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={files.length === 0}
                    onClick={handleUpload}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Card>
          <Divider style={{ margin: "0px" }}></Divider>
          <div style={{ display: "flex" }} className="dashboardInfoContainer">
            <div style={{ width: "100%" }}>
              <Transactions openingBalance={balanceData.openingBalance} closingBalance={balanceData.closingBalance} />
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                border: "1px solid #dedede",
                borderRadius: "10px",
                maxHeight: "856px",
                overflow: "auto",
                padding: "20px",
              }}
            >
              <Typography.Title level={3} style={{ padding: "20px 0px 0px 20px" }}>
                Recent transactions
              </Typography.Title>
              <List
                dataSource={recentTxn}
                renderItem={(item) => {
                  const { mode, nameNarr } = processNarration(item.name);
                  return (
                    <List.Item key={item.transaction_id} className="listItem" onClick={() => showModal(item)}>
                      <List.Item.Meta
                        avatar={<Avatar src={"https://randomuser.me/api/portraits/men/35.jpg"} />}
                        title={<span>{nameNarr}</span>}
                        description={
                          <>
                            {item.date}
                            <Tag color="#f50">{mode}</Tag>
                          </>
                        }
                      />
                      <div>
                        <span style={{ color: item.type === false ? "black" : "green" }}>₹ {item.amount}</span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal title="Transaction Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalItem.name}</p>
        <p>{modalItem.amount}</p>
        <p>{modalItem.date}</p>
      </Modal>
    </div>
  );
};

export default Home;