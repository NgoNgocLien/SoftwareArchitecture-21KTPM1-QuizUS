import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";
import { useNavigate } from 'react-router-dom';
import { uploadImgToCloudinary } from '../api/cloudinary';
import { createVoucher } from "../api/voucherApi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function CreateVoucher() {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expire, setExpire] = useState('');
    const [score, setScore] = useState(100);
    const [price, setPrice] = useState(0);    

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
    
    const onSubmit = async (e) => {
        e.preventDefault();

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
            name,
            id_brand: brand?.id_brand || 1,
            photo: imageUrl,
            price,
            description,
            expired_date: expire,
            score_exchange: score,
            status: true
        }
        const success = await createVoucher(data);

        if (success) {
            confirmAlert({
                message: 'Tạo voucher thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/voucher`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Tạo voucher thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    }

    return (
        <div className="ctn">
            {/* Voucher img */}
            <div className="event-img-ctn">
                <img src={avatar?.length > 0 ? avatar : "/images/image 41.png"} alt="event-img" className="event-img" />
                <div className="event-btn-ctn">
                    <button className="event-upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" accept="image/*" onChange={handleAvatarChange} />
                </div>
            </div>

            <div className='input-ctn'>
                <h6>Thông tin voucher</h6>

                {/* Tên */}
                <div className='form-row'>
                    <div className="form-group">
                        <label id="name">Tên voucher</label>
                        <input type="text" placeholder="Nhập tên voucher" required value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                </div>

                {/* Điều khoản */}
                <div className='form-row'>
                    <div className="form-group">
                        <label>Điều khoản áp dụng</label>
                        <textarea placeholder="Mô tả voucher" maxLength="500"required  value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                    </div>
                </div>

                {/* Hạn sử dụng */}
                <div className='form-row'>
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Ngày hết hạn</label>
                        <input type="datetime-local" placeholder="Chọn ngày hết hạn" required value={expire} onChange={(e) => {setExpire(e.target.value)}}/>
                    </div>
                </div>

                <div className='form-row'>
                    {/* Đổi bằng */}
                    <div className="form-group">
                        <label>Đổi bằng (xu)</label>
                        <input type="number"  value={score} onChange={(e) => {setScore(e.target.value)}}/>
                    </div>
                    {/* Giá trị */}
                    <div className="form-group">
                        <label>Giá trị</label>
                        <input type="number"  value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                    </div>
                </div>

                <div className="button-group">
                    <button className="cancel-btn" onClick={() => {navigate('/voucher')}}>Hủy</button>
                    <button className="save-btn" onClick={onSubmit}>Tạo Voucher</button>
                </div>  
            </div>
        </div>
    )
}