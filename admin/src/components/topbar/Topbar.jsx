import { useLocation } from 'react-router-dom';
import "./Topbar.css";

export default function Topbar() {
    const location = useLocation();

    const getPageName = (pathname) => {
        switch (pathname) {
            case '/dashboard':
                return 'Tổng Quan';
            case '/user':
                return 'Người Chơi';
            case '/brand':
                return 'Nhãn Hàng';
            case '/game':
                return 'Trò Chơi';
            default:
                return 'Tổng Quan';
        }
    };

    return (
        <div className="topbar d-flex flex-row justify-content-between">
            <h6>{getPageName(location.pathname)}</h6>
            <div className="d-flex flex-row user-profile align-items-center">
                <img src="/icons/avatar.svg" alt="user-avatar" />
                <p>Admin</p>
                <img src="/icons/chevron-down.svg" alt="chevron-down" />
            </div>
        </div>
    )
}