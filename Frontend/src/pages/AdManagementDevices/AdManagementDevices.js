import React from "react";
import "./index.scss";
import { Table } from "antd";

const AdManagementDevices = () => {
    const columns1 = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            align: "center",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            align: "center",
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            align: "center",
        },
        {
            title: "MinAction",
            dataIndex: "min_action",
            key: "min_action",
            align: "center",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            align: "center",
        },
        {
            title: "Auto",
            dataIndex: "auto",
            key: "auto",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            align: "center",
        },
    ];
    const columns2 = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            align: "center",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            align: "center",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
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
                <div className="wrapper-content__top">
                    <h4 className="wrapper-content__title">
                        thiết bị cảm biến
                    </h4>
                    <div className="wrapper-content__table">
                        <Table columns={columns1} />
                    </div>
                </div>
                <div className="wrapper-content__bottom">
                    <h4 className="wrapper-content__title">
                        thiết bị điều khiển
                    </h4>
                    <div className="wrapper-content__table">
                        <Table columns={columns2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdManagementDevices;
