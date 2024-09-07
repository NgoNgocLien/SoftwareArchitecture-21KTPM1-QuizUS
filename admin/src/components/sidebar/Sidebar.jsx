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
    //     if (currentPath.includes("/dashboard")) {
    //         setFocus("dashboard");
    //     } else if (currentPath.includes("/user")) {
    //         setFocus("player");
    //     } else if (currentPath.includes("/brand")) {
    //         setFocus("brand");
    //     } else if (currentPath.includes("/game")) {
    //         setFocus("game");
    //     }
    // }, [location.pathname]);

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center justify-content-between">
                <img src="/images/logo.png" alt="logo" width="96" height="50" className="align-self-center"/>
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className={focus === "dashboard" || location.pathname.includes("/dashboard") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("dashboard")}>
                    <img src="/icons/home.svg" alt="dashboard" />
                    <Link to="/dashboard" className="link-text">Tổng quan</Link>
                </li>

                <li className={focus === "user" || location.pathname.includes("/user") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("event")}>
                    <img src="/icons/user.svg" alt="user" />
                    <Link to="/user" className="link-text">Người chơi</Link>
                </li>
                
                <li className={focus === "brand" || location.pathname.includes("/brand") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("brand")}>
                    <img src="/icons/brand.svg" alt="brand" />
                    <Link to="/brand" className="link-text">Nhãn hàng</Link>
                </li>

                <li className={focus === "game" || location.pathname.includes("/game") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("game")}>
                    <img src="/icons/game.svg" alt="game" />
                    <Link to="/game" className="link-text">Trò chơi</Link>
                </li>
            </ul>
        </div>
    );
}
