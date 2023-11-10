import React from "react";
import "./style.scss";
import { HomeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
export default function ChangePasswd() {
    return (
        <div className="changepasswd">
            <Form
                name="changepasswd-form"
                layout="vertical"
                wrapperCol={{
                    span: 30,
                }}
                className="changepasswd-form"
            >
                <Form.Item
                    label="Nhập mật khẩu cũ"
                    name="oldpassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu cũ!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu cũ" />
                </Form.Item>

                <Form.Item
                    label="Nhập mật khẩu mới"
                    name="newpassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu mới!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="newpassword-continue"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu mới!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                </Form.Item>

                <div className="wrapper__change-button">
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </div>
            </Form>
        </div>
    );
}
