import { React, useState } from "react";
import "./style.scss";
import { RightCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Temperature from "../../components/DataChart/Temperature";
import Air from "../../components/DataChart/Air";
import Land from "../../components/DataChart/Land";
import Light from "../../components/DataChart/Light";
import DataOverview from "../../components/DataChart/DataOverview";
const { TabPane } = Tabs;

export default function StatisticalPage() {
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "0") {
      navigate("/statistical/*");
    }
    if (value === "1") {
      navigate("/statistical/temperature");
    }
    if (value === "2") {
      navigate("/statistical/land");
    }
    if (value === "3") {
      navigate("/statistical/air");
    }
    if (value === "4") {
      navigate("/statistical/light");
    }
  };
  return (
    <div className="container-StatisticalPage">
      <div className="wrapper-content">
        <div className="current-chart">
          <Tabs
            defaultActiveKey="0"
            onChange={handleChange}
            tabBarStyle={{
              background: "#f0f0f0",
              padding: "13px",
              backgroundColor: "white",
            }}
          >
            <TabPane tab="DỮ LIỆU CẢM BIẾN HIỆN TẠI" key="0">
              {/* Nội dung cho tab này */}
            </TabPane>
            <TabPane tab="NHIỆT ĐỘ" key="1">
              {/* Nội dung cho tab này */}
            </TabPane>
            <TabPane tab="ĐỘ ẨM ĐẤT" key="2">
              {/* Nội dung cho tab này */}
            </TabPane>
            <TabPane tab="ĐỘ ẨM KHÔNG KHÍ" key="3">
              {/* Nội dung cho tab này */}
            </TabPane>
            <TabPane tab="ÁNH SÁNG" key="4">
              {/* Nội dung cho tab này */}
            </TabPane>
          </Tabs>
        </div>
        <Routes>
          <Route path="temperature" element={<Temperature />} />
          <Route path="air" element={<Air />} />
          <Route path="land" element={<Land />} />
          <Route path="light" element={<Light />} />
          <Route path="*" element={<DataOverview />} />
        </Routes>
      </div>
    </div>
  );
}
