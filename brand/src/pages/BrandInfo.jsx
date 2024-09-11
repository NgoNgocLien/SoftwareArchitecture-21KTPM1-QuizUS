import React from "react";
import { useState, useEffect } from "react";
import "../styles/common.css";
import "../styles/input.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getInfo, update } from "../api/brandApi";
import { uploadImgToCloudinary } from '../api/cloudinary';

export default function BrandInfo() {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [field, setField] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState('');
    const [phone, setPhone] = useState('');

    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getInfo(brand?.id_brand || 1);
            if (data) {
                setName(data?.name);
                setUsername(data?.username);
                // setWebsite(data?.website);
                setField(data?.field);
                setAddress(data?.address);
                setEmail(data?.email);
                setLogo(data?.logo);
                setPhone(data?.phone);
                console.log(data);
            }
        }
        getData();
    }, [brand?.id_brand]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        var imageUrl;
        if (avatarFile) {
            try {
                imageUrl = await uploadImgToCloudinary(avatarFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        const data = {
            id_brand: brand?.id_brand,
            name,
            username,
            password,
            field,
            address,
            email,
            logo: imageUrl || logo,
            phone
        }
        const success = await update(data);

        if (success) {
            confirmAlert({
                message: 'Cập nhật thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Cập nhật thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    };

    return (
        <div className="ctn">
            {/* Brand Logo */}
            <div className="brand-logo-ctn">
                <img className="brand-logo-img" src={avatar || logo || "/images/placeholder-img.jpg"} alt="brand-logo" />
                <div className="upload-btn-ctn">
                    <button className="upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" accept="image/*" onChange={handleAvatarChange}/> 
                </div>
            </div>

            {/* Login Info */}
            <div className='input-ctn'>
                <h6>Thông tin đăng nhập</h6>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" id="username" placeholder="Nhập tên đăng nhập" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="address" placeholder="Nhập email nhãn hàng" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Mật khẩu</label>
                        <input type="text" id="pwd" placeholder="••••••••" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
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
                        <input type="text" id="brand-name" placeholder="Nhập tên nhãn hàng" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Lĩnh vực</label>
                        <select id="field" value={field} onChange={(e) => {setField(e.target.value)}}>
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
                                // ref={addressInput} 
                                value={address} 
                                onChange={(e) => {setAddress(e.target.value)}}
                                />
                    </div>
                </div>
                {/* Map */}
                {/* <div ref={} style={{ width: "100%", height: "400px", marginTop: "10px" }}></div> */}

                {/* Website */}
                <div className="form-row">
                    {/* <div className="form-group">
                        <label htmlFor="website">Trang web</label>
                        <input type="url" id="website" placeholder="Nhập URL trang web" value={website} onChange={(e) => {setWebsite(e.target.value)}}/>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn">Hủy</button>
                    <button className="save-btn" onClick={() => handleSubmit()}>Lưu</button>
                </div>
            </div>
        </div>
    );
}