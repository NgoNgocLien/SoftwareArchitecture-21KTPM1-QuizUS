import "./Sidebar.css";
import { useState } from "react";

export default function Sidebar() {

    let [focus, setFocus] = useState("dashboard");

    const handleFocus = (tab) => {
        setFocus(tab);
    }

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center">
                <img src="/logo-dark-svg.png" alt="Logo" width={90} height={45} />
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className={focus === "dashboard" ? "sidebar-nav-item focused" : "sidebar-nav-item"} onClick={() => handleFocus("dashboard")}>
                    <i class="fa-solid fa-house"></i>
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