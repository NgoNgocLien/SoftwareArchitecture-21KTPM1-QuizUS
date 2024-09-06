import "./Sidebar.css";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [focus, setFocus] = useState("dashboard");
    const handleFocus = (tab) => {
        setFocus(tab);
    }

    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    }

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center justify-content-between">
                <img src="/images/logo.png" alt="logo" width="96" height="50" className="align-self-center"/>
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className={focus === "dashboard" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("dashboard")}>
                    <img src="/icons/home.svg" alt="dashboard" />
                    <Link to="/dashboard" className="link-text">Tổng quan</Link>
                </li>
                <li className={focus === "player" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("player")}>
                    <img src="/icons/user.svg" alt="user" />
                    <Link to="/user" className="link-text">Người chơi</Link>
                </li>
                <li className={focus === "brand" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("brand")}>
                    <img src="/icons/brand.svg" alt="brand" />
                    <Link to="/brand" className="link-text">Nhãn hàng</Link>
                </li>
                <li className={focus === "game" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("game")}>
                    <img src="/icons/game.svg" alt="game" />
                    <Link to="/game" className="link-text">Trò chơi</Link>
                </li>
            </ul>

        </div>

    )
}