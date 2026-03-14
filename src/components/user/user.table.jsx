import { Table, Popconfirm, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../service/api.service';
import { useState } from 'react';

const UserTable = ({ dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleDeleteBtn = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete a user",
                description: "Delete complete."
            });
            await loadUser();
        }
        else {
            notification.error({
                message: "Error delete a user",
                description: JSON.stringify(res.message)
            });
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, record, index) => (
                <>
                    {(index + 1) + (current - 1) * pageSize}
                </>
            )
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => (
                <>
                    <a href='#' onClick={() => { setIsOpenDetail(true); setDataDetail(record) }}>{record._id}</a>
                </>
            )
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
                    <Popconfirm
                        title="Delete a user"
                        description="Are you sure to delete this user?"
                        placement="left"
                        onConfirm={() => handleDeleteBtn(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) // "5" -> 5 đảm bảo so sánh số, tránh lỗi
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isOpenDetail={isOpenDetail}
                setIsOpendetail={setIsOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;