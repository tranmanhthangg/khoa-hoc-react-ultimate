import { Table } from 'antd';

const UserTable = ({ dataUser }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    return (
        < Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
    );
}

export default UserTable;