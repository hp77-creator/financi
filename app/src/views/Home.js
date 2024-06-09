import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const submitTransactions = async (data) => {
    let response = await fetch(
      HOST + "api/transactions",

      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      alert("Transactions Uploaded");
      window.location.reload();
    } else {
    }
  };
  const uploadFile = async () => {
    console.log(files.originFileObj);
    let formData = new FormData();
    formData.append("file", files.originFileObj);
    console.log(formData.values());

    // let response = await fetch(PDF_HOST + "add-pdf", {
    //   method: "POST",

    //   body: formData,
    // });
    // if (response.ok) {
    //   let data = await response.text();
    //   csv({
    //     noheader: true,
    //     output: "csv",
    //   })
    //     .fromString(data)
    //     .then((csvRow) => {
    //       console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
    //       let keys = csvRow[0];
    //       let tempObj = [];

    //       for (let i = 1; i < csvRow.length; i++) {
    //         tempObj.push({
    //           user_id: userState.user_id,
    //           merchant_name: csvRow[i][2] == 0 ? "google" : csvRow[i][2],
    //           amount:
    //             Number(csvRow[i][4]) == 0
    //               ? Number(csvRow[i][5])
    //               : Number(csvRow[i][4]),
    //           closing_balance:
    //             Number(csvRow[i][6]) == 0 ? 0 : Number(csvRow[i][6]),
    //           tag_id: 1,
    //           type: Number(csvRow[i][4]) == 0 ? true : false,
    //           date: csvRow[i][0].slice(0, 10),
    //           description:
    //             csvRow[i][2] == "" ? "EMPTY_DESCRPTION" : csvRow[i][2],
    //           reference_number: csvRow[i][3] == "" ? "EMPTY" : csvRow[i][3],
    //         });
    //       }

    //       // let TransactionsData = [];
    //       // let ConvertedData = [];
    //       // let len = Object.keys(data.Balance).length;
    //       // console.log(len, data);
    //       // for (let i = 1; i <= len; i++) {
    //       //   TransactionsData.push({
    //       //     "Txn Date": data["Txn Date"][i],
    //       //     "Value Date": data["Value Date"][i],
    //       //     Description: data["Description"][i],
    //       //     "Ref No./Cheque No.": data["Ref No./Cheque No."][i],
    //       //     Debit: data["Debit"][i],
    //       //     Credit: data["Credit"][i],
    //       //     Balance: data["Balance"][i],
    //       //   });

    //       //   ConvertedData.push({
    //       //     user_id: userState.user_id,
    //       //     merchant_name:
    //       //       data["Description"][i] == 0 ? "google" : data["Description"][i],
    //       //     amount:
    //       //       Number(data["Debit"][i]) == 0
    //       //         ? Number(data["Credit"][i])
    //       //         : Number(data["Debit"][i]),
    //       //     closing_balance:
    //       //       Number(data["Balance"][i]) == 0
    //       //         ? 0
    //       //         : Number(data["Balance"][i]),
    //       //     tag_id: 1,
    //       //     type: Number(data["Debit"][i]) == 0 ? true : false,
    //       //     date: "2022-12-12",
    //       //     description:
    //       //       data["Description"][i] == ""
    //       //         ? "EMPTY_DESCRPTION"
    //       //         : data["Description"][i],
    //       //     reference_number:
    //       //       data["Ref No./Cheque No."][i] == ""
    //       //         ? "EMPTY"
    //       //         : data["Ref No./Cheque No."][i],
    //       //   });
    //       // }
    //       submitTransactions(tempObj);
    //       dispatch(addConvertedData(tempObj));
    //       console.log(tempObj);
    //       dispatch(addTransactions(tempObj));
    //     });
    //   console.log(data);
    // } else {
    //   console.log(response);
    // }


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
  const fetchTags = async () => {
    try {
      let res = await fetch(HOST + "api/tags");
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        // setTransactions(data);
        dispatch(addTags(data));
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTransactions = async () => {
    try {
      let res = await fetch(HOST + "api/transactions/" + userState.uid);
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        dispatch(addTransactions(data));
        // setTransactions(data);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTags();
    fetchTransactions();
  }, []);
  let loadTransactions = async () => {
    console.log(userState);
    let Response = await APYHUB_Bar_Request({
      title: "Simple Bar Chart",
      theme: "Light",
      data: [
        {
          value: 10,
          label: "label a",
        },
        {
          value: 20,
          label: "label b",
        },
        {
          value: 80,
          label: "label c",
        },
        {
          value: 50,
          label: "label d",
        },
        {
          value: 70,
          label: "label e",
        },
        {
          value: 25,
          label: "label f",
        },
        {
          value: 60,
          label: "label g",
        },
      ],
    });
    console.log(Response);
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
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }} shouldUpdate>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled ={files.length == 0} 
                  onClick={uploadFile}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Divider style={{ margin: "0px" }}></Divider>
          <div style={{ display: "flex" }} className="dashboardInfoContainer">
            <div style={{ width: "100%" }}>
              <Transactions />
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
