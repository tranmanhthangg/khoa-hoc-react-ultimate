import { Button, Input, Form, notification, Row, Col, Divider, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../service/api.service';
import { useState, useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Login complete.");
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/");
        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            });
        }
        setLoading(false);
    }

    return (
        <Row justify={'center'} style={{ margin: '30px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                    <legend>Login</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Wrong format'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onKeyDown={(event) => { if (event.key === "Enter") form.submit() }} />
                        </Form.Item>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button loading={loading} type='primary' onClick={() => form.submit()}>Login</Button>
                            <Link to={'/'}>Go to homepage <ArrowRightOutlined /></Link>
                        </div>
                        <Divider />
                        <div>Don&apos;t have an account yet? <Link to={"/register"}>Register here.</Link></div>
                    </Form >
                </fieldset>
            </Col>
        </Row>
    );
}

export default LoginPage;