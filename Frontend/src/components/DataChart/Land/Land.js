import React from "react";
import "./style.scss";
export default function Land() {
    return (
        <div className="container-dataLand">
            <div className="dataLand-chart">
                <p>BIỂU ĐỒ DỮ LIỆU CỦA ĐỘ ẨM ĐẤT</p>
                <div className="dataLand-chart-detail"></div>
            </div>
            <div className="dataLand-table">
                <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA ĐỘ ẨM ĐẤT</p>
                <div className="dataLand-table-detail"></div>
            </div>
            <br />
            <br />
        </div>
    );
}