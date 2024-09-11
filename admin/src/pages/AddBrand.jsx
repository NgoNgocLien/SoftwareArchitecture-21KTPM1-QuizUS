import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { createBrand, uploadImgToCloudinary } from '../api/brandApi';

export default function AddBrand() {
    const navigate =  useNavigate();

    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [logo, setLogo] = useState('');
    const [logoFile, setLogoFile] = useState(null);

    const onCancel  = () => {
        navigate(`/brand`);
    }

    const onSave = async () => {
        var imageUrl;
        if (logoFile) {
            try {
                imageUrl = await uploadImgToCloudinary(logoFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        let newData = {
            name,
            field,
            address,
            lat: "",
            long: "",
            username,
            pwd: password,
            phone,
            email,
            logo: imageUrl
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

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        console.log("file: ", file)

        setLogoFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogo(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return(
        <div className='ctn'>
            <div className='brand-logo-ctn'>
                <img src={logo?.length > 0 ? logo : "/images/placeholder-img.jpg"} alt="brand-logo" className='profile-avatar'/>
                <div className="upload-btn-ctn">
                    <button className="upload-btn"> 
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" accept="image/*" onChange={handleLogoChange}/> 
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
                            <option value="Nhà hàng">Nhà hàng</option>
                            <option value="Cafe & Bánh">Cafe & Bánh</option>
                            <option value="Mua sắm">Mua sắm</option>
                            <option value="Giải trí">Giải trí</option>
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

                {/* Phone */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
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