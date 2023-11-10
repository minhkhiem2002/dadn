import React from "react";
import "./index.scss";
import { Table } from "antd";

const AdManagementUsers = () => {
    const columns = [
        {
            title: "STT",
            align: "center",
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dob",
            key: "dob",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "SĐT",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            align: "center",
        },
    ];
    return (
        <div className="wrapper">
            <div className="wrapper-content">
                <h4 className="wrapper-content__title">Quản lý người dùng</h4>
                <div className="wrapper-content__table">
                    <Table columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default AdManagementUsers;
