import "./Sidebar.css";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const [focus, setFocus] = useState("");
    const location = useLocation();

    const handleClick = (tab) => {
        setFocus(tab);
    };

    // useEffect(() => {
    //     const currentPath = location.pathname;
    //     // Only set the focus if the path actually changes
    //     if (currentPath.includes("/event") && focus !== "event") {
    //         setFocus("event");
    //     } else if (currentPath.includes("/voucher") && focus !== "voucher") {
    //         setFocus("voucher");
    //     } else if (currentPath.includes("/info") && focus !== "info") {
    //         setFocus("info");
    //     }
    // }, [location.pathname, focus]);

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center justify-content-between">
                <img src="/images/logo.png" alt="logo" width="96" height="50" className="align-self-center"/>
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li 
                    className={focus === "event" || location.pathname.includes("/event") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("event")}
                >
                    <img src="/icons/event.svg" alt="event" />
                    <Link to="/event" className="link-text">Sự kiện</Link>
                </li>
                <li 
                    className={focus === "voucher" || location.pathname.includes("/voucher") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("voucher")}
                >
                    <img src="/icons/voucher.svg" alt="voucher" />
                    <Link to="/voucher" className="link-text">Voucher</Link>
                </li>
                <li 
                    className={focus === "info" || location.pathname.includes("/info") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("info")}
                >
                    <img src="/icons/info.svg" alt="info" />
                    <Link to="/info" className="link-text">Thông tin</Link>
                </li>
            </ul>
        </div>
    );
}