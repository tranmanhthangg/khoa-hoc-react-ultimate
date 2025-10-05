import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from './user.modal.update';
import { useState } from 'react';

const UserTable = ({ dataUser, loadUser }) => {
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => (
                <>
                    <a href='#'>{record._id}</a>
                </>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={(() => { setIsModalUpdateOpen(true); setDataUpdate(record) })}
                    />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </div>
            ),
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;