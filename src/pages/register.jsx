import { Button, Input, Form, notification, Row, Col } from 'antd';
import { registerUserAPI } from '../service/api.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng kí user thành công"
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
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name:"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email:"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password:"
                        name="password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number:"
                        name="phone"
                        rules={[{ pattern: new RegExp(/\d+/g), message: 'Wrong format!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8} >
                    <div>
                        <Button type='primary' onClick={() => form.submit()}>Register</Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterPage;