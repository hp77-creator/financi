import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import readXlsxFile from 'read-excel-file';
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
  HomeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Menu,
  Layout,
  Header,
  Card,
  Skeleton,
  Avatar,
  Form,
  Upload,
  Divider,
  Typography,
  List,
  Tag,
  Modal,
} from "antd";
import {
  addConvertedData,
  addTags,
  addTransactions,
} from "../reducers/users/userSlice";
import "./home.css";
import { APYHUB_Bar_Request } from "../functions/APYHUB";
import Transactions from "../components/Transactions/Transactions";
import { HOST, PDF_HOST } from "../constants";
const csv = require("csvtojson");

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const { Meta } = Card;
const items = [
  getItem("Pie Chart", "1", <PieChartOutlined />),
  getItem("Desktop", "2", <DesktopOutlined />),
  // getItem("", "3", <ContainerOutlined />),
];
const Home = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const userState = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [converted, setConverted] = useState([]);
  const [balanceData, setBalanceData] = useState({openingBalance: 0, closingBalance: 0});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputBox, setInputBox] = useState(true);
  const [modalItem, setModalItem] = useState({});
  
// Upload file function
const handleUpload = async () => {
  setInputBox(false);
  if (files.length === 0) {
    return;
  }

  const file = files[0].originFileObj;

  try {
    // Ensure the file is of the correct type
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new Error('Invalid file type. Please upload an Excel file.');
    }

    const rows = await readXlsxFile(file);
    console.log('Read file data:', rows);

    // Perform the upload or any other necessary actions with the file data
    const processed = processData(rows);
    setBalanceData(processed.balanceData);
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};
const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    setFiles(e?.fileList ?? []);
    return e?.fileList;
  };

  const showModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const processData = (data) => {
    const columns = data[0]; // Assuming the first row is the header
    const narrationIndex = columns.indexOf('Narration');
    const withdrawalAmtIndex = columns.indexOf('Withdrawal Amt.');
    const depositAmtIndex = columns.indexOf('Deposit Amt.');

    const transactionData = data.slice(1).map((row) => ({
      narration: row[narrationIndex],
      withdrawalAmt: parseFloat(row[withdrawalAmtIndex]) || 0,
      depositAmt: parseFloat(row[depositAmtIndex]) || 0,
    }));

    // Find the row containing "Opening Balance" and "Closing Balance"
    const balanceLabelsRow = data.find(row => row.includes('Opening Balance'));
    const balanceValuesRow = data[data.indexOf(balanceLabelsRow) + 1];

    const openingBalance = parseFloat(balanceValuesRow[0]) || 0;
    const closingBalance = parseFloat(balanceValuesRow[6]) || 0;

    return {
      transactionData,
      balanceData: { openingBalance, closingBalance },
    };
  };



  useEffect(() => {
    // loadTransactions();
  }, [userState.transactions]);

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Modal
        title={modalItem.merchant_name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText=""
      >
        {Object.keys(modalItem).map((eachItem, eachIndex) => {
          return (
            <>
              <span>
                {" "}
                {eachItem} - {modalItem[eachItem]}{" "}
              </span>{" "}
              <br />
            </>
          );
        })}
      </Modal>
      <Layout>
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
              },
            ]}
          />
        </Layout.Header>
        {/* <Layout.Header className="nav-header"></Layout.Header> */}
      </Layout>
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      /> */}
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            width: 256,
            minWidth: "256px",
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
            style={{
              height: "calc(100vh - 64px)",
            }}
          >
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Menu>
        </div>
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
            { !inputBox ? 
            <div>
              <Card>
                Thank you for loading your statement.
              </Card>
            </div> :
            <Form onFinish={() => {}}>
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
                  <p className="ant-upload-text">
                    Upload your Bank Statement Here
                  </p></Upload.Dragger>
                </Form.Item>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }} shouldUpdate>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled ={files.length == 0} 
                  onClick={handleUpload}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
}
          </Card>
          <Divider style={{ margin: "0px" }}></Divider>
          <div style={{ display: "flex" }} className="dashboardInfoContainer">
            <div style={{ width: "100%" }}>
              <Transactions openingBalance={balanceData.openingBalance} closingBalance={balanceData.closingBalance}/>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                border: "1px solid #dedede",
                borderRadius: "10px",
                maxHeight: "856px",
                overflow: "auto",
              }}
            >
              <Typography.Title
                level={3}
                style={{ padding: "20px 0px 0px 20px" }}
              >
                Recent transactions
              </Typography.Title>

              <List
                dataSource={userState.transaction}
                renderItem={(item) => (
                  <List.Item
                    key={item.transaction_id}
                    className={"listItem"}
                    onClick={() => showModal(item)}
                  >
                    {/* <div>{item.amount}</div> */}
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={"https://randomuser.me/api/portraits/men/35.jpg"}
                        />
                      }
                      title={<span>{item.merchant_name}</span>}
                      description={
                        <>
                          {" "}
                          {item.date?.slice(0, 10)}{" "}
                          <Tag color="#f50">
                            {userState.tags[item.tag_id]?.tag_name}
                          </Tag>
                        </>
                      }
                    />
                    <div>
                      {" "}
                      <span
                        style={{
                          color: item.type === false ? "black" : "green",
                        }}
                      >
                        ₹ {item.amount}
                      </span>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
