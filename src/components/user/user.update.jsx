import { useState } from 'react';
import { Input, Button, notification, Modal } from 'antd';
import { createUserAPI } from '../../service/api.service';

const UpdateUserModal = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            });
            resetAndCloseModal();
            // await loadUser();
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
        <Modal title="Update a user" okText="SAVE" open={isModalOpen} maskClosable={false} onOk={() => handleSubmitBtn()} onCancel={() => setIsModalOpen(false)}>
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
    );
}

export default UpdateUserModal;