import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, ConfigProvider,Switch } from "antd";
import { http } from "../../utils/http";
import Message from '../../components/Message';
import "./style.scss";


// data example
const data1 = [
    {
        id: "V1",
        name: "Cảm Biến Nhiệt Độ",
        min: 20,
        max: 35,
        min_action: "OFF",
        max_action: "OFF",
    },
    {
        id: "V4",
        name: "Cảm Biến Ánh Sáng",
        min: 60,
        max: 100,
        min_action: "OFF",
        max_action: "OFF",
    },
    {
        id: "V3",
        name: "Cảm Biến Độ Ẩm Đất",
        min: 30,
        max: 80,
        min_action: "OFF",
        max_action: "OFF",
    },
    {
        id: "V2",
        name: "Cảm Biến Độ Ẩm Không Khí",
        min: 10,
        max: 100,
        min_action: "OFF",
        max_action: "OFF",
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
        // {
        //     title: "Image",
        //     dataIndex: "image",
        //     width: 200,
        //     key: "image",
        //     align: "center",
        // },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 250,
            align: "left",
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
            render: (record) => (
                <Space>
                    <Button type="primary" danger>
                        CHANGE
                    </Button>
                    {record.id === "V1" && (
                        <Button type="primary" onClick={() => navigate("/statistical/temperature")}>
                            COLLECT
                        </Button>
                    )}
                    {record.id === "V4" && (
                        <Button type="primary" onClick={() => navigate("/statistical/light")}>
                            COLLECT
                        </Button>
                    )}
                    {record.id === "V3" && (
                        <Button type="primary" onClick={() => navigate("/statistical/land")}>
                            COLLECT
                        </Button>
                    )}
                    {record.id === "V2" && (
                        <Button type="primary" onClick={() => navigate("/statistical/air")}>
                            COLLECT
                        </Button>
                    )}
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
        // {
        //     title: "Image",
        //     dataIndex: "image",
        //     width: 200,
        //     key: "image",
        //     align: "center",
        //     dataIndex: "ImageURL", // this is the value that is parsed from the DB / server side
        //     render: (theImageURL) => (
        //         <img alt={theImageURL} src={theImageURL} />
        //     ),
        // },
        {
            title: "Name",
            dataIndex: "name",
            width: 250,
            key: "name",
            align: "left",
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
                    <Space direction="horizontal">
                        {/* <Button>CHANGE</Button> */}
                        {record.id === "V10" ? (
                            <Switch
                                checkedChildren="Bật"
                                unCheckedChildren="Tắt"
                                checked={pumpState === 1}
                                onChange={() => togglePump(record)}
                            />
                        ) : record.id === "V11" ? (
                            <Switch
                                checkedChildren="Bật"
                                unCheckedChildren="Tắt"
                                checked={ledState === 1}
                                onChange={() => toggleLed(record)}
                            />
                        ) : null}
                    </Space>
                </ConfigProvider>
            ),
        },
    ];
    const navigate = useNavigate();
    const [pumpState, setPumpState] = useState(0);
    const [ledState, setLedState] = useState(0);

    const togglePump = (record) => {
        setPumpState(record.id === "V10" ? 1 - pumpState : pumpState === 1 ? 0 : 1);
        sendPumpStateToServer(record.id === "V10" ? 1 - pumpState : pumpState === 1 ? 0 : 1);
    };
    
    const toggleLed = (record) => {
        setLedState(record.id === "V11" ? 1 - ledState : ledState === 1 ? 0 : 1);
        sendLedStateToServer(record.id === "V11" ? 1 - ledState : ledState === 1 ? 0 : 1);
    };
    
    const sendPumpStateToServer = (value) => {
        http.apiV10
            .post("", { value })
            .then((response) => {
                Message.sendSuccess("MÁY BƠM ĐÃ ĐƯỢC " + (value === 1 ? "BẬT" : "TẮT"));
            })
            .catch((error) => {
                Message.sendError("Failed to update pump state");
                console.error(error);
            });
    };
    
    const sendLedStateToServer = (value) => {
        http.apiV11
            .post("", { value })
            .then((response) => {
                Message.sendSuccess("ĐÈN LED ĐÃ ĐƯỢC " + (value === 1 ? "BẬT" : "TẮT"));
            })
            .catch((error) => {
                Message.sendError("Failed to update LED state");
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
