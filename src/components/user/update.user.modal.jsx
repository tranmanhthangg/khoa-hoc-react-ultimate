import { useState, useEffect } from 'react';
import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from '../../service/api.service';

const UpdateUserModal = ({ isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser }) => {
    const [fullName, setFullName] = useState("");
    const [id, setID] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setID(dataUpdate._id);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update a user",
                description: "Cập nhật user thành công"
            });
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "Error update a user",
                description: JSON.stringify(res.message)
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setID("");
        setPhone("");
        setDataUpdate(null);
    }

    return (
        <Modal title="Update a user" okText="SAVE" open={isModalUpdateOpen} maskClosable={false} onOk={() => handleSubmitBtn()} onCancel={() => setIsModalUpdateOpen(false)}>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <div>
                    <span>ID:</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Full Name:</span>
                    <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
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