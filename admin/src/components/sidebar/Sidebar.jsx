import "./Sidebar.css";
import { useState } from "react";

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
                    <span>Tổng quan</span>
                </li>
                <li className={focus === "player" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("player")}>
                    <i class="fa-solid fa-user"></i>
                    <span>Người chơi</span>
                </li>
                <li className={focus === "brand" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("brand")}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Nhãn hàng</span>
                </li>
                <li className={focus === "game" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("game")}>
                    <i class="fa-solid fa-gamepad"></i>
                    <span>Trò chơi</span>
                </li>
            </ul>

        </div>

    )
}