import "./Backbar.css";

export default function Backbar() {
    return (
        <div className="back-link d-flex align-items-center">
            <div style={{ marginTop: "5px"}}>
                <img src="/icons/chevron-left.svg" alt="back"></img>
            </div>
            <a href="/brand">Quay lại</a>
        </div>
    )
}