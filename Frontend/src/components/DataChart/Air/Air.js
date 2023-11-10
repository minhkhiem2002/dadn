import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { Button } from "antd";
import { http } from "../../../utils/http";
import * as echarts from "echarts";

export default function Air({ onFirstValueChangeAir }) {
    const chartRef = useRef(null);
    const [airData, setAirData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 7);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "UTC",
        };
        return date.toLocaleDateString("vi-VN", options).replace(",", " ");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.apiV1.get("v2/data");
                const dataWithSequence = response.data.map((item, index) => ({
                    ...item,
                    sequence: index + 1,
                    created_at_formatted: formatDate(item.created_at),
                }));
                setAirData(dataWithSequence);

                const firstValueAir =
                    dataWithSequence.length > 0 ? dataWithSequence[0].value : 0;
                onFirstValueChangeAir(firstValueAir);

                const gaugeOptions = {
                    series: [
                        {
                            type: "gauge",
                            startAngle: 180,
                            endAngle: 0,
                            min: 0,
                            max: 120,
                            splitNumber: 12,
                            itemStyle: {
                                color: "#58D9F9",
                                shadowColor: "rgba(0,138,255,0.45)",
                                shadowBlur: 10,
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                            },
                            progress: {
                                show: true,
                                roundCap: true,
                                width: 18,
                            },
                            pointer: {
                                icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
                                length: "75%",
                                width: 16,
                                offsetCenter: [0, "5%"],
                            },
                            axisLine: {
                                roundCap: true,
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                splitNumber: 2,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                length: 12,
                                lineStyle: {
                                    width: 3,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 15,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                backgroundColor: "#fff",
                                borderColor: "#999",
                                borderWidth: 2,
                                width: "110%",
                                lineHeight: 40,
                                height: 40,
                                borderRadius: 8,
                                offsetCenter: [0, "35%"],
                                valueAnimation: true,
                                formatter: function (value) {
                                    return (
                                        "{value|" +
                                        value.toFixed(1) +
                                        "}{unit|g/m}"
                                    );
                                },
                                rich: {
                                    value: {
                                        fontSize: 40,
                                        fontWeight: "bolder",
                                        color: "#777",
                                    },
                                    unit: {
                                        fontSize: 20,
                                        color: "#999",
                                        padding: [0, 0, -20, 10],
                                    },
                                },
                            },
                            data: [{ value: firstValueAir }],
                        },
                    ],
                };

                const chart = echarts.init(chartRef.current);
                chart.setOption(gaugeOptions);

                return () => {
                    chart.dispose();
                };
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = airData.slice(indexOfFirstItem, indexOfLastItem);

    const maxPage = Math.ceil(airData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= maxPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container-dataAir">
            <div className="dataAir-chart">
                <p>BIỂU ĐỒ DỮ LIỆU CỦA CẢM BIẾN ĐỘ ẨM KHÔNG KHÍ</p>
                <div className="dataAir-chart-detail" ref={chartRef}></div>
            </div>
            <div className="dataAir-table">
                <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA CẢM BIẾN ĐỘ ẨM KHÔNG KHÍ</p>

                <div className="dataAir-table-detail">
                    <div className="dataAir-table-detail-record">
                        <table className="dataAir-table-detail-record-table">
                            <thead className="dataAir-table-detail-record-table-title">
                                <tr className="dataAir-row">
                                    <th
                                        scope="col"
                                        className="dataAir-title-detail"
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope="col"
                                        className="dataAir-title-detail"
                                    >
                                        Mã
                                    </th>
                                    <th
                                        scope="col"
                                        className="dataAir-title-detail"
                                    >
                                        Độ Ẩm
                                    </th>
                                    <th
                                        scope="col"
                                        className="dataAir-title-detail"
                                    >
                                        Thời Gian Cập Nhật
                                    </th>
                                    <th
                                        scope="col"
                                        className="dataAir-title-detail"
                                    >
                                        Thiết Bị
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                style={{
                                    height: "900px",
                                    overflowY: "auto",
                                }}
                            >
                                {currentItems.map((item) => (
                                    <tr key={item.id} className="dataAir-row">
                                        <td className="dataAir-row-detail">
                                            {item.sequence}
                                        </td>
                                        <td className="dataAir-row-detail">
                                            {item.id}
                                        </td>
                                        <td className="dataAir-row-detail">
                                            {item.value}
                                        </td>
                                        <th
                                            scope="row"
                                            className="dataAir-row-detail created-at"
                                        >
                                            {item.created_at_formatted}
                                        </th>
                                        <td className="dataAir-row-detail">
                                            {item.feed_key}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="dataAir-table-detail-page">
                        <nav className="dataAir-table-detail-page-container">
                            <ul className="detail">
                                <li className="a">
                                    <Button
                                        onClick={() =>
                                            paginate(currentPage - 1)
                                        }
                                        type="primary"
                                        className={`${
                                            currentPage === 1
                                                ? "cursor-not-allowed"
                                                : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                                        } rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500`}
                                    >
                                        Trang trước
                                    </Button>
                                </li>
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            airData.length / itemsPerPage
                                        ),
                                    },
                                    (_, index) => (
                                        <li className="a" key={index}>
                                            <Button
                                                onClick={() =>
                                                    paginate(index + 1)
                                                }
                                                className={`${
                                                    currentPage === index + 1
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                                                } border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500`}
                                            >
                                                {index + 1}
                                            </Button>
                                        </li>
                                    )
                                )}
                                <li className="a">
                                    <Button
                                        onClick={() =>
                                            paginate(currentPage + 1)
                                        }
                                        type="primary"
                                        className={`${
                                            currentPage === maxPage
                                                ? "cursor-not-allowed"
                                                : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                                        } rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500`}
                                    >
                                        Trang tiếp theo
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
