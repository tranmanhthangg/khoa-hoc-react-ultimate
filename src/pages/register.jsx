import { Button, Input, Form, notification, Row, Col, Divider } from 'antd';
import { registerUserAPI } from '../service/api.service';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Register user complete."
            });
            navigate("/login");
        }
        else {
            notification.success({
                message: "Register user error",
                description: JSON.stringify(res.message)
            });
        }
    }

    return (
        <Row justify={'center'}>
            <Col xs={24} md={8}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: '20px' }}
                    onFinish={onFinish}
                >
                    <h2 style={{ textAlign: 'center' }} >Register an account</h2>
                    <Form.Item
                        label="Full Name:"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email:"
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
                        label="Password:"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number:"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!'
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Wrong format!'

                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div>
                        <Button type='primary' onClick={() => form.submit()}>Register</Button>
                    </div>
                    <Divider />
                    <div>Already have an account? <Link to={"/login"}>Log in here.</Link></div>
                </Form>
            </Col>
        </Row>

    );
}

export default RegisterPage;