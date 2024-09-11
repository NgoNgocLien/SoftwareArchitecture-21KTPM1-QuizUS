import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { createEvent } from "../api/campaignApi"; 
import { uploadImgToCloudinary } from '../api/cloudinary';

export default function CreateShake() {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [item1, setItem1] = useState('');
    const [item1File, setItem1File] = useState('');
    const [item2, setItem2] = useState('');
    const [item2File, setItem2File] = useState('');

    const [avatar, setAvatar] = useState('');

    const handleItem1Change = (e) => {
        const file = e.target.files[0];

        setItem1File(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setItem1(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleItem2Change = (e) => {
        const file = e.target.files[0];

        setItem2File(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setItem2(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        var imageUrl1;
        if (item1File) {
            try {
                imageUrl1 = await uploadImgToCloudinary(item1File);

                if (imageUrl1) {
                    console.log('imageUrl1:', imageUrl1);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        var imageUrl2;
        if (item2File) {
            try {
                imageUrl2 = await uploadImgToCloudinary(item2File);

                if (imageUrl2) {
                    console.log('imageUrl2:', imageUrl2);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        const campaign = {
           name: searchParams.get('name'),
           description: searchParams.get('description'),
           start_datetime: searchParams.get('start'),
           end_datetime: searchParams.get('end'),
           max_amount_voucher: searchParams.get('amount'),
           given_amount_voucher: 0,
           id_brand1: brand?.id_brand || 1,
           budget: searchParams.get('budget'),
           id_voucher: searchParams.get('id_voucher'),
           item1_photo: imageUrl1 || '',
           item2_photo: imageUrl2 || '',
           photo: searchParams.get('photo'),
        }
        const success = await createEvent(campaign, {});

        if (success) {
            confirmAlert({
                message: 'Tạo sự kiện thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/event`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Tạo sự kiện thất bại!',
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
            <div className="input-ctn">
                <h6>Lắc vật phẩm</h6>
                <p>Người chơi cần thu thập đủ 2 mảnh ghép để đổi 1 voucher của nhãn hàng.</p>
                <div className="form-row">
                    {/* Vật phẩm 1 */}
                    <div className="form-group" style={{ flex: '1'}}>
                        <label>Vật phẩm 1</label>
                        <input type="file" accept="image/*" onChange={handleItem1Change}/>
                        <img src={item1} alt="item1_photo" className="item-img" />
                    </div>

                    {/* Vật phẩm 2 */}
                    <div className="form-group" style={{ flex: '1'}}>
                        <label>Vật phẩm 2</label>
                        <input type="file" accept="image/*" onChange={handleItem2Change}/>
                        <img src={item2} alt="item2_photo" className="item-img"/>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group" >
                        <button className="cancel-btn" onClick={() => {navigate('/create-event')}}>Hủy</button>
                        <button className="save-btn" onClick={handleSubmit}>Lưu</button>
                    </div>
            </div>
        </div>
    )
}