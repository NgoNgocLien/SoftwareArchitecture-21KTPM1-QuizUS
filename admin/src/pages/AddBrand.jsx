import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { createBrand } from '../api/brandApi';

export default function AddBrand() {
    const navigate =  useNavigate();

    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const onCancel  = () => {
        navigate(`/brand`);
    }

    const onSave = async () => {
        let newData = {
            name,
            field,
            address,
            email,
            username,
            pwd: password
        }
        let success = await createBrand(newData);
        if (success) {
            confirmAlert({
                message: 'Tạo nhãn hàng thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/brand`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Tạo nhãn hàng thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    }

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
                <h6>Thông tin đăng nhập</h6>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" id="username" placeholder="Nhập tên đăng nhập" value={username} onChange={(e) => { setUsername(e.target.value) }}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Nhập email nhãn hàng" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Mật khẩu</label>
                        <input type="text" id="pwd" placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                    </div>
                </div>

            </div>

            <div className='input-ctn'>
                <h6>Thông tin chung</h6>

                {/* Name & Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="brand-name">Tên nhãn hàng</label>
                        <input type="text" id="brand-name" placeholder="Nhập tên nhãn hàng" value={name} onChange={(e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Lĩnh vực</label>
                        <select id="field" value={field} onChange={(e) => { setField(e.target.value) }}>
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
                        <input type="text" id="address" placeholder="Nhập địa chỉ" value={address} onChange={(e) => { setAddress(e.target.value) }}/>
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
                    <button className="cancel-btn" onClick={onCancel}>Hủy</button>
                    <button className="save-btn" onClick={onSave}>Lưu</button>
                </div>

            </div>
        </div>
    );
}