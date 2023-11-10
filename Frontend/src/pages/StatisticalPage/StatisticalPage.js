import { React, useState } from "react";
import "./style.scss";
import { RightCircleOutlined } from "@ant-design/icons";
import { Select, Space, Button } from "antd";
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
    return (
        <div className="container-StatisticalPage">
            <div className="wrapper-content">
                <div className="current-parameter">
                    <p>THÔNG SỐ HIỆN TẠI CỦA CÁC CẢM BIẾN</p>
                    <div className="current-parameter-views">
                        <div className="parameter-views-detail">
                            <RightCircleOutlined />
                            <p>
                                Thông số cảm biến ánh sáng hiện tại:{" "}
                                <span>63</span>
                                Lux
                            </p>
                        </div>
                        <div className="parameter-views-detail">
                            <RightCircleOutlined />
                            <p>
                                Thông số cảm biến độ ẩm đất hiện tại:
                                <span> 0 </span>(g/m)
                            </p>
                        </div>
                        <div className="parameter-views-detail">
                            <RightCircleOutlined />
                            <p>
                                Thông số cảm biến độ ẩm không khí hiện tại:
                                <span> {firstValueAir} </span>(g/m)
                            </p>
                        </div>
                        <div className="parameter-views-detail">
                            <RightCircleOutlined />
                            <p>
                                Thông số cảm biến nhiệt độ hiện tại:
                                <span> {firstValue} </span>C
                            </p>
                        </div>
                    </div>
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
                                                Chọn dữ liệu cảm biến
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "1",
                                    label: (
                                        <NavLink to="/statistical/temperature">
                                            <span style={{ color: "black" }}>
                                                Dữ liệu cảm biến nhiệt độ
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "2",
                                    label: (
                                        <NavLink to="/statistical/land">
                                            <span style={{ color: "black" }}>
                                                Dữ liệu cảm biến độ ẩm đất
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "3",
                                    label: (
                                        <NavLink to="/statistical/air">
                                            <span style={{ color: "black" }}>
                                                Dữ liệu cảm biến độ ẩm không khí
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "4",
                                    label: (
                                        <NavLink to="/statistical/light">
                                            <span style={{ color: "black" }}>
                                                Dữ liệu cảm biến ánh sáng
                                            </span>
                                        </NavLink>
                                    ),
                                },
                            ]}
                        />

                        <Button>Lọc dữ liệu</Button>
                        <Button type="primary">Tải xuống</Button>
                    </Space>
                </div>
                <Routes>
                    <Route
                        path="temperature"
                        element={
                            <Temperature
                                onFirstValueChange={handleFirstValueChange}
                            />
                        }
                    />
                    <Route
                        path="air"
                        element={
                            <Air
                                onFirstValueChangeAir={
                                    handleFirstValueChangeAir
                                }
                            />
                        }
                    />
                    <Route path="land" element={<Land />} />
                    <Route path="light" element={<Light />} />
                </Routes>
            </div>
        </div>
    );
}
