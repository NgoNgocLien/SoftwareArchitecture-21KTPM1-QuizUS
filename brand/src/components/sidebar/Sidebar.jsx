import "./Sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar bg-black col-2">
            <div className="sidebar-brand d-flex align-items-center">
                <img src="/logo-dark-svg.png" alt="Logo" width={90} height={45} />
            </div>
            <div className="horizontal-line"></div>
            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <a href="#" className="sidebar-nav-link btn-md sec-btn text-white">
                        <i className="fa fa-home"></i>
                        <span>Tổng quan</span>
                    </a>
                </li>
                <li className="sidebar-nav-item">
                    <a href="#" className="text-white btn-md sec-btn">
                        <i className="fa fa-user"></i>
                        <span>Người chơi</span>
                    </a>
                </li>
                <li className="sidebar-nav-item">
                    <a href="#" className="sidebar-nav-link text-white">
                        <i className="fa fa-cog"></i>
                        <span>Nhãn hàng</span>
                    </a>
                </li>
                <li className="sidebar-nav-item">
                    <a href="#" className="sidebar-nav-link text-white">
                        <i className="fa fa-cog"></i>
                        <span>Trò chơi</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}