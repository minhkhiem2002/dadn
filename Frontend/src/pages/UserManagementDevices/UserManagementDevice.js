import React, { useState } from "react";

import { Table, Button, Space, ConfigProvider } from "antd";
import { http } from "../../utils/http";
import "./style.scss";

// data example
const data1 = [
    {
        id: "V1",
        name: "Cảm Biến Nhiệt Độ",
        min: 20,
        max: 35,
        min_action: "V10",
        max_action: "V11",
    },
];
const data2 = [
    {
        id: "V10",
        name: "Máy Bơm Nước",
    },
    {
        id: "V11",
        image: "../../assets/images/",
        name: "Đèn LED",
    },
];

export default function UserManagementDevice() {
    const columns1 = [
        {
            title: "ID",
            dataIndex: "id",
            width: 120,
            key: "id",
            align: "center",
        },
        {
            title: "Image",
            dataIndex: "image",
            width: 200,
            key: "image",
            align: "center",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 250,
            align: "center",
        },
        {
            title: "Min",
            dataIndex: "min",
            width: 80,
            key: "min",
            align: "center",
        },
        {
            title: "Max",
            dataIndex: "max",
            width: 80,
            key: "max",
            align: "center",
        },
        {
            title: "MinAction",
            dataIndex: "min_action",
            width: 80,
            key: "min_action",
            align: "center",
        },
        {
            title: "MaxAction",
            dataIndex: "max_action",
            width: 80,
            key: "max_action",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            width: 300,
            align: "center",
            render: () => (
                <Space>
                    <Button type="primary" danger>
                        CHANGE
                    </Button>
                    <Button type="primary">COLLECT</Button>
                </Space>
            ),
        },
    ];

    const columns2 = [
        {
            title: "ID",
            dataIndex: "id",
            width: 120,
            key: "id",
            align: "center",
        },
        {
            title: "Image",
            dataIndex: "image",
            width: 200,
            key: "image",
            align: "center",
            dataIndex: "ImageURL", // this is the value that is parsed from the DB / server side
            render: (theImageURL) => (
                <img alt={theImageURL} src={theImageURL} />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 250,
            key: "name",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            width: 680,
            align: "center",
            render: (record) => (
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#E0B415",
                            colorBgContainer: "#ffffff",
                        },
                    }}
                >
                    <Space>
                        <Button>CHANGE</Button>
                        {record.id === "V10" ? (
                            <Button
                                type="primary"
                                onClick={() => togglePump(record)}
                            >
                                {pumpState === 1 ? "OFF" : "ON"}
                            </Button>
                        ) : record.id === "V11" ? (
                            <Button
                                type="primary"
                                onClick={() => toggleLed(record)}
                            >
                                {ledState === 1 ? "OFF" : "ON"}
                            </Button>
                        ) : null}
                    </Space>
                </ConfigProvider>
            ),
        },
    ];

    const [pumpState, setPumpState] = useState(0);
    const [ledState, setLedState] = useState(0);

    const togglePump = (record) => {
        setPumpState(record.id === "V10" ? 1 - pumpState : pumpState);
        sendPumpStateToServer();
    };

    const toggleLed = (record) => {
        setLedState(record.id === "V11" ? 1 - ledState : ledState);
        sendLedStateToServer();
    };

    const sendPumpStateToServer = () => {
        http.apiV10
            .post("", { value: pumpState })
            .then((response) => {
                alert("PUMP IS NOW " + (pumpState === 1 ? "ON" : "OFF"));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const sendLedStateToServer = () => {
        http.apiV11
            .post("", { value: ledState })
            .then((response) => {
                alert("LED IS NOW " + (ledState === 1 ? "ON" : "OFF"));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="wrapper1">
            <div className="wrapper-content">
                <div className="wrapper-content__top">
                    <h4 className="wrapper-content__title">
                        THIẾT BỊ CẢM BIẾN
                    </h4>
                    <div className="wrapper-content__table">
                        <Table columns={columns1} dataSource={data1} />
                    </div>
                </div>
                <div className="wrapper-content__bottom">
                    <h4 className="wrapper-content__title">
                        THIẾT BỊ ĐIỀU KHIỂN
                    </h4>
                    <div className="wrapper-content__table">
                        <Table columns={columns2} dataSource={data2} />
                    </div>
                </div>
            </div>
        </div>
    );
}
