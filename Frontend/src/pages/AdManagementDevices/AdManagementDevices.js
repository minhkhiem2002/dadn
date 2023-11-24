import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Table, Button } from "antd";
import { useParams } from 'react-router-dom';
import CreateDataEquipmentForm from "./CreateDataEquipmentForm";
import CreateControlEquipmentForm from "./CreateControlEquipmentForm";


export default function AdManagementDevice() {

    const { farmID } = useParams();
    const [dataEquipments, setDataEquipments] = useState([]);
    const [controlEquipments, setControlEquipments] = useState([]);

    const [showCreateDataEquipmentForm, setShowCreateDataEquipmentForm] = useState(false);
    const [showCreateControlEquipmentForm, setShowCreateControlEquipmentForm] = useState(false);

    const [editData, setEditData] = useState(null);
    const [editData1, setEditData1] = useState(null);

    const [expandedDataEquipmentInfo, setExpandedDataEquipmentInfo] = useState(null);
    const [expandedControlEquipmentInfo, setExpandedControlEquipmentInfo] = useState(null);
    useEffect(() => {
      console.log("aaaaaaaaaaaaaaaaa");
      getDataEquipments();
      getControlEquipments();
    }, []);
  
    const getDataEquipments = async () => {
      try {
        const token = localStorage.getItem("token");
        var result;
        if(farmID){result = await axios.get(
          `http://localhost:3001/api/dequip/getAll/${farmID}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );}
        else{result = await axios.get(
          "http://localhost:3001/api/dequip/getAll",
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );

        }
        setDataEquipments(result.data.data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };
    const handleEdit = (dataEquipmentId) => {
      // console.log(`Sửa farm có ID: ${farmId}`);
      const dataEquipmentToEdit = dataEquipments.find((dataEquipment) => dataEquipment._id === dataEquipmentId);
      setEditData(dataEquipmentToEdit);
      setShowCreateDataEquipmentForm(true);
    };
    
    const handleCreateDataEquipment = () => {
      setEditData(null);
      setShowCreateDataEquipmentForm(true);
    };
    const handleCreateControlEquipment = () => {
      setEditData1(null);
      setShowCreateControlEquipmentForm(true);
    };
    const handleDelete = async (dataEquipmentId) => {
      try {
        const token = localStorage.getItem("token");
  
        await axios.delete(
          `http://localhost:3001/api/dequip/delete-equipment/${dataEquipmentId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        getDataEquipments();
        console.log(`DataEquipment có ID: ${dataEquipmentId} đã được xoá`);
      } catch (error) {
        console.error("Lỗi khi xoá dataEquipment:", error);
      }
    };
  
    const handleExpandRow = async (dataEquipmentId) => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `http://localhost:3001/api/dequip/getDetail/${dataEquipmentId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        setExpandedDataEquipmentInfo(result.data);
      } catch (error) {
        // console.error("Lỗi", error);
      }
    };

    const getControlEquipments = async () => {
      try {
        const token = localStorage.getItem("token");
        var result;
        if(farmID){result = await axios.get(
          `http://localhost:3001/api/cequip/getAll/${farmID}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );}
        else{result = await axios.get(
          "http://localhost:3001/api/cequip/getAll",
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        }
        setControlEquipments(result.data.data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };
    const handleEdit1 = (controlEquipmentId) => {
      // console.log(`Sửa farm có ID: ${farmId}`);
      const controlEquipmentToEdit = controlEquipments.find((controlEquipment) => controlEquipment._id === controlEquipmentId);
      setEditData1(controlEquipmentToEdit);
      setShowCreateControlEquipmentForm(true);
    };
  

    const handleDelete1 = async (controlEquipmentId) => {
      try {
        const token = localStorage.getItem("token");
  
        await axios.delete(
          `http://localhost:3001/api/cequip/delete-equipment/${controlEquipmentId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        getControlEquipments();
        console.log(`ControlEquipment có ID: ${controlEquipmentId} đã được xoá`);
      } catch (error) {
        console.error("Lỗi khi xoá controlEquipment:", error);
      }
    };
  

  
    const handleExpandRow1 = async (controlEquipmentId) => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `http://localhost:3001/api/cequip/getDetail/${controlEquipmentId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        setExpandedControlEquipmentInfo(result.data);
      } catch (error) {
        // console.error("Lỗi", error);
      }
    };
    const column1 = [
        {
            title: "STT",
            align: "center",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "left",
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            align: "center",
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            align: "center",
        },
        {
            title: "MinAction",
            dataIndex: "min_action",
            key: "min_action",
            align: "center",
        },
        {
            title: "MaxAction",
            dataIndex: "max_action",
            key: "max_action",
            align: "center",
        },

        {
            title: "Auto",
            dataIndex: "auto",
            key: "auto",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (_, record) => (
              <div>
                <Button type="primary" danger onClick={() => handleEdit(record._id)}>
                  Chỉnh sửa
                </Button>{" "}
                <Button onClick={() => handleDelete(record._id)}>Xoá</Button>
              </div>
            ),
        },
    ];
    const column2 = [
      {
          title: "STT",
          align: "center",
          render: (_, record, index) => index + 1,
      },
      {
          title: "Name",
          dataIndex: "name",
          key: "name",
          align: "left",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "name",
        align: "center",
      },
      {
          title: "Action",
          key: "action",
          align: "center",
          render: (_, record) => (
            <div>
              <Button type="primary" danger onClick={() => handleEdit1(record._id)}>
                Chỉnh sửa
              </Button>{" "}
              <Button onClick={() => handleDelete1(record._id)}>Xoá</Button>
            </div>
          ),
      },
  ];
  
    return (
      <div className="wrapper">
        <div className="wrapper-content">
          <h4 className="wrapper-content__title">THIẾT BỊ CẢM BIẾN</h4>
  
          <div className="wrapper-content__table">
            <Table
              columns={column1}
              expandable={{
                expandedRowRender: (result) => (
                  <div>
                    <img src={result.image} alt="" />
                    <p>ID: {result?._id}</p>
                    <p>Key: {result?.key}</p>
                    <p>Name: {result?.name}</p>
                    <p>Farm ID: {result?.farmId}</p>
                    <p>Min: {result?.min}</p>
                    <p>Max: {result?.max}</p>
                    <p>Min_Action: {result?.min_action}</p>
                    <p>Max_Action: {result?.max_action}</p>
                    <p>Type: {result?.typ}</p>
                    <p>Auto: {result?.auto}</p>
                    <p>createdAt: {result?.createdAt}</p>
                    <p>updatedAt: {result?.updatedAt}</p>
                    <p>{result.__v}</p>
                  </div>
                ),
                rowExpandable: (result) => result._id === result?._id,
                onExpand: (_, result) => handleExpandRow(result._id),
              }}
              dataSource={dataEquipments}
            />
          </div>
          <div className="wrapper-content__createfarm centered-button">

            {(farmID === null || farmID === undefined) && (showCreateDataEquipmentForm  &&
              (
              <CreateDataEquipmentForm
                onUpdateDataEquipment={() => {
                  setShowCreateDataEquipmentForm(false);
                  getDataEquipments();
                }}
                editData={editData}
                farmID={farmID}
              />)
            )}
            {(farmID) && (!showCreateDataEquipmentForm ? (
            <Button type="primary" onClick={handleCreateDataEquipment}>
              THÊM THIẾT BỊ CẢM BIẾN
            </Button>
          ) : (
            <CreateDataEquipmentForm
            onUpdateDataEquipment={() => {
              setShowCreateDataEquipmentForm(false);
              getDataEquipments();
              }}
              editData={editData}
              farmID={farmID}
            />
          )
            )}
          </div>
          <h4 className="wrapper-content__title">THIẾT BỊ ĐIỀU KHIỂN</h4>
          <div className="wrapper-content__table">
            <Table
              columns={column2}
              expandable={{
                expandedRowRender: (result) => (
                  <div>
                    <img src={result.image} alt="" />
                    <p>ID: {result?._id}</p>
                    <p>Key: {result?.key}</p>
                    <p>Name: {result?.name}</p>
                    <p>Farm ID: {result?.farmId}</p>
                    <p>Type: {result?.typ}</p>
                    <p>Status: {result?.status}</p>
                    <p>createdAt: {result?.createdAt}</p>
                    <p>updatedAt: {result?.updatedAt}</p>
                    <p>{result.__v}</p>
                  </div>
                ),
                rowExpandable: (result) => result._id === result?._id,
                onExpand: (_, result) => handleExpandRow1(result._id),
              }}
              dataSource={controlEquipments}
            />
          </div>
          <div className="wrapper-content__createfarm centered-button">
          {(farmID === null || farmID === undefined) && (showCreateControlEquipmentForm  &&
              (
              <CreateControlEquipmentForm
                onUpdateControlEquipment={() => {
                  setShowCreateControlEquipmentForm(false);
                  getControlEquipments();
                }}
                editData={editData1}
                farmID={farmID}
              />)
            )}
            {(farmID) && (!showCreateControlEquipmentForm ? (
            <Button type="primary" onClick={handleCreateControlEquipment}>
              THÊM THIẾT BỊ ĐIỀU KHIỂN
            </Button>
          ) : (
            <CreateControlEquipmentForm
            onUpdateControlEquipment={() => {
              setShowCreateControlEquipmentForm(false);
              getControlEquipments();
              }}
              editData={editData1}
              farmID={farmID}
            />
          )
            )}
          </div>
        </div>
      </div>
    );
    
  }
