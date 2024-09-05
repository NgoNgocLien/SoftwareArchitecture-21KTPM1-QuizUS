import "./Topbar.css";

export default function Topbar() {
    return (
        <div className="topbar d-flex flex-row justify-content-between">
            <h6>Tổng quan</h6>
            <div className="d-flex flex-row user-profile align-items-center">
                <img src="/icons/avatar.svg" alt="user-avatar" />
                <p>Admin</p>
                <img src="/icons/chevron-down.svg" alt="chevron-down" />
            </div>
        </div>
    )
}