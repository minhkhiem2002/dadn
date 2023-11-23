import { React, useState } from "react";
import "./style.scss";
import { RightCircleOutlined } from "@ant-design/icons";
import { Select, Space, Button, Table } from "antd";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Temperature from "../../components/DataChart/Temperature";
import Air from "../../components/DataChart/Air";
import Land from "../../components/DataChart/Land";
import Light from "../../components/DataChart/Light";

export default function StatisticalPage() {
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "0") {
      navigate("/statistical");
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
  const [firstValue, setFirstValue] = useState(0);
  const [firstValueAir, setFirstValueAir] = useState(0);

  const handleFirstValueChange = (value) => {
    setFirstValue(value);
  };
  const handleFirstValueChangeAir = (valueAir) => {
    setFirstValueAir(valueAir);
  };
  const parameterData = [
    {
      parameter: "Thông số cảm biến ánh sáng hiện tại",
      value: "63 Lux",
    },
    {
      parameter: "Thông số cảm biến độ ẩm đất hiện tại",
      value: "0 (g/m)",
    },
    {
      parameter: "Thông số cảm biến độ ẩm không khí hiện tại",
      value: `${firstValueAir} (g/m)`,
    },
    {
      parameter: "Thông số cảm biến nhiệt độ hiện tại",
      value: `${firstValue} C`,
    },
  ];

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
    <div className="container-StatisticalPage">
      <div className="wrapper-content">
        <div className="current-parameter">
          <p>THÔNG SỐ HIỆN TẠI CỦA CÁC CẢM BIẾN</p>
          <Table dataSource={parameterData} columns={columns} />
        </div>

        <div className="current-chart">
          <Space>
            <Select
              defaultValue="0"
              style={{ width: 400 }}
              onChange={handleChange}
              options={[
                {
                  value: "0",
                  label: (
                    <NavLink to="/statistical">
                      <span style={{ color: "black" }}>
                        CHỌN DỮ LIỆU CẢM BIẾN
                      </span>
                    </NavLink>
                  ),
                },
                {
                  value: "1",
                  label: (
                    <NavLink to="/statistical/temperature">
                      <span style={{ color: "black" }}>NHIỆT ĐỘ</span>
                    </NavLink>
                  ),
                },
                {
                  value: "2",
                  label: (
                    <NavLink to="/statistical/land">
                      <span style={{ color: "black" }}>ĐỘ ẨM ĐẤT</span>
                    </NavLink>
                  ),
                },
                {
                  value: "3",
                  label: (
                    <NavLink to="/statistical/air">
                      <span style={{ color: "black" }}>ĐỘ ẨM KHÔNG KHÍ</span>
                    </NavLink>
                  ),
                },
                {
                  value: "4",
                  label: (
                    <NavLink to="/statistical/light">
                      <span style={{ color: "black" }}>ÁNH SÁNG</span>
                    </NavLink>
                  ),
                },
              ]}
            />

            {/* <Button>Lọc dữ liệu</Button> */}
            {/* <Button type="primary">Tải xuống</Button> */}
          </Space>
        </div>
        <Routes>
          <Route
            path="temperature"
            element={
              <Temperature onFirstValueChange={handleFirstValueChange} />
            }
          />
          <Route
            path="air"
            element={<Air onFirstValueChangeAir={handleFirstValueChangeAir} />}
          />
          <Route path="land" element={<Land />} />
          <Route path="light" element={<Light />} />
        </Routes>
      </div>
    </div>
  );
}
