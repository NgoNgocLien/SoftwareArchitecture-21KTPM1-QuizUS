import "./Sidebar.css";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const [focus, setFocus] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes("/event")) {
            setFocus("event");
        } else if (currentPath.includes("/voucher")) {
            setFocus("voucher");
        } else if (currentPath.includes("/info")) {
            setFocus("info");
        }
    }, [location.pathname]);

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center justify-content-between">
                <img src="/images/logo.png" alt="logo" width="96" height="50" className="align-self-center"/>
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className={focus === "dashboard" ? "sidebar-nav-item focused" : "sidebar-nav-item"}>
                    <img src="/icons/home.svg" alt="event" />
                    <Link to="/event" className="link-text">Sự kiện</Link>
                </li>
                <li className={focus === "player" ? "sidebar-nav-item focused" : "sidebar-nav-item"}>
                    <img src="/icons/user.svg" alt="user" />
                    <Link to="/voucher" className="link-text">Voucher</Link>
                </li>
                <li className={focus === "brand" ? "sidebar-nav-item focused" : "sidebar-nav-item"}>
                    <img src="/icons/brand.svg" alt="brand" />
                    <Link to="/info" className="link-text">Thông tin</Link>
                </li>
            </ul>
        </div>
    );
}
