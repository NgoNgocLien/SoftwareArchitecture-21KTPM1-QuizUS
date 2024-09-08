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
                        <input type="text" id="name" placeholder="Họ tên"/>
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="Số điện thoại" />
                    </div>
                </div>

                {/* Birthday & Gender */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="birthday">Sinh nhật</label>
                        <input type="text" id="birthday" placeholder="Sinh nhật" />
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="gender" value="male" />
                                Nam
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" />
                                Nữ
                            </label>
                        </div>
                    </div>
                </div>

                {/* Facebook */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="website">Facebook</label>
                        <input type="url" id="website" placeholder="Link Facebook" />
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