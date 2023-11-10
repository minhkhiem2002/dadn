import React from "react";
import "./style.scss";
export default function Light() {
    return (
        <div className="container-dataLight">
            <div className="dataLight-chart">
                <p>BIỂU ĐỒ DỮ LIỆU CỦA CẢM BIẾN ÁNH SÁNG</p>
                <div className="dataLight-chart-detail"></div>
            </div>
            <div className="dataLight-table">
                <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA CẢM BIẾN ÁNH SÁNG</p>
                <div className="dataLight-table-detail"></div>
            </div>
            <br />
            <br />
        </div>
    );
}
