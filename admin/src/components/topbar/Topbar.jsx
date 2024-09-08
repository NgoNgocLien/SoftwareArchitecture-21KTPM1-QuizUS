import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Topbar.css";

export default function Topbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getPageName = (pathname) => {
        switch (pathname) {
            case '/dashboard':
                return 'Tổng Quan';
            case '/player':
                return 'Người Chơi';
            case '/brand':
                return 'Nhãn Hàng';
            case '/game':
                return 'Trò Chơi';
            default:
                return 'Tổng Quan';
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin'); 
        navigate('/');
    };

    return (
        <div className="topbar d-flex flex-row justify-content-between">
            <h6>{getPageName(location.pathname)}</h6>
            <div className="d-flex flex-row user-profile align-items-center">
                <img src="/icons/avatar.svg" alt="user-avatar" />
                <p>Admin</p>
                <img src="/icons/chevron-down.svg" alt="chevron-down"
                style={{ cursor: "pointer"}} onClick={toggleDropdown}/>

                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>
                                <img src='/icons/user-circle.svg' alt='logout'></img>
                                <span>Profile</span>
                            </li>
                            <li onClick={handleLogout}>
                                <img src='/icons/logout.svg' alt='logout'></img>
                                <span>Logout</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}