import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import "./style.scss";

export default function CreateFarmForm({ onCreateFarm, editData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        address: editData.address,
        image: editData.image,
        description: editData.description,
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      let response;

      if (editData) {
        response = await axios.put(
          `http://localhost:3001/api/admin/updateFarm/${editData._id}`,
          values,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3001/api/admin/createFarm",
          values,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      }

      // console.log(response.data);
      onCreateFarm(response.data);
      form.resetFields();
    } catch (error) {
      // console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCreateFarm(null);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Tên Nông Trại" name="name" rules={[{ required: true }]}>
        <Input placeholder="Nhập tên nông trại" />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <Form.Item label="Ảnh" name="image" rules={[{ required: true }]}>
        <Input placeholder="Nhập link ảnh" />
      </Form.Item>
      <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
        <Input placeholder="Nhập mô tả" />
      </Form.Item>
      <div className="centered-button">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editData ? "Cập nhật" : "Thêm"}
          </Button>{" "}
          <Button danger onClick={handleCancel}>
            Huỷ
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
