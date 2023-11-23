import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { Button } from "antd";
import { http } from "../../../utils/http";
import * as echarts from "echarts";

export default function Temperature({ onFirstValueChange }) {
  const chartRef = useRef(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  //convert date
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
        const response = await http.apiV1.get("v1/data");
        const dataWithSequence = response.data.map((item, index) => ({
          ...item,
          sequence: index + 1,
          created_at_formatted: formatDate(item.created_at),
        }));
        setTemperatureData(dataWithSequence);

        const firstValue =
          dataWithSequence.length > 0 ? dataWithSequence[0].value : 0;
        onFirstValueChange(firstValue);

        //chart
        const gaugeOptions = {
          series: [
            {
              type: "gauge",
              center: ["50%", "60%"],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 60,
              splitNumber: 12,
              itemStyle: {
                color: "#FFAB91",
              },
              progress: {
                show: true,
                width: 30,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 30,
                },
              },
              axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: "#999",
                },
              },
              splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: "#999",
                },
              },
              axisLabel: {
                distance: -10,
                color: "#999",
                fontSize: 15,
              },
              anchor: {
                show: false,
              },
              title: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                width: "60%",
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, "-15%"],
                fontSize: 60,
                fontWeight: "bolder",
                formatter: "{value}",
                color: "inherit",
              },
              data: [{ value: firstValue }],
            },
            {
              type: "gauge",
              center: ["50%", "60%"],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 60,
              itemStyle: {
                color: "#FD7347",
              },
              progress: {
                show: true,
                width: 8,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: firstValue,
                  name: "Nhiệt độ hiện tại",
                },
              ],
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

    //fetchdata
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = temperatureData.slice(indexOfFirstItem, indexOfLastItem);

  //button next and previous
  const maxPage = Math.ceil(temperatureData.length / itemsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container-dataTemp">
      <div className="dataTemp-chart">
        <p>BIỂU ĐỒ DỮ LIỆU CỦA CẢM BIẾN NHIỆT ĐỘ</p>
        <div className="dataTemp-chart-detail" ref={chartRef}></div>
      </div>
      <div className="dataTemp-table">
        <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA CẢM BIẾN NHIỆT ĐỘ</p>

        <div className="dataTemp-table-detail">
          <div className="dataTemp-table-detail-record">
            <table className="dataTemp-table-detail-record-table">
              <thead className="dataTemp-table-detail-record-table-title">
                <tr className="dataTemp-row">
                  <th scope="col" className="dataTemp-title-detail">
                    STT
                  </th>
                  <th scope="col" className="dataTemp-title-detail">
                    Mã
                  </th>
                  <th scope="col" className="dataTemp-title-detail">
                    Nhiệt Độ
                  </th>
                  <th scope="col" className="dataTemp-title-detail">
                    Thời Gian Cập Nhật
                  </th>
                  <th scope="col" className="dataTemp-title-detail">
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
                  <tr key={item.id} className="dataTemp-row">
                    <td className="dataTemp-row-detail">{item.sequence}</td>
                    <td className="dataTemp-row-detail">{item.id}</td>
                    <td className="dataTemp-row-detail">{item.value}</td>
                    <th scope="row" className="dataTemp-row-detail created-at">
                      {item.created_at_formatted}
                    </th>
                    <td className="dataTemp-row-detail">{item.feed_key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dataTemp-table-detail-page">
            <nav className="dataTemp-table-detail-page-container">
              <ul className="detail">
                <li className="a">
                  <Button
                    onClick={() => paginate(currentPage - 1)}
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
                    length: Math.ceil(temperatureData.length / itemsPerPage),
                  },
                  (_, index) => (
                    <li className="a" key={index}>
                      <Button
                        onClick={() => paginate(index + 1)}
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
                    onClick={() => paginate(currentPage + 1)}
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
