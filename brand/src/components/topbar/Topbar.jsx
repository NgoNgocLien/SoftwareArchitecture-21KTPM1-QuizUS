import { useLocation } from 'react-router-dom';
import "./Topbar.css";

export default function Topbar() {
    const location = useLocation();

    const getPageName = (pathname) => {
        switch (pathname) {
            case '/event':
                return 'Sự kiện';
            case '/voucher':
                return 'Người Chơi';
            case '/info':
                return 'Thông tin';
            default:
                return 'Sự kiện';
        }
    };

    return (
        <div className="topbar d-flex flex-row justify-content-between">
            <h6>{getPageName(location.pathname)}</h6>
            <div className="d-flex flex-row user-profile align-items-center">
                <img src="/icons/avatar.svg" alt="user-avatar" />
                <p>Brand</p>
                <img src="/icons/chevron-down.svg" alt="chevron-down" />
            </div>
        </div>
    )
}