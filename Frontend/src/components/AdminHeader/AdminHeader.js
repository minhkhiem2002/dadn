import React from "react";
import "./index.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <div className="wrapper-header">
            <Link className="wrapper-header--logo" to="/">
                <span className="wrapper-header--iot">IOT</span>
                <span className="wrapper-header--farm">farm</span>
            </Link>
            <div className="wrapper-header__right">
                <div className="wrapper-header__right--navigate">
                    <Link className="wrapper-header__right--farms" to="/admin-management-farms">
                        Quản lý nông trại
                    </Link>
                    <Link className="wrapper-header__right--users" to="/admin-management-users">
                        Quản lý người dùng
                    </Link>
                </div>
                <div className="wrapper-header__right--dropdown">
                    <Link className="wrapper-header__right--avatar">
                        <img
                            src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
                            alt=""
                            className="wrapper-header__right--image"
                        />
                        <span>Admin</span>
                    </Link>
                    <span>
                        <CaretDownOutlined />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
