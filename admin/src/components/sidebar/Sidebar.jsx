import "./Sidebar.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [focus, setFocus] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (tab, route) => {
        setFocus(tab);  
        navigate(route);
    };

    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center justify-content-between">
                <img src="/images/logo.png" alt="logo" width="96" height="50" className="align-self-center"/>
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className={focus === "dashboard" || location.pathname.includes("/dashboard") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("dashboard", "/dashboard")}>
                    <img src="/icons/home.svg" alt="dashboard" />
                    {/* <Link to="/dashboard" className="link-text">Thống kê</Link> */}
                    <span className="link-text">Thống kê</span>
                </li>

                <li className={focus === "player" || location.pathname.includes("/player") || location.pathname.includes("/edit-user") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("player", "/player")}>
                    <img src="/icons/user.svg" alt="player" />
                    {/* <Link to="/player" className="link-text">Người chơi</Link> */}
                    <span className="link-text">Người chơi</span>
                </li>
                
                <li className={focus === "brand" || location.pathname.includes("/brand") || location.pathname.includes("/add-brand") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("brand", "/brand")}>
                    <img src="/icons/brand.svg" alt="brand" />
                    {/* <Link to="/brand" className="link-text">Nhãn hàng</Link> */}
                    <span className="link-text">Nhãn hàng</span>
                </li>

                <li className={focus === "game" || location.pathname.includes("/game") ? "sidebar-nav-item focused" : "sidebar-nav-item"}
                    onClick={() => handleClick("game", "/game")}>
                    <img src="/icons/game.svg" alt="game" />
                    {/* <Link to="/game" className="link-text">Trò chơi</Link> */}
                    <span className="link-text">Trò chơi</span>
                </li>
            </ul>
        </div>
    );
}
