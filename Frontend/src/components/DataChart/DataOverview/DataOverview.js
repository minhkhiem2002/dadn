import { useEffect, React, useState } from "react";
import Temperature from "../Temperature";
import Air from "../Air";
import Land from "../Land";
import Light from "../Light";
import "./style.scss";
import { Routes, Route } from "react-router-dom";
import { Table } from "antd";
import { http } from "../../../utils/http";

const initialParameterData = [
  {
    parameter: "Thông số cảm biến ánh sáng hiện tại",
    value: "0 Lux",
  },
  {
    parameter: "Thông số cảm biến độ ẩm đất hiện tại",
    value: "0 (g/m)",
  },
  {
    parameter: "Thông số cảm biến độ ẩm không khí hiện tại",
    value: `0 (g/m)`,
  },
  {
    parameter: "Thông số cảm biến nhiệt độ hiện tại",
    value: `0 C`,
  },
];
export default function DataOverview() {
  const [parameterData, setParameterData] = useState(initialParameterData);
  const [firstValue, setFirstValue] = useState("0");
  const [firstValueAir, setFirstValueAir] = useState("0");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.apiV1.get("v1/data");
        const sensorData = response.data;

        const newFirstValue = sensorData.length > 0 ? sensorData[0].value : "0";

        if (newFirstValue !== firstValue) {
          setFirstValue(newFirstValue);
        }

        const updatedParameterData = [...parameterData];
        updatedParameterData[3].value = `${newFirstValue} C`;

        setParameterData(updatedParameterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [firstValue, parameterData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.apiV2.get("v2/data");
        const sensorData = response.data;

        const newFirstValue = sensorData.length > 0 ? sensorData[0].value : "0";

        if (newFirstValue !== firstValue) {
          setFirstValue(newFirstValue);
        }

        const updatedParameterData = [...parameterData];
        updatedParameterData[2].value = `${newFirstValue} C`;

        setParameterData(updatedParameterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [firstValueAir, parameterData]);

  const columns = [
    {
      title: "Thông số",
      dataIndex: "parameter",
      key: "parameter",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <div className="wrapper-content">
      <div className="current-parameter">
        <Table dataSource={parameterData} columns={columns} />
      </div>

      <Routes>
        <Route path="temperature" element={<Temperature />} />
        <Route path="air" element={<Air />} />
        <Route path="land" element={<Land />} />
        <Route path="light" element={<Light />} />
      </Routes>
    </div>
  );
}
