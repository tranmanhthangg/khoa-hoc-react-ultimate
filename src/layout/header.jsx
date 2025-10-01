import './header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <ul>
            <li><Link className="active" to="#home">Home</Link></li>
            <li><Link to="/users">User</Link></li>
            <li><Link to="/products">Product</Link></li>
        </ul>
    );
}

export default Header;