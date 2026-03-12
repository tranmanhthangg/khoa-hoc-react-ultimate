import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Menu, message } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../components/context/auth.context';
import { logoutAPI } from '../service/api.service';

const Header = () => {
    const [current, setCurrent] = useState("home");
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout complete.");
            navigate("/");

        }
    }

    const items = [
        {
            label: <Link to={"/"}> Home </Link >,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        !user.id ?
            {
                label: <Link to={"/login"}>Login</Link>,
                key: 'login',
                icon: <LoginOutlined />
            } :
            {
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={handleLogout}>Logout</span>,
                        key: 'logout'
                    },
                ]
            }
    ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    );
}

export default Header;