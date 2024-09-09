import React from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function CreateEvent() {

    return (
        <div className="ctn">
            {/* Event img */}
            <div className="brand-logo-ctn">
                <img src="/images/placeholder-img.jpg" alt="brand-logo" />
                <div className="upload-btn-ctn">
                    <button className="upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" /> {/* Code backend cho input này nha */}
                </div>
            </div>
        </div>
    )
}