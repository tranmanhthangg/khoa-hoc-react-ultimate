import { Input, Button, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../service/api.service';

const UserForm = ({ loadUser }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Create complete."
            });
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "0 0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3>Table User</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}> Create User </Button>
            </div>
            <Modal title="Create User" okText="CREATE" open={isModalOpen} maskClosable={false} onOk={() => handleSubmitBtn()} onCancel={() => setIsModalOpen(false)}>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name:</span>
                        <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                    </div>
                    <div>
                        <span>Email:</span>
                        <Input value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <span>Password:</span>
                        <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <span>Phone Number:</span>
                        <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                </div>
            </Modal>
        </div >
    );
}

export default UserForm;