import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Table, Button } from "antd";
import CreateFarmForm from "./CreateFarmForm";
import { PlusOutlined } from "@ant-design/icons";

export default function AdManagementFarm() {
  const [farms, setFarms] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [expandedFarmInfo, setExpandedFarmInfo] = useState(null);

  useEffect(() => {
    getFarms();
  }, []);

  const getFarms = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "http://localhost:3001/api/admin/getAllFarm",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setFarms(result.data.data);
      // console.log(result.data.data);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const handleEdit = (farmId) => {
    // console.log(`Sửa farm có ID: ${farmId}`);
    const farmToEdit = farms.find((farm) => farm._id === farmId);
    setEditData(farmToEdit);
    setShowCreateForm(true);
  };

  const handleDelete = async (farmId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3001/api/admin/deleteFarm/${farmId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      getFarms();
      console.log(`Farm có ID: ${farmId} đã được xoá`);
    } catch (error) {
      console.error("Lỗi khi xoá farm:", error);
    }
  };

  const handleCreateFarm = () => {
    setEditData(null);
    setShowCreateForm(true);
  };

  const handleExpandRow = async (farmId) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://localhost:3001/api/admin/getFarm/${farmId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setExpandedFarmInfo(result.data);
    } catch (error) {
      // console.error("Lỗi", error);
    }
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text) => <img src={text} alt="Farm" style={{ width: "50px" }} />,
    },
    {
      title: "Tên nông trại",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <h4 className="wrapper-content__title">Quản lý nông trại</h4>

        <div className="wrapper-content__table">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (result) => (
                <div>
                  <img src={result.image} alt="" />
                  <p>ID: {result?._id}</p>
                  <p>Tên: {result.name}</p>
                  <p>Địa chỉ: {result.address}</p>
                  <p>Mô tả: {result.description}</p>
                  <p>Ngày tạo: {result.createdAt}</p>
                  <p>Ngày cập nhật: {result.updatedAt}</p>
                  <p>{result.__v}</p>
                </div>
              ),
              rowExpandable: (result) => result._id === result?._id,
              onExpand: (_, result) => handleExpandRow(result._id),
            }}
            dataSource={farms}
          />
        </div>

        <div className="wrapper-content__createfarm centered-button">
          {!showCreateForm ? (
            <Button type="primary" onClick={handleCreateFarm}>
              THÊM NÔNG TRẠI MỚI
            </Button>
          ) : (
            <CreateFarmForm
              onCreateFarm={() => {
                setShowCreateForm(false);
                getFarms();
              }}
              editData={editData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
