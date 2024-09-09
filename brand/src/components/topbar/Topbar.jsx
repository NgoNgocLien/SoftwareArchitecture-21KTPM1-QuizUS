import { useLocation } from 'react-router-dom';
import "./Topbar.css";

export default function Topbar() {
    const location = useLocation();

    const getPageName = (pathname) => {
        switch (pathname) {
            case '/dashboard':
                return 'Thống kê';
            case '/event':
                return 'Sự kiện';
            case '/voucher':
                return 'Voucher';
            case '/info':
                return 'Thông tin';
            default:
                return 'Sự kiện';
        }
    };

    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;

    return (
        <div className="topbar d-flex flex-row justify-content-between">
            <h6>{getPageName(location.pathname)}</h6>
            <div className="d-flex flex-row user-profile align-items-center">
                <img src={brand.logo ? brand.logo : "/icons/avatar.svg"} alt="user-avatar" />
                <p>{brand.name ? brand.name : "brand" }</p>
            </div>
        </div>
    )
}