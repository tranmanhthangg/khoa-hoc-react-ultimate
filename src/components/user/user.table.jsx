import { Table } from 'antd';
import { fetchAllUserAPI } from '../../service/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([
        {
            _id: "Eric",
            fullName: 25,
            email: "Hn"
        },
        {
            _id: "Hoi dan it",
            fullName: 25,
            email: "hn"
        }
    ]);

    useEffect(() => {
        console.log(">>> run effect 111");
        loadUser();
    }, []);

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

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUser(res.data);
    }

    console.log("run render 000");

    return (
        < Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
    );
}

export default UserTable;