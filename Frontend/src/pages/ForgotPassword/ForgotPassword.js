import { Button, Form, Input } from 'antd';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <>
            <h2 className="wrapper__register-title">Lấy lại mật khẩu</h2>
            <span className='wrapper__intro'>Vui lòng nhập email đăng ký của bạn để có thể đặt lại mật khẩu</span>
            <div>
                <Form
                    name="register-form"
                    layout="vertical"
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: "700px",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    className="wrapper__form"
                    // onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                        >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                <div className="wrapper__to-register">
                    Chưa có tài khoản?
                    <Link to={"/register"}>
                        <span>Đăng ký</span>
                    </Link>
                </div>
                <div className="wrapper__to-login">
                    <Link to={"/login"}>
                        <span>Đăng nhập</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;