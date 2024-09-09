import React from "react";
import { useEffect, useRef } from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function BrandInfo() {
    // Google Map
    const addressInput = useRef(null);
    const mapRef = useRef(null);
    let autocomplete;

    useEffect(() => {
        // Initialize the autocomplete when the component loads
        if (window.google) {
            autocomplete = new window.google.maps.places.Autocomplete(addressInput.current, {
                types: ["geocode"],
            });
    
            // Listener for when a place is selected
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
    
                if (place.geometry) {
                // Display map if a valid address is selected
                    const map = new window.google.maps.Map(mapRef.current, {
                        zoom: 15,
                        center: place.geometry.location,
                    });
    
                    // Place a marker at the selected location
                    new window.google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });
                }
            });
        }
    }, []);

    return (
        <div className="ctn">
            {/* Brand Logo */}
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

            {/* Login Info */}
            <div className='input-ctn'>
                <h6>Thông tin đăng nhập</h6>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" id="username" placeholder="Nhập tên đăng nhập" />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="address" placeholder="Nhập email nhãn hàng" />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Mật khẩu</label>
                        <input type="text" id="pwd" placeholder="••••••••" />
                    </div>
                </div>

            </div>

            {/* Brand Info */}
            <div className='input-ctn'>
                <h6>Thông tin chung</h6>

                {/* Name & Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="brand-name">Tên nhãn hàng</label>
                        <input type="text" id="brand-name" placeholder="Nhập tên nhãn hàng" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Lĩnh vực</label>
                        <select id="field">
                            <option value="restaurant">Nhà hàng</option>
                            <option value="cafe">Cafe & Bánh</option>
                            <option value="shopping">Mua sắm</option>
                            <option value="entertainment">Giải trí</option>
                        </select>
                    </div>
                </div>

                {/* Address */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input  type="text"
                                id="address" 
                                placeholder="Nhập địa chỉ"
                                ref={addressInput} />
                    </div>
                </div>
                <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "10px" }}></div>

                {/* Website */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="website">Trang web</label>
                        <input type="url" id="website" placeholder="Nhập URL trang web" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn">Hủy</button>
                    <button className="save-btn">Lưu</button>
                </div>
            </div>
        </div>
    );
}