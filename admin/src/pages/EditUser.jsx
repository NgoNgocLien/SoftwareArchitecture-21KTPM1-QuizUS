import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/input.css";

export default function EditUser() {
    return(
        <div className='ctn'>
            <div className='brand-logo-ctn'>
                <img src="/images/placeholder-img.jpg" alt="brand-logo" />
                <div className="upload-btn-ctn">
                    <button className="upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" /> {/* Code backend cho input này nha */}
                </div>
            </div>
            
            <div className='input-ctn'>
                <h6>Thông tin chung</h6>

                {/* Name */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Họ tên</label>
                        <input type="text" id="name"/>
                    </div>
                </div>

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