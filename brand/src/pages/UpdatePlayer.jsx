import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import "./UpdatePlayer.css";
import Backbar from '../components/topbar/Backbar';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';

export default function UpdatePlayer() {
    const [player, setPlayer] = useState({
        fullName: 'Trần Bảo Ngọc',
        email: 'tbngoc21@clc.fitus.edu.vn',
        phoneNumber: '0855995203',
        dob: '2003-03-22',
        gender: 'female',
        facebook: 'http://www.facebook.com/ngoctran',
        avatar: '/images/google.png'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
    };

    const handleGenderChange = (e) => {
        setPlayer({ ...player, gender: e.target.value });
    };

    const handleSave = () => {
        console.log('Player info saved:', player);
        // Add your save logic here (e.g., API call)
    };

    const handleCancel = () => {
        // Reset to initial state or navigate away
        console.log('Cancel');
    };

    const handleAvatarChange = (e) => {
        // Handle avatar upload
        console.log('Avatar changed:', e.target.files[0]);
    };

    return (
        <div className="update-player-container bg-light">
            {<Backbar />}
            <div className="container-fluid d-flex row">
                <div className="avatar-section col-2">
                    <img src={player.avatar} alt="Avatar" className="avatar" />
                </div>
                <div className="form-container col">
                    <div className="info-section">
                        <h3>Thông tin chung</h3>
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input
                                type="text"
                                name="fullName"
                                value={player.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={player.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={player.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinh nhật</label>
                            <input
                                type="date"
                                name="dob"
                                value={player.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={player.gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                    Nam
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={player.gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Facebook</label>
                            <input
                                type="text"
                                name="facebook"
                                value={player.facebook}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group avatar-upload">
                            <label>Avatar</label>
                            <input type="file" onChange={handleAvatarChange} />
                            <small>Bấm để tải lên hoặc kéo thả ảnh vào đây</small>
                        </div>
                        <div className="form-buttons">
                            <button className="cancel-button" onClick={handleCancel}>
                                Hủy
                            </button>
                            <button className="save-button" onClick={handleSave}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}