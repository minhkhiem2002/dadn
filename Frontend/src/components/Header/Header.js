import React from "react";
import { DownOutlined } from "@ant-design/icons";
import "./style.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Select, Space } from "antd";
export default function Header() {
    const navigate = useNavigate();

    const handleChangeHeader = (value) => {
        console.log(`selected ${value}`);
        if (value === "0") {
            navigate("/");
        }
        if (value === "1") {
            navigate("/information-personal");
        }
        if (value === "2") {
            navigate("/information-personal/change-passwd");
        }
        if (value === "3") {
            navigate("/login");
        }
    };
    return (
        <div className="header">
            <div className="bg">
                <Link className="header-logo" to="/">
                    <span className="iot">IOT</span>
                    <span className="farm">farm</span>
                </Link>

                <div className="items">
                    <Link className="" to="/farms-information">
                        Thông tin trang trại
                    </Link>

                    <Link className="" to="/statistical/*">
                        Thống kê
                    </Link>

                    <Link className="" to="/user-management-devices">
                        Quản lý thiết bị
                    </Link>
                </div>

                <div className="col-xl-auto col-md-auto info">
                    <Link className="" to="/information-personal">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/vi/a/a7/Happier_Than_Ever.jpeg"
                            alt="avatar"
                        />
                    </Link>
                    <Space>
                        <Select
                            defaultValue="0"
                            style={{ width: 100 }}
                            onChange={handleChangeHeader}
                            options={[
                                {
                                    value: "0",
                                    label: (
                                        <NavLink to="/">
                                            <span style={{ color: "black" }}>
                                                Nam
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "1",
                                    label: (
                                        <NavLink to="/information-personal">
                                            <span style={{ color: "black" }}>
                                                Thông tin cá nhân
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "2",
                                    label: (
                                        <NavLink to="/information-personal/change-passwd">
                                            <span style={{ color: "black" }}>
                                                Thay đổi mật khẩu
                                            </span>
                                        </NavLink>
                                    ),
                                },
                                {
                                    value: "3",
                                    label: (
                                        <NavLink to="/login">
                                            <span style={{ color: "black" }}>
                                                Đăng xuất
                                            </span>
                                        </NavLink>
                                    ),
                                },
                            ]}
                        />
                    </Space>
                    {/* <p>Nam</p>
                    <DownOutlined /> */}
                </div>
            </div>
        </div>
    );
}
