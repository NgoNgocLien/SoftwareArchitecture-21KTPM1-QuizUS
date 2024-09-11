import { useLocation, useNavigate } from 'react-router-dom';
import "./Backbar.css";

export default function Backbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        if (location.pathname === "/add-brand") {
            navigate("/brand");
        } else if (location.pathname.includes("/edit-user/")) {
            navigate("/player");
        } else if (location.pathname.includes("/edit-brand/")) {
            navigate("/brand");
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="back-link d-flex align-items-center" onClick={handleBack}>
            <div style={{ marginTop: "5px"}}>
                <img src="/icons/chevron-left.svg" alt="back"></img>
            </div>
            <span>Quay lại</span>
        </div>
    )
}
