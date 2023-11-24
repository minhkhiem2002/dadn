import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import "./index.scss";

export default function CreateControlEquipmentForm({ onUpdateControlEquipment, editData ,farmID}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        key: editData.key,
        typ: editData.typ,
        farmId: editData.farmId,
        status: editData.status,
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      let response;

      if (editData) {
        response = await axios.put(
          `http://localhost:3001/api/cequip/update-equipment/${editData._id}`,
          values,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:3001/api/cequip/post/${farmID}`,
          values,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      }

      // console.log(response.data);
      onUpdateControlEquipment(response.data);
      form.resetFields();
    } catch (error) {
      // console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onUpdateControlEquipment(null);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Input name ..." />
      </Form.Item>
      <Form.Item label="Key" name="key" rules={[{ required: true }]}>
        <Input placeholder="Input key ..." />
      </Form.Item>
      <Form.Item label="Typ" name="typ" rules={[{ required: true }]}>
        <Input placeholder="Input typ ..." />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input placeholder="Input status ..." />
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
