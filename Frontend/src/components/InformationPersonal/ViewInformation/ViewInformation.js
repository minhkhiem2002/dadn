import React from "react";
import "./style.scss";
import { HomeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
export default function ViewInformation() {
    return (
        <div className="container-viewinformation">
            <div className="viewinformation-bg-img"></div>
            <div className="viewinformation-common">
                <div className="viewinformation-left-section-common ">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/vi/a/a7/Happier_Than_Ever.jpeg"
                        alt="avatar"
                    />
                </div>
                <div className="viewinformation-right-section-common ">
                    <div>
                        <div>
                            <h1> Nam</h1>
                            <HomeOutlined />
                            <span> nam.nguyen@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="viewinformation-bg-null"></div>
            <div className="viewinformation-detail">
                <div className="viewinformation-detail-name">
                    <p>Họ và tên</p>
                    <Input
                        placeholder="Họ và tên"
                        value="Nguyễn Văn Nam"
                        readOnly
                    />
                </div>
                <div className="viewinformation-detail-date">
                    <p>Ngày sinh</p>
                    <Input
                        placeholder="Ngày sinh"
                        value="12/12/1971"
                        readOnly
                    />
                </div>
                <div className="viewinformation-detail-address">
                    <p>Địa chỉ</p>
                    <Input
                        placeholder="Địa chỉ"
                        value="Thành Phố Thủ Đức, TP.HCM "
                        readOnly
                    />
                </div>
                <div className="viewinformation-detail-address">
                    <p>Số điện thoại</p>
                    <Input
                        placeholder="Số điện thoại"
                        value="0945287337"
                        readOnly
                    />
                </div>
                <div className="viewinformation-detail-address">
                    <p>Địa chỉ Email</p>
                    <Input
                        placeholder="Địa chỉ Email"
                        value="nam.nguyen@gmail.com"
                        readOnly
                    />
                </div>

                <div className="viewinformation-detail-button-update">
                    <Button type="primary">Update Information</Button>
                </div>
            </div>
        </div>
    );
}
