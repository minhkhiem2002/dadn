import React, {useState} from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()

    const handleRegister = async (e) => {
        try {
            const apiUrl = 'http://localhost:3001/api/user/signup'
            const data = {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            const response = await axios.post(apiUrl, data)
            console.log(response)
            if (response) {
                if (response.data.status == 200) {
                    navigate('/login')
                }
                else if (response.data.status == 401){
                    alert(response.data.message)
                }
            }
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <>
            <h2 className="wrapper__register-title">Đăng ký</h2>
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
                    onFinish={handleRegister}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên của bạn",
                            },
                        ]}
                    >
                        <Input onChange = {(e) => setName(e.target.value)} placeholder="Họ và tên" />
                    </Form.Item>

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
                        <Input onChange = {(e) => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password onChange = {(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu của bạn!",
                            },
                        ]}
                    >
                        <Input.Password onChange = {(e) => setconfirmPassword(e.target.value)} placeholder="Xác nhận mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                Đã có tài khoản?
                <Link to={"/login"}>
                    <span>Đăng nhập</span>
                </Link>
            </div>
        </>
    );
};

export default Register;