import { Button, Input, Form, notification, Row, Col, Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
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
                            <Input.Password />
                        </Form.Item>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button type='primary' onClick={() => form.submit()}>Login</Button>
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